import { 
  User, 
  Settings, 
  Crown, 
  Bell, 
  Moon, 
  HelpCircle, 
  FileText, 
  ExternalLink, 
  ChevronRight,
  LogOut,
  BookOpen,
  Heart,
  Target,
  Share2
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface MenuScreenProps {
  onNavigate: (screen: string, data?: Record<string, unknown>) => void;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  variant?: 'default' | 'premium' | 'danger';
}

function MenuItem({ icon, label, description, onClick, trailing, variant = 'default' }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl transition-all",
        variant === 'default' && "hover:bg-gray-50",
        variant === 'premium' && "bg-gradient-to-r from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10",
        variant === 'danger' && "hover:bg-red-50"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        variant === 'default' && "bg-gray-100",
        variant === 'premium' && "bg-accent/20",
        variant === 'danger' && "bg-red-100"
      )}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className={cn(
          "font-medium",
          variant === 'danger' ? "text-red-600" : "text-text-primary"
        )}>
          {label}
        </p>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {trailing || <ChevronRight className="w-5 h-5 text-gray-400" />}
    </button>
  );
}

export function MenuScreen({ onNavigate }: MenuScreenProps) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-6 pt-8 pb-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('profile')}
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold ring-4 ring-white/30 hover:ring-white/50 transition-all"
          >
            S
          </button>
          <div>
            <h1 className="text-2xl font-bold">Sarah & Michael</h1>
            <p className="text-white/80">Together since June 2018</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-white/80">Devotionals</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-white/80">Reflections</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs text-white/80">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="px-4 -mt-6 relative z-10 mb-4">
        <button
          onClick={() => onNavigate('premium')}
          className="w-full bg-gradient-to-r from-accent to-accent-light rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <Crown className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-secondary">Upgrade to Premium</p>
            <p className="text-sm text-secondary/70">Unlock all 54 devotionals</p>
          </div>
          <ChevronRight className="w-5 h-5 text-secondary" />
        </button>
      </div>

      {/* Menu Sections */}
      <div className="px-4">
        {/* Quick Access */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 px-4">
            Quick Access
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <MenuItem
              icon={<BookOpen className="w-5 h-5 text-primary" />}
              label="Devotionals"
              description="Weekly marriage devotionals"
              onClick={() => onNavigate('devotionals')}
            />
            <MenuItem
              icon={<Target className="w-5 h-5 text-primary" />}
              label="Lists & Goals"
              description="Bucket list, prayer requests, goals"
              onClick={() => onNavigate('lists-goals')}
            />
            <MenuItem
              icon={<Heart className="w-5 h-5 text-pink-500" />}
              label="SHMILY Notes"
              description="Send love notes to your spouse"
              onClick={() => onNavigate('shmily')}
            />
          </div>
        </div>

        {/* Account */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 px-4">
            Account
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <MenuItem
              icon={<User className="w-5 h-5 text-primary" />}
              label="Profile"
              description="Manage your account"
              onClick={() => onNavigate('profile')}
            />
            <MenuItem
              icon={<Crown className="w-5 h-5 text-accent" />}
              label="Premium Subscription"
              description="Free Trial • 7 days remaining"
              variant="premium"
              onClick={() => onNavigate('premium')}
            />
            <MenuItem
              icon={<Share2 className="w-5 h-5 text-primary" />}
              label="Partner Connection"
              description="Connected with Michael"
              onClick={() => onNavigate('profile')}
            />
          </div>
        </div>

        {/* Settings */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 px-4">
            Settings
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <MenuItem
              icon={<Bell className="w-5 h-5 text-primary" />}
              label="Notifications"
              description="Reminders & alerts"
              onClick={() => onNavigate('settings')}
            />
            <MenuItem
              icon={<Moon className="w-5 h-5 text-primary" />}
              label="Appearance"
              description="Dark mode, font size"
              onClick={() => onNavigate('settings')}
            />
            <MenuItem
              icon={<Settings className="w-5 h-5 text-primary" />}
              label="Preferences"
              description="App settings"
              onClick={() => onNavigate('settings')}
            />
          </div>
        </div>

        {/* Support */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 px-4">
            Support
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <MenuItem
              icon={<HelpCircle className="w-5 h-5 text-primary" />}
              label="Help & Support"
              description="FAQs, contact us"
              onClick={() => window.open('https://charisclarion.com', '_blank')}
            />
            <MenuItem
              icon={<FileText className="w-5 h-5 text-primary" />}
              label="Privacy Policy"
              onClick={() => window.open('https://charisclarion.com/privacy', '_blank')}
            />
            <MenuItem
              icon={<ExternalLink className="w-5 h-5 text-primary" />}
              label="Get the Physical Journal"
              description="charisclarion.com"
              onClick={() => window.open('https://charisclarion.com', '_blank')}
            />
          </div>
        </div>

        {/* Logout */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <MenuItem
              icon={<LogOut className="w-5 h-5 text-red-500" />}
              label="Sign Out"
              variant="danger"
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-6">
          <p className="font-dancing text-2xl text-primary mb-1">The Marriage Journal</p>
          <p className="text-sm text-text-secondary">Version 1.0.0</p>
          <p className="text-xs text-text-secondary mt-1">© 2024 Charis Clarion</p>
        </div>
      </div>
    </div>
  );
}
