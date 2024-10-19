import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import EventEdit from './pages/EventEdit';
import NewEvent from './pages/NewEvent';
import Shelters from './pages/Shelters';
import Location from './pages/Location';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import UserSettings from './pages/UserSettings'; // Import the new UserSettings component

// Main App component
function App() {
  return (
    // Main app container with flex column layout and minimum full height
    <div className="App flex flex-col min-h-screen">
      {/* Navigation bar component */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Define routes for the application */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* About Us page route */}
          <Route path="/about" element={<AboutUs />} />

          {/* Events list page route */}
          <Route path="/events" element={<Events />} />

          {/* Individual event details page route */}
          <Route path="/events/:id" element={<EventDetails />} />

          {/* Event edit page route */}
          <Route path="/events/:id/edit" element={<EventEdit />} />

          {/* New event creation page route */}
          <Route path="/events/new" element={<NewEvent />} />

          {/* Shelters page route */}
          <Route path="/shelters" element={<Shelters />} />

          {/* Location page route */}
          <Route path="/location" element={<Location />} />

          {/* Login page route */}
          <Route path="/login" element={<Login />} />

          {/* Registration page route */}
          <Route path="/register" element={<Register />} />

          {/* Edit profile page route */}
          <Route path="/profile/edit" element={<EditProfile />} />

          {/* New User Settings page route */}
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 FureverHomes. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
