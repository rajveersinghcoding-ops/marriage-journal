import { BookOpen, Heart, PenLine, Sparkles, ChevronRight, Star, Calendar, Target } from 'lucide-react';
import { devotionals } from '@/data/devotionals';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: Record<string, unknown>) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const currentWeek = devotionals[0];
  const progress = 4; // weeks completed
  const totalWeeks = 54;
  
  return (
    <div className="pb-24 bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="relative px-6 pt-6 pb-8">
          <div className="text-center mb-6">
            <h1 className="font-dancing text-4xl text-primary mb-2">The Marriage Journal</h1>
            <p className="text-text-secondary text-sm">Connect • Express • Communicate • Love • Grow Together</p>
          </div>
          
          {/* Quote of the Day */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="font-playfair text-text-primary italic text-sm leading-relaxed">
                  "A great marriage is not when the 'perfect couple' comes together. It is when an imperfect couple learns to enjoy their differences."
                </p>
                <p className="text-text-secondary text-xs mt-2">— Dave Meurer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-4 mb-6">
        <button 
          onClick={() => onNavigate('calendar')}
          className="w-full text-left bg-gradient-to-r from-primary to-primary-light rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Your Journey</p>
              <p className="text-2xl font-bold">Week {progress} of {totalWeeks}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl font-bold">{Math.round((progress / totalWeeks) * 100)}%</span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress / totalWeeks) * 100}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-xs">Keep going! You're building a stronger marriage every week.</p>
        </button>
      </div>

      {/* Current Week Devotional */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-playfair text-xl font-semibold text-text-primary">This Week's Devotional</h2>
          <button 
            onClick={() => onNavigate('devotionals')}
            className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={() => onNavigate('devotional-detail', { devotional: currentWeek })}
          className="w-full text-left"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="relative h-40">
              <img 
                src={currentWeek.imageUrl} 
                alt={currentWeek.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-white/80 text-xs mb-1">Week {currentWeek.weekNumber}</p>
                <h3 className="font-playfair text-xl font-bold text-white">{currentWeek.title}</h3>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-accent text-secondary px-3 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                {currentWeek.devotionalContent.substring(0, 120)}...
              </p>
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Read & Reflect</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h2 className="font-playfair text-xl font-semibold text-text-primary mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('reflection', { weekNumber: 1 })}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-primary/30 text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <PenLine className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Weekly Reflection</h3>
            <p className="text-text-secondary text-xs">Journal your thoughts together</p>
          </button>
          
          <button 
            onClick={() => onNavigate('shmily')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-accent/30 text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-accent" fill="currentColor" />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Send SHMILY</h3>
            <p className="text-text-secondary text-xs">Show how much you love them</p>
          </button>

          <button 
            onClick={() => onNavigate('calendar')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-primary/30 text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Calendar</h3>
            <p className="text-text-secondary text-xs">Track your progress</p>
          </button>
          
          <button 
            onClick={() => onNavigate('lists-goals')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-primary/30 text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Lists & Goals</h3>
            <p className="text-text-secondary text-xs">Bucket list, prayer requests</p>
          </button>
        </div>
      </div>

      {/* Recent Devotionals */}
      <div className="px-4 mb-6">
        <h2 className="font-playfair text-xl font-semibold text-text-primary mb-3">Continue Reading</h2>
        <div className="space-y-3">
          {devotionals.slice(1, 4).map((devotional) => (
            <button
              key={devotional.id}
              onClick={() => onNavigate('devotional-detail', { devotional })}
              className="w-full bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-3 active:scale-[0.99]"
            >
              <img 
                src={devotional.imageUrl} 
                alt={devotional.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 text-left">
                <p className="text-text-secondary text-xs mb-1">Week {devotional.weekNumber}</p>
                <h3 className="font-semibold text-text-primary">{devotional.title}</h3>
                <p className="text-text-secondary text-xs mt-1">{devotional.scripture.reference}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Premium Banner */}
      <div className="px-4">
        <button 
          onClick={() => onNavigate('premium')}
          className="w-full text-left bg-gradient-to-r from-secondary to-gray-800 rounded-2xl p-5 text-white relative overflow-hidden hover:shadow-lg transition-all active:scale-[0.99]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-accent" fill="currentColor" />
              <span className="text-accent font-semibold">Premium</span>
            </div>
            <h3 className="font-playfair text-lg font-bold mb-2">Unlock All 54 Devotionals</h3>
            <p className="text-white/70 text-sm mb-4">
              Get unlimited access to all devotionals, couple sync, and more.
            </p>
            <span className="inline-block bg-accent text-secondary px-4 py-2 rounded-full font-semibold text-sm hover:bg-accent-light transition-colors">
              Start Free Trial
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
