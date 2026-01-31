import { useState } from 'react';
import { Bell, User, X, Check, Heart, BookOpen, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';

interface HeaderProps {
  userName?: string;
  title?: string;
}

interface Notification {
  id: string;
  type: 'devotional' | 'shmily' | 'reminder';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'shmily',
    title: 'New Love Note',
    message: 'Michael sent you a SHMILY note 💕',
    time: new Date(Date.now() - 3600000),
    isRead: false,
  },
  {
    id: '2',
    type: 'devotional',
    title: 'New Devotional Available',
    message: 'Week 5: Kindness is ready to read',
    time: new Date(Date.now() - 86400000),
    isRead: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Daily Reminder',
    message: "Don't forget your reflection today!",
    time: new Date(Date.now() - 172800000),
    isRead: true,
  },
];

export function Header({ userName = 'Sarah', title }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'shmily':
        return <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />;
      case 'devotional':
        return <BookOpen className="w-4 h-4 text-primary" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-accent" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold">
              {userName.charAt(0)}
            </div>
            <div>
              {title ? (
                <h1 className="font-playfair text-lg font-semibold text-text-primary">{title}</h1>
              ) : (
                <>
                  <p className="text-sm text-text-secondary">Welcome back,</p>
                  <p className="font-semibold text-text-primary">{userName}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-text-secondary" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-xs font-bold text-secondary flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowNotifications(false)} 
          />
          <div className="absolute top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slideDown">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Mark all read
                  </button>
                )}
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0",
                      !notification.isRead && "bg-primary/5"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-text-primary truncate">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(notification.time, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">No notifications</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Profile Quick Menu */}
      {showProfile && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowProfile(false)} 
          />
          <div className="absolute top-16 right-4 z-50 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slideDown">
            <div className="p-4 bg-gradient-to-br from-primary to-primary-light text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{userName}</p>
                  <p className="text-white/80 text-sm">Premium Member</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-text-primary">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm">Connected with Michael</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-text-primary">
                <span className="text-sm">🔥 7 Day Streak!</span>
              </div>
            </div>
            <div className="border-t border-gray-100 p-2">
              <button 
                onClick={() => setShowProfile(false)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-text-secondary"
              >
                View full profile →
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
