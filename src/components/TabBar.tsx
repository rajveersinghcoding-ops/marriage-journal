import { Home, BookOpen, Calendar, Heart, Menu } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'devotionals', label: 'Devotionals', icon: BookOpen },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'shmily', label: 'SHMILY', icon: Heart },
  { id: 'menu', label: 'Menu', icon: Menu },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="max-w-[430px] mx-auto">
        <nav className="flex justify-around items-center py-2 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-text-secondary hover:text-primary"
                )}
              >
                <Icon 
                  className={cn(
                    "w-6 h-6 mb-1 transition-transform",
                    isActive && "scale-110"
                  )} 
                  fill={isActive && tab.id === 'shmily' ? 'currentColor' : 'none'}
                />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
