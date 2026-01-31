import { useState } from 'react';
import { ArrowLeft, Bell, Moon, Type, Clock, Volume2, Smartphone, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SettingsScreenProps {
  onBack: () => void;
}

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "w-12 h-7 rounded-full transition-colors relative",
        enabled ? "bg-primary" : "bg-gray-300"
      )}
    >
      <div className={cn(
        "absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all",
        enabled ? "right-1" : "left-1"
      )} />
    </button>
  );
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    notifications: true,
    dailyReminder: true,
    partnerActivity: true,
    shmilyAlerts: true,
    darkMode: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
    reminderTime: '08:00',
    soundEnabled: true,
    vibration: true,
  });

  const updateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="font-playfair text-lg font-semibold text-text-primary">Settings</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Notifications */}
        <div>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Notifications
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Push Notifications</p>
                  <p className="text-sm text-text-secondary">Enable all notifications</p>
                </div>
              </div>
              <Toggle
                enabled={settings.notifications}
                onChange={(v) => updateSetting('notifications', v)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Daily Reminder</p>
                  <p className="text-sm text-text-secondary">Remind to read devotional</p>
                </div>
              </div>
              <Toggle
                enabled={settings.dailyReminder}
                onChange={(v) => updateSetting('dailyReminder', v)}
              />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Partner Activity</p>
                  <p className="text-sm text-text-secondary">When spouse completes devotional</p>
                </div>
              </div>
              <Toggle
                enabled={settings.partnerActivity}
                onChange={(v) => updateSetting('partnerActivity', v)}
              />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">SHMILY Alerts</p>
                  <p className="text-sm text-text-secondary">Love note notifications</p>
                </div>
              </div>
              <Toggle
                enabled={settings.shmilyAlerts}
                onChange={(v) => updateSetting('shmilyAlerts', v)}
              />
            </div>
          </div>
        </div>

        {/* Reminder Time */}
        <div>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Reminder Time
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Daily Reminder Time</p>
                <p className="text-sm text-text-secondary">When would you like to be reminded?</p>
              </div>
            </div>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => updateSetting('reminderTime', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
            />
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Appearance
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Dark Mode</p>
                  <p className="text-sm text-text-secondary">Reduce eye strain</p>
                </div>
              </div>
              <Toggle
                enabled={settings.darkMode}
                onChange={(v) => updateSetting('darkMode', v)}
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Type className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Font Size</p>
                  <p className="text-sm text-text-secondary">Adjust text size</p>
                </div>
              </div>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateSetting('fontSize', size)}
                    className={cn(
                      "flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                      settings.fontSize === size
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                    )}
                  >
                    {settings.fontSize === size && <Check className="w-4 h-4" />}
                    <span className={cn(
                      size === 'small' && "text-sm",
                      size === 'medium' && "text-base",
                      size === 'large' && "text-lg"
                    )}>
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sound & Vibration */}
        <div>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Sound & Haptics
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Sound Effects</p>
                  <p className="text-sm text-text-secondary">Play sounds for actions</p>
                </div>
              </div>
              <Toggle
                enabled={settings.soundEnabled}
                onChange={(v) => updateSetting('soundEnabled', v)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Vibration</p>
                  <p className="text-sm text-text-secondary">Haptic feedback</p>
                </div>
              </div>
              <Toggle
                enabled={settings.vibration}
                onChange={(v) => updateSetting('vibration', v)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
