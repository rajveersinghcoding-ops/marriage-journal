import { useState, useCallback, useEffect } from 'react';
import { TabBar } from '@/components/TabBar';
import { Header } from '@/components/Header';
import { WelcomeModal } from '@/components/WelcomeModal';
import { Toast } from '@/components/Toast';
import { HomeScreen } from '@/screens/HomeScreen';
import { DevotionalListScreen } from '@/screens/DevotionalListScreen';
import { DevotionalDetailScreen } from '@/screens/DevotionalDetailScreen';
import { ReflectionScreen } from '@/screens/ReflectionScreen';
import { CalendarScreen } from '@/screens/CalendarScreen';
import { ShmilyScreen } from '@/screens/ShmilyScreen';
import { MenuScreen } from '@/screens/MenuScreen';
import { ListsGoalsScreen } from '@/screens/ListsGoalsScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { PremiumScreen } from '@/screens/PremiumScreen';
import { Devotional } from '@/data/devotionals';

type Screen = 
  | 'home' 
  | 'devotionals' 
  | 'devotional-detail' 
  | 'reflection' 
  | 'calendar' 
  | 'shmily' 
  | 'menu'
  | 'lists-goals'
  | 'settings'
  | 'profile'
  | 'premium';

interface NavigationState {
  screen: Screen;
  data?: Record<string, unknown>;
}

interface UserProgress {
  read: string[];
  reflected: string[];
  bookmarked: string[];
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export function App() {
  const [navigation, setNavigation] = useState<NavigationState>({ screen: 'home' });
  const [activeTab, setActiveTab] = useState('home');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      read: ['1', '2', '3'],
      reflected: ['1', '2'],
      bookmarked: ['1', '4'],
    };
  });
  const [showWelcome, setShowWelcome] = useState(true);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', isVisible: false });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const navigate = useCallback((screen: string, data?: Record<string, unknown>) => {
    setNavigation({ screen: screen as Screen, data });
    
    // Update active tab for main screens
    if (['home', 'devotionals', 'calendar', 'shmily', 'menu'].includes(screen)) {
      setActiveTab(screen);
    }
  }, []);

  const goBack = useCallback(() => {
    // Handle back navigation based on current screen
    switch (navigation.screen) {
      case 'devotional-detail':
        setNavigation({ screen: 'devotionals' });
        setActiveTab('devotionals');
        break;
      case 'reflection':
        if (navigation.data?.fromDevotional) {
          setNavigation({ screen: 'devotional-detail', data: navigation.data });
        } else {
          setNavigation({ screen: 'home' });
          setActiveTab('home');
        }
        break;
      case 'lists-goals':
      case 'settings':
      case 'profile':
      case 'premium':
        setNavigation({ screen: 'menu' });
        setActiveTab('menu');
        break;
      default:
        setNavigation({ screen: 'home' });
        setActiveTab('home');
    }
  }, [navigation.screen, navigation.data]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setNavigation({ screen: tab as Screen });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setUserProgress(prev => {
      const isCurrentlyBookmarked = prev.bookmarked.includes(id);
      return {
        ...prev,
        bookmarked: isCurrentlyBookmarked
          ? prev.bookmarked.filter(b => b !== id)
          : [...prev.bookmarked, id],
      };
    });
  }, []);

  const markAsRead = useCallback((id: string) => {
    setUserProgress(prev => ({
      ...prev,
      read: prev.read.includes(id) ? prev.read : [...prev.read, id],
    }));
  }, []);

  const markAsReflected = useCallback((weekNumber: number) => {
    const id = weekNumber.toString();
    setUserProgress(prev => ({
      ...prev,
      reflected: prev.reflected.includes(id) ? prev.reflected : [...prev.reflected, id],
    }));
    showToast('Reflection saved successfully!', 'success');
  }, [showToast]);

  const getHeaderTitle = () => {
    switch (navigation.screen) {
      case 'devotionals':
        return 'Devotionals';
      case 'calendar':
        return 'Calendar';
      case 'shmily':
        return 'SHMILY';
      case 'menu':
        return 'Menu';
      default:
        return undefined;
    }
  };

  const renderScreen = () => {
    switch (navigation.screen) {
      case 'home':
        return <HomeScreen onNavigate={navigate} />;
      
      case 'devotionals':
        return (
          <DevotionalListScreen
            onNavigate={navigate}
            userProgress={userProgress}
            onToggleBookmark={toggleBookmark}
          />
        );
      
      case 'devotional-detail':
        const devotional = navigation.data?.devotional as Devotional;
        if (!devotional) {
          return <HomeScreen onNavigate={navigate} />;
        }
        return (
          <DevotionalDetailScreen
            devotional={devotional}
            onBack={goBack}
            onNavigate={navigate}
            isBookmarked={userProgress.bookmarked.includes(devotional.id)}
            onToggleBookmark={() => toggleBookmark(devotional.id)}
            onMarkAsRead={() => markAsRead(devotional.id)}
            onShowToast={showToast}
          />
        );
      
      case 'reflection':
        const weekNumber = (navigation.data?.weekNumber as number) || 1;
        return (
          <ReflectionScreen
            weekNumber={weekNumber}
            onBack={goBack}
            onSave={(reflection) => {
              markAsReflected(reflection.weekNumber);
              goBack();
            }}
          />
        );
      
      case 'calendar':
        return <CalendarScreen userProgress={userProgress} />;
      
      case 'shmily':
        return <ShmilyScreen onShowToast={showToast} />;
      
      case 'menu':
        return <MenuScreen onNavigate={navigate} />;

      case 'lists-goals':
        return <ListsGoalsScreen onBack={goBack} />;

      case 'settings':
        return <SettingsScreen onBack={goBack} />;

      case 'profile':
        return <ProfileScreen onBack={goBack} onShowToast={showToast} />;

      case 'premium':
        return <PremiumScreen onBack={goBack} onShowToast={showToast} />;
      
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  // Determine which screens should show the header and tab bar
  const fullScreens = ['devotional-detail', 'reflection', 'lists-goals', 'settings', 'profile', 'premium'];
  const showHeader = !fullScreens.includes(navigation.screen) && navigation.screen !== 'menu';
  const showTabBar = !['lists-goals', 'settings', 'profile', 'premium'].includes(navigation.screen);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mobile-container bg-white">
        {showHeader && (
          <Header 
            userName="Sarah" 
            title={getHeaderTitle()}
          />
        )}
        
        <main>
          {renderScreen()}
        </main>
        
        {showTabBar && (
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
      
      <WelcomeModal isOpen={showWelcome} onClose={handleCloseWelcome} />
      
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
