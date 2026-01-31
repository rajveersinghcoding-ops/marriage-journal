import { useState } from 'react';
import { Heart, Send, Clock, Check, Sparkles, Gift } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/utils/cn';

interface ShmilyNote {
  id: string;
  message: string;
  sentAt: Date;
  isRead: boolean;
  type: 'sent' | 'received';
}

interface ShmilyScreenProps {
  onShowToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}

const sampleNotes: ShmilyNote[] = [
  {
    id: '1',
    message: "Just thinking about you and wanted you to know you're amazing! 💕",
    sentAt: new Date(Date.now() - 86400000),
    isRead: true,
    type: 'received',
  },
  {
    id: '2',
    message: "Thank you for making my coffee this morning. It's the little things! ☕",
    sentAt: new Date(Date.now() - 172800000),
    isRead: true,
    type: 'sent',
  },
  {
    id: '3',
    message: "Can't wait for our date night this weekend! 🥰",
    sentAt: new Date(Date.now() - 259200000),
    isRead: true,
    type: 'received',
  },
];

const quickMessages = [
  "I love you! 💕",
  "You're my favorite person 🥰",
  "Thinking of you right now 💭",
  "You make my heart smile 😊",
  "So grateful for you 🙏",
  "You're amazing! ✨",
];

export function ShmilyScreen({ onShowToast }: ShmilyScreenProps) {
  const [notes, setNotes] = useState<ShmilyNote[]>(sampleNotes);
  const [newMessage, setNewMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newNote: ShmilyNote = {
      id: Date.now().toString(),
      message: newMessage,
      sentAt: new Date(),
      isRead: false,
      type: 'sent',
    };

    setNotes([newNote, ...notes]);
    setNewMessage('');
    setShowSuccess(true);
    
    if (onShowToast) {
      onShowToast('Love note sent to Michael! 💕', 'success');
    }
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuickMessage = (message: string) => {
    setNewMessage(message);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100"></div>
        <div className="relative px-6 pt-6 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="font-dancing text-3xl text-rose-600 mb-2">SHMILY</h1>
          <p className="text-rose-500 text-sm font-medium">See How Much I Love You</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex gap-1">
          <button
            onClick={() => setActiveTab('compose')}
            className={cn(
              "flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
              activeTab === 'compose'
                ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white"
                : "text-text-secondary hover:bg-gray-50"
            )}
          >
            <Send className="w-4 h-4" />
            Send Note
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
              activeTab === 'history'
                ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white"
                : "text-text-secondary hover:bg-gray-50"
            )}
          >
            <Clock className="w-4 h-4" />
            History
          </button>
        </div>
      </div>

      {activeTab === 'compose' ? (
        <div className="px-4 py-6">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-4 bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-semibold text-success">Note Sent!</p>
                <p className="text-sm text-text-secondary">Your love note is on its way 💕</p>
              </div>
            </div>
          )}

          {/* Compose Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-semibold text-text-primary">Write a love note</span>
            </div>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Express your love..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-pink-50/50 border border-pink-100 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all resize-none text-text-primary placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={cn(
                "w-full mt-3 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
                newMessage.trim()
                  ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
              Send to Michael
            </button>
          </div>

          {/* Quick Messages */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-primary" />
              <span className="font-semibold text-text-primary">Quick Messages</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(message)}
                  className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-left hover:border-rose-200 hover:bg-rose-50/50 transition-all"
                >
                  <span className="text-sm text-text-primary">{message}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Upsell */}
          <div className="mt-6 bg-gradient-to-br from-secondary to-gray-800 rounded-2xl p-5 text-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-accent" fill="currentColor" />
              </div>
              <div>
                <p className="font-semibold mb-1">Unlimited SHMILY Notes</p>
                <p className="text-sm text-white/70 mb-3">
                  Send unlimited love notes with Premium! You have 2 notes left this month.
                </p>
                <button className="bg-accent text-secondary px-4 py-2 rounded-full font-semibold text-sm hover:bg-accent-light transition-colors">
                  Upgrade to Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6">
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className={cn(
                  "bg-white rounded-xl p-4 shadow-sm border border-gray-100",
                  note.type === 'received' && "bg-pink-50/50 border-pink-100"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {note.type === 'received' ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" fill="currentColor" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Send className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <span className="font-medium text-sm text-text-primary">
                      {note.type === 'received' ? 'From Michael' : 'To Michael'}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {format(note.sentAt, 'MMM d')}
                  </span>
                </div>
                <p className="text-text-primary pl-10">{note.message}</p>
              </div>
            ))}
          </div>

          {notes.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-text-secondary">No notes yet</p>
              <p className="text-sm text-gray-400 mt-1">Send your first love note!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
