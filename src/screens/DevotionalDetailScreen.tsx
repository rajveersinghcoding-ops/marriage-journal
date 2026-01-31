import { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, ChevronDown, ChevronUp, PenLine, Check } from 'lucide-react';
import { Devotional } from '@/data/devotionals';
import { cn } from '@/utils/cn';

interface DevotionalDetailScreenProps {
  devotional: Devotional;
  onBack: () => void;
  onNavigate: (screen: string, data?: Record<string, unknown>) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onMarkAsRead: () => void;
  onShowToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-playfair text-lg font-semibold text-text-primary">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[2000px] pb-4" : "max-h-0"
      )}>
        {children}
      </div>
    </div>
  );
}

export function DevotionalDetailScreen({
  devotional,
  onBack,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  onMarkAsRead,
  onShowToast,
}: DevotionalDetailScreenProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [practiceChecked, setPracticeChecked] = useState<Record<number, boolean>>({});

  // Mark as read when viewing
  useEffect(() => {
    onMarkAsRead();
  }, [onMarkAsRead]);

  const handleShare = (method: string) => {
    setShowShareMenu(false);
    if (onShowToast) {
      if (method === 'copy') {
        navigator.clipboard.writeText(`Check out this devotional: ${devotional.title} - ${devotional.scripture.reference}`);
        onShowToast('Link copied to clipboard!', 'success');
      } else {
        onShowToast(`Shared via ${method}!`, 'success');
      }
    }
  };

  const togglePractice = (index: number) => {
    setPracticeChecked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="pb-24">
      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={devotional.imageUrl}
          alt={devotional.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onToggleBookmark();
                if (onShowToast) {
                  onShowToast(
                    isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
                    'success'
                  );
                }
              }}
              className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-accent" fill="currentColor" />
              ) : (
                <Bookmark className="w-5 h-5 text-text-primary" />
              )}
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Share2 className="w-5 h-5 text-text-primary" />
              </button>
              
              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[150px] z-50">
                  <button 
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                  >
                    Copy Link
                  </button>
                  <button 
                    onClick={() => handleShare('Message')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                  >
                    Share via Message
                  </button>
                  <button 
                    onClick={() => handleShare('Email')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                  >
                    Share via Email
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-sm mb-1">Week {devotional.weekNumber}</p>
          <h1 className="font-playfair text-3xl font-bold text-white">{devotional.title}</h1>
        </div>
      </div>

      {/* Scripture Block */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-start gap-3">
            <span className="text-4xl text-accent opacity-80">"</span>
            <div>
              <p className="font-playfair text-lg italic leading-relaxed mb-3">
                {devotional.scripture.text}
              </p>
              <p className="text-white/80 font-semibold">— {devotional.scripture.reference}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 mt-6">
        <CollapsibleSection title="Devotional" defaultOpen={true}>
          <div className="prose prose-sm max-w-none">
            {devotional.devotionalContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-text-secondary leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Ponder">
          <div className="space-y-3">
            {devotional.ponderQuestions.map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-text-primary">{question}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Practice">
          <div className="space-y-3">
            {devotional.practiceItems.map((item, index) => (
              <button
                key={index}
                onClick={() => togglePractice(index)}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all",
                  practiceChecked[index] 
                    ? "bg-primary border-primary" 
                    : "border-gray-300 hover:border-primary"
                )}>
                  {practiceChecked[index] && <Check className="w-3 h-3 text-white" />}
                </div>
                <p className={cn(
                  "transition-all",
                  practiceChecked[index] ? "text-text-secondary line-through" : "text-text-primary"
                )}>
                  {item}
                </p>
              </button>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Prayer">
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
            <p className="text-text-primary italic leading-relaxed">
              {devotional.prayer}
            </p>
          </div>
        </CollapsibleSection>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
        <div className="max-w-[430px] mx-auto">
          <button
            onClick={() => onNavigate('reflection', { weekNumber: devotional.weekNumber })}
            className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <PenLine className="w-5 h-5" />
            Reflect & Journal
          </button>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
}
