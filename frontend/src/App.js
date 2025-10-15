import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import UpdatePwd from './components/UpdatePwd';
import UpdateProfile from './components/UpdateProfile';
import Notes from './components/Notes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/update-profile" 
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notes" 
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/update-password" 
          element={
            <ProtectedRoute>
              <UpdatePwd />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/not-found" 
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
