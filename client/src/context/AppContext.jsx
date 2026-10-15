/**
 * AppContext
 * Global application UI context and backend state synchronization
 */

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import roomService from '../services/roomService';
import scheduleService from '../services/scheduleService';
import notificationService from '../services/notificationService';
import { useAuth } from '../hooks/useAuth';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { user, token, isAuthenticated } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeUniversity, setActiveUniversity] = useState('University Workspace');

  // Backend Synchronized States (starts completely empty, zero dummy data)
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  const [schedules, setSchedules] = useState([]);
  const [schedulesLoading, setSchedulesLoading] = useState(true);

  // Modal State
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [addRoomModalTab, setAddRoomModalTab] = useState('create'); // 'create' | 'join'

  // Schedule Privacy Perspective ('Teacher' vs 'Student')
  const [scheduleViewRole, setScheduleViewRole] = useState(user?.role === 'teacher' ? 'Teacher' : 'Student');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Fetch Rooms from Backend
  const refreshRooms = useCallback(async () => {
    setRoomsLoading(true);
    try {
      const res = await roomService.getMyRooms();
      const list = res.data || res || [];
      setRooms(Array.isArray(list) ? list : []);
    } catch (err) {
      console.warn('[AppContext] Error fetching rooms:', err.message);
      setRooms([]);
    } finally {
      setRoomsLoading(false);
    }
  }, []);

  // Fetch Notifications from Backend
  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    setNotificationsLoading(true);
    try {
      const res = await notificationService.getNotifications();
      const list = res.data || res || [];
      setNotifications(Array.isArray(list) ? list : []);
    } catch (err) {
      console.warn('[AppContext] Error fetching notifications:', err.message);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch Schedules from Backend
  const refreshSchedules = useCallback(async () => {
    setSchedulesLoading(true);
    try {
      const res = await scheduleService.getSchedules();
      const list = res.data || res || [];
      setSchedules(Array.isArray(list) ? list : []);
    } catch (err) {
      console.warn('[AppContext] Error fetching schedules:', err.message);
      setSchedules([]);
    } finally {
      setSchedulesLoading(false);
    }
  }, []);

  // Load initial backend state when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshRooms();
      refreshNotifications();
      refreshSchedules();
    } else {
      setRooms([]);
      setNotifications([]);
      setSchedules([]);
    }
  }, [isAuthenticated, refreshRooms, refreshNotifications, refreshSchedules]);

  // Modal helpers
  const openAddRoomModal = (tab = 'create') => {
    setAddRoomModalTab(tab);
    setIsAddRoomModalOpen(true);
  };

  const closeAddRoomModal = () => {
    setIsAddRoomModalOpen(false);
  };

  // Create room via backend API
  const addRoom = async (newRoomData) => {
    try {
      const res = await roomService.createRoom(newRoomData);
      const created = res.data || res;
      setRooms((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      throw err;
    }
  };

  // Join room via backend API
  const joinRoom = async (code) => {
    const res = await roomService.joinRoom({ code });
    await refreshRooms();
    return res.data || res;
  };

  // Notification operations connected to backend
  const markNotificationRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
    } catch (err) {
      // ignore
    }
    setNotifications((prev) =>
      prev.map((n) => (n._id === id || n.id === id ? { ...n, isRead: true, unread: false } : n))
    );
  };

  const markAllNotificationsRead = async () => {
    try {
      await notificationService.markAllAsRead();
    } catch (err) {
      // ignore
    }
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, unread: false }))
    );
  };

  // Schedule operations connected to backend
  const addScheduleEvent = async (newEvent) => {
    try {
      const res = await scheduleService.createSchedule(newEvent);
      const created = res.data || res;
      setSchedules((prev) => [...prev, created]);
      return created;
    } catch (err) {
      throw err;
    }
  };

  const unreadCount = React.useMemo(() => {
    if (!Array.isArray(notifications)) return 0;
    return notifications.filter((n) => !n?.isRead && n?.unread !== false).length;
  }, [notifications]);

  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    activeUniversity,
    setActiveUniversity,
    rooms,
    setRooms,
    roomsLoading,
    refreshRooms,
    addRoom,
    joinRoom,
    isAddRoomModalOpen,
    addRoomModalTab,
    openAddRoomModal,
    closeAddRoomModal,
    notifications,
    notificationsLoading,
    refreshNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount,
    schedules,
    schedulesLoading,
    refreshSchedules,
    addScheduleEvent,
    scheduleViewRole,
    setScheduleViewRole,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
