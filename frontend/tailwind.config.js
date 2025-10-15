/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/Header/**/*.{js,jsx,ts,tsx}",
    "./src/components/Home/**/*.{js,jsx,ts,tsx}",
    "./src/components/LoginForm/**/*.{js,jsx,ts,tsx}",
    "./src/components/Logout/**/*.{js,jsx,ts,tsx}",
    "./src/components/Notes/**/*.{js,jsx,ts,tsx}",
    "./src/components/NoteForm/**/*.{js,jsx,ts,tsx}",
    "./src/components/NoteList/**/*.{js,jsx,ts,tsx}",
    "./src/components/NoteItem/**/*.{js,jsx,ts,tsx}",
    "./src/components/Profile/**/*.{js,jsx,ts,tsx}",
    "./src/components/SignUpForm/**/*.{js,jsx,ts,tsx}",
    "./src/components/UpdateProfile/**/*.{js,jsx,ts,tsx}",
    "./src/components/UpdatePwd/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
