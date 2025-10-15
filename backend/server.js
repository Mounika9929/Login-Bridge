const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "usersdata.db");
let db = null;

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT NOT NULL,
        address TEXT NOT NULL
      )
    `);
      await db.run(`CREATE TABLE IF NOT EXISTS Notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
  )`);
    app.listen(5000, () => {
      console.log("Server running at: http://localhost:5000/");
    });
  } catch (e) {
    console.log(`Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDb();


app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
      return res.status(400).json({ err_msg: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await db.get(
      "SELECT * FROM Users WHERE email = ? OR name = ?",
      [email, name]
    );

    if (dbUser) {
      return res.status(400).json({ err_msg: "User already exists" });
    }

    await db.run(
      "INSERT INTO Users (name, email, password, address) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, address]
    );

    return res.json({ msg: "User created successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ err_msg: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const dbUser = await db.get("SELECT * FROM Users WHERE name = ?", [name]);
    if (!dbUser) {
      return res.status(400).json({ err_msg: "User doesn't exist" });
    }

    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ err_msg: "Invalid password" });
    }

    const payload = {id: dbUser.id, name };
    const jwtToken = jwt.sign(payload, "MY_ACCESS_TOKEN");
    return res.json({ jwt_token: jwtToken });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ err_msg: "Server error" });
  }
});

const authenticate = (request, response, next) => {
    let jwtToken
    const authHeader = request.headers["authorization"]
    if(authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1]
    }
    if(jwtToken === undefined) {
        response.status(401)
        response.send("Invalid JwtToken")
    } else {
        jwt.verify(jwtToken, "MY_ACCESS_TOKEN", (error, payload) => {
            if(error) {
                response.status(401)
                response.send("Invalid JWT Token")
            } else {
                request.user = payload.name
                request.id = payload.id
                next()
            }
        })
    }
}

app.get("/profile",authenticate, async(req, res) => {
  const user = req.user
  const getUserQuery = `SELECT * FROM Users where name='${user}';`
  const getUser = await db.get(getUserQuery);
  const userDetails = {
    name: getUser.name,
    email: getUser.email,
    address: getUser.address,
  }
  res.send({user_details :userDetails})
})

app.put("/update-password", authenticate, async(req, res) => {
    try {
    const { newPassword, oldPassword} = req.body
    const user = req.user
    const dbUser = await db.get(`SELECT * FROM Users WHERE name = "${user}";`);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const isMatch = await bcrypt.compare(oldPassword, dbUser.password);
    if (!isMatch) {
      return res.status(400).json({ err_msg: "Old password is incorrect" });
    }

    await db.run(
      `UPDATE Users SET password = ? WHERE name = ?;`, [hashedNewPassword, user]
    );

    return res.json({ msg: "Password updated successfully" });
  } catch (e) {
    return res.status(500).json({ err_msg: "Server error" });
  }
  })

app.put("/update-profile", authenticate, async (req, res) => {
  try {
    const user = req.user; 
    const { name, email, address } = req.body;

    if (!name && !email && !address) {
      return res.status(400).send({ err_msg: "At least one field is required" });
    }

    const dbUser = await db.get("SELECT * FROM Users WHERE name = ?", [user]);
    if (!dbUser) return res.status(404).send({ err_msg: "User not found" });

    const updatedName = name || dbUser.name;
    const updatedEmail = email || dbUser.email;
    const updatedAddress = address || dbUser.address;

    await db.run(
      "UPDATE Users SET name = ?, email = ?, address = ? WHERE name = ?",
      [updatedName, updatedEmail, updatedAddress, user]
    );

    res.send({ msg: "Profile successfully updated" });
  } catch (err) {
    console.error("Error in /update-profile:", err);
    res.status(500).send({ err_msg: "Internal server error" });
  }
});

app.post("/add-note", authenticate, async (req, res) => {
  try {
    const userId = req.id;
    const { title, content } = req.body;

    if (!title || !content) return res.status(400).json({ err_msg: "Title and content required" });

    await db.run(
      "INSERT INTO Notes (user_id, title, content) VALUES (?, ?, ?)",
      [userId, title, content]
    );

    res.send({ msg: "Note added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err_msg: "Server error" });
  }
});

app.get("/notes", authenticate, async (req, res) => {
  try {
    const userId = req.id;
    const notes = await db.all(
      "SELECT * FROM Notes WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err_msg: "Server error" });
  }
});

app.put("/notes/:id", authenticate, async (req, res) => {
  try {
    const userId = req.id;
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await db.get("SELECT * FROM Notes WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);
    if (!note) return res.status(404).json({ err_msg: "Note not found" });

    await db.run("UPDATE Notes SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      id,
    ]);
    res.json({ msg: "Note updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err_msg: "Server error" });
  }
});

app.delete("/notes/:id", authenticate, async (req, res) => {
  try {
    const userId = req.id;
    const {id} = req.params;
    const notes = await db.all(
      "DELETE FROM Notes WHERE user_id = ? AND id= ?",
      [userId, id]
    );
    res.send({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err_msg: "Server error" });
  }
});

module.exports = app;
