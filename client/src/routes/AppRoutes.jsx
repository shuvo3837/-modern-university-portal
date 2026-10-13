import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Public Pages
import Home from '../pages/public/Home';
import Helpdesk from '../pages/public/Helpdesk';
import Login from '../pages/public/Login';
import Signup from '../pages/public/Signup';

// Protected Pages
import Dashboard from '../pages/dashboard/Dashboard';
import MyProfile from '../pages/profile/MyProfile';
import PublicProfile from '../pages/profile/PublicProfile';
import MyRooms from '../pages/rooms/MyRooms';
import CreateRoom from '../pages/rooms/CreateRoom';
import JoinRoom from '../pages/rooms/JoinRoom';
import RoomDetails from '../pages/rooms/RoomDetails';
import People from '../pages/people/People';
import TeacherProfile from '../pages/people/TeacherProfile';
import Schedule from '../pages/schedule/Schedule';
import CreateSchedule from '../pages/schedule/CreateSchedule';
import Notifications from '../pages/notifications/Notifications';
import Settings from '../pages/settings/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages wrapped in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route
          path="/login"
          element={
            <PublicRoute restricted={true}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute restricted={true}>
              <Signup />
            </PublicRoute>
          }
        />
      </Route>

      {/* Protected Pages wrapped in DashboardLayout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="/rooms" element={<MyRooms />} />
        <Route path="/rooms/create" element={<CreateRoom />} />
        <Route path="/rooms/join" element={<JoinRoom />} />
        <Route path="/rooms/:roomId" element={<RoomDetails />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:userId" element={<TeacherProfile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/create" element={<CreateSchedule />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
