import { useState } from 'react';
import { Plus, Check, Trash2, Heart, Target, Calendar, Lightbulb, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ListItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface ListCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  items: ListItem[];
}

export function ListsGoalsScreen({ onBack }: { onBack: () => void }) {
  const [categories, setCategories] = useState<ListCategory[]>([
    {
      id: 'bucket',
      title: 'Bucket List',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-pink-500',
      items: [
        { id: '1', text: 'Visit Paris together', completed: false, createdAt: new Date() },
        { id: '2', text: 'Learn to dance salsa', completed: false, createdAt: new Date() },
        { id: '3', text: 'Go on a hot air balloon ride', completed: true, createdAt: new Date() },
      ],
    },
    {
      id: 'prayer',
      title: 'Prayer Requests',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-primary',
      items: [
        { id: '4', text: 'Pray for wisdom in career decisions', completed: false, createdAt: new Date() },
        { id: '5', text: 'Pray for family health', completed: false, createdAt: new Date() },
      ],
    },
    {
      id: 'goals',
      title: 'Goals',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-accent',
      items: [
        { id: '6', text: 'Save $10,000 for vacation', completed: false, createdAt: new Date() },
        { id: '7', text: 'Read 12 books together this year', completed: false, createdAt: new Date() },
      ],
    },
    {
      id: 'dates',
      title: 'Date Night Ideas',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-rose-500',
      items: [
        { id: '8', text: 'Cooking class together', completed: false, createdAt: new Date() },
        { id: '9', text: 'Stargazing picnic', completed: false, createdAt: new Date() },
        { id: '10', text: 'Game night at home', completed: true, createdAt: new Date() },
      ],
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('bucket');
  const [newItemText, setNewItemText] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const currentCategory = categories.find(c => c.id === activeCategory)!;

  const handleAddItem = () => {
    if (!newItemText.trim()) return;

    setCategories(prev => prev.map(cat => {
      if (cat.id === activeCategory) {
        return {
          ...cat,
          items: [
            ...cat.items,
            {
              id: Date.now().toString(),
              text: newItemText,
              completed: false,
              createdAt: new Date(),
            },
          ],
        };
      }
      return cat;
    }));

    setNewItemText('');
    setShowAddInput(false);
  };

  const toggleItem = (itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === activeCategory) {
        return {
          ...cat,
          items: cat.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      }
      return cat;
    }));
  };

  const deleteItem = (itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === activeCategory) {
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId),
        };
      }
      return cat;
    }));
  };

  const completedCount = currentCategory.items.filter(i => i.completed).length;
  const totalCount = currentCategory.items.length;

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="font-playfair text-lg font-semibold text-text-primary">Lists & Goals</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap",
                activeCategory === cat.id
                  ? `${cat.color} text-white`
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {cat.icon}
              <span className="text-sm font-medium">{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Progress</span>
            <span className="text-sm font-semibold text-text-primary">{completedCount} / {totalCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={cn("h-2 rounded-full transition-all", currentCategory.color)}
              style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="px-4">
        <div className="space-y-2">
          {currentCategory.items.map(item => (
            <div
              key={item.id}
              className={cn(
                "bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 transition-all",
                item.completed && "opacity-60"
              )}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                  item.completed
                    ? `${currentCategory.color} border-transparent`
                    : "border-gray-300 hover:border-primary"
                )}
              >
                {item.completed && <Check className="w-4 h-4 text-white" />}
              </button>
              <span className={cn(
                "flex-1 text-text-primary",
                item.completed && "line-through"
              )}>
                {item.text}
              </span>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Item */}
        {showAddInput ? (
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Enter new item..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder:text-gray-400 mb-3"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddInput(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-text-secondary hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={!newItemText.trim()}
                className={cn(
                  "flex-1 py-2 rounded-lg font-semibold transition-all",
                  newItemText.trim()
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddInput(true)}
            className="mt-4 w-full bg-white rounded-xl p-4 shadow-sm border border-dashed border-gray-300 flex items-center justify-center gap-2 text-text-secondary hover:border-primary hover:text-primary transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add new item</span>
          </button>
        )}

        {/* Empty State */}
        {currentCategory.items.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-text-secondary">No items yet</p>
            <p className="text-sm text-gray-400 mt-1">Add your first {currentCategory.title.toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
