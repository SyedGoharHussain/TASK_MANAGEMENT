import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompleteTasks from "./pages/IncompletedTasks"; 
import Signup from "./pages/Signup"; 
import Login from "./pages/Login";

// ProtectedRoute component to handle authorization
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children; // If logged in, render the children (protected routes)
};

const App = () => {
  return (
    <div className="bg-gray-900 text-white h-screen p-2">
      <Router>
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<AllTasks />} /> {/* Default Content */}
            <Route path="importantTasks" element={<ImportantTasks />} />
            <Route path="completedTasks" element={<CompletedTasks />} />
            <Route path="incompletedTasks" element={<IncompleteTasks />} />
          </Route>

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
