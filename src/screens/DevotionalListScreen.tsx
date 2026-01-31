import { useState } from 'react';
import { Search, Filter, BookOpen, CheckCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { devotionals, Devotional } from '@/data/devotionals';
import { cn } from '@/utils/cn';

interface DevotionalListScreenProps {
  onNavigate: (screen: string, data?: Record<string, unknown>) => void;
  userProgress: { read: string[]; reflected: string[]; bookmarked: string[] };
  onToggleBookmark: (id: string) => void;
}

type FilterTab = 'all' | 'recent' | 'bookmarked';

export function DevotionalListScreen({ 
  onNavigate, 
  userProgress,
  onToggleBookmark 
}: DevotionalListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState<'week' | 'az'>('week');

  let filteredDevotionals = devotionals.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.scripture.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'bookmarked') {
      return matchesSearch && userProgress.bookmarked.includes(d.id);
    }
    if (activeFilter === 'recent') {
      return matchesSearch && userProgress.read.includes(d.id);
    }
    return matchesSearch;
  });

  // Apply sorting
  if (sortOrder === 'az') {
    filteredDevotionals = [...filteredDevotionals].sort((a, b) => a.title.localeCompare(b.title));
  }

  const getMonthLabel = (monthNumber: number) => {
    const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4'];
    return months[monthNumber - 1] || `Month ${monthNumber}`;
  };

  const groupedDevotionals = sortOrder === 'week' 
    ? filteredDevotionals.reduce((acc, devotional) => {
        const month = getMonthLabel(devotional.monthNumber);
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(devotional);
        return acc;
      }, {} as Record<string, Devotional[]>)
    : { 'All Devotionals': filteredDevotionals };

  return (
    <div className="pb-24">
      {/* Search and Filter Header */}
      <div className="sticky top-0 bg-white z-30 px-4 py-4 border-b border-gray-100">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search devotionals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all text-text-primary placeholder:text-gray-400"
          />
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors",
              showFilterMenu ? "bg-primary/10" : ""
            )}
          >
            <Filter className={cn("w-5 h-5", showFilterMenu ? "text-primary" : "text-gray-400")} />
          </button>
        </div>

        {/* Sort Options (shown when filter clicked) */}
        {showFilterMenu && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-text-secondary mb-2">Sort by:</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder('week')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  sortOrder === 'week' ? "bg-primary text-white" : "bg-white text-text-secondary"
                )}
              >
                Week Order
              </button>
              <button
                onClick={() => setSortOrder('az')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  sortOrder === 'az' ? "bg-primary text-white" : "bg-white text-text-secondary"
                )}
              >
                A-Z
              </button>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'recent', 'bookmarked'] as FilterTab[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {filter === 'all' && 'All'}
              {filter === 'recent' && 'Recently Read'}
              {filter === 'bookmarked' && 'Bookmarked'}
            </button>
          ))}
        </div>
      </div>

      {/* Devotional List */}
      <div className="px-4 py-4">
        {Object.entries(groupedDevotionals).map(([month, monthDevotionals]) => (
          <div key={month} className="mb-6">
            <h2 className="font-playfair text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              {month}
            </h2>
            
            <div className="space-y-3">
              {monthDevotionals.map((devotional) => {
                const isRead = userProgress.read.includes(devotional.id);
                const isReflected = userProgress.reflected.includes(devotional.id);
                const isBookmarked = userProgress.bookmarked.includes(devotional.id);

                return (
                  <div
                    key={devotional.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="flex items-stretch">
                      <button
                        onClick={() => onNavigate('devotional-detail', { devotional })}
                        className="flex-1 flex items-stretch text-left"
                      >
                        <div className="relative w-24 flex-shrink-0">
                          <img
                            src={devotional.imageUrl}
                            alt={devotional.title}
                            className="w-full h-full object-cover min-h-[100px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                        </div>
                        
                        <div className="flex-1 p-3">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="text-xs text-primary font-medium mb-1">
                                Week {devotional.weekNumber}
                              </p>
                              <h3 className="font-semibold text-text-primary">
                                {devotional.title}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-xs text-text-secondary mb-2">
                            {devotional.scripture.reference}
                          </p>
                          
                          {/* Progress Indicators */}
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex items-center gap-1 text-xs",
                              isRead ? "text-success" : "text-gray-400"
                            )}>
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Read</span>
                            </div>
                            <div className={cn(
                              "flex items-center gap-1 text-xs",
                              isReflected ? "text-success" : "text-gray-400"
                            )}>
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Reflected</span>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(devotional.id);
                        }}
                        className="px-3 flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-gray-100"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-5 h-5 text-accent" fill="currentColor" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredDevotionals.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-text-secondary">No devotionals found</p>
            {activeFilter !== 'all' && (
              <button 
                onClick={() => setActiveFilter('all')}
                className="mt-2 text-primary text-sm font-medium"
              >
                View all devotionals
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
