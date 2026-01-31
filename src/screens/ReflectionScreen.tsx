import { useState } from 'react';
import { ArrowLeft, Save, Share2, Check } from 'lucide-react';
import { emotions, reflectionQuestions } from '@/data/devotionals';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';

interface ReflectionScreenProps {
  weekNumber?: number;
  onBack: () => void;
  onSave: (reflection: ReflectionData) => void;
}

interface ReflectionData {
  weekNumber: number;
  date: Date;
  emotionalState: string;
  answers: Record<string, string>;
}

export function ReflectionScreen({ weekNumber = 1, onBack, onSave }: ReflectionScreenProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selectedEmotion) return;
    
    onSave({
      weekNumber,
      date: new Date(),
      emotionalState: selectedEmotion,
      answers,
    });
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
    <div className="pb-24 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="font-playfair text-lg font-semibold text-text-primary">
            Weekly Reflection
          </h1>
          <button
            onClick={handleSave}
            disabled={!selectedEmotion}
            className={cn(
              "p-2 rounded-full transition-colors",
              selectedEmotion 
                ? "text-primary hover:bg-primary/10" 
                : "text-gray-300"
            )}
          >
            {saved ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Save className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Date & Week Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Reflecting on</p>
              <p className="font-playfair text-xl font-semibold text-text-primary">Week {weekNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-text-secondary text-sm">Date</p>
              <p className="font-semibold text-text-primary">{format(new Date(), 'MMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        {/* Emotional State Picker */}
        <div className="mb-6">
          <h2 className="font-playfair text-lg font-semibold text-text-primary mb-3">
            How are you feeling?
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {emotions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => setSelectedEmotion(emotion.id)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl transition-all",
                  selectedEmotion === emotion.id
                    ? "bg-primary/10 border-2 border-primary shadow-sm"
                    : "bg-white border-2 border-transparent hover:bg-gray-50"
                )}
              >
                <span className="text-2xl mb-1">{emotion.emoji}</span>
                <span className="text-xs text-text-secondary">{emotion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reflection Questions */}
        <div className="space-y-4">
          <h2 className="font-playfair text-lg font-semibold text-text-primary">
            Reflection Questions
          </h2>
          
          {reflectionQuestions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </span>
                <label className="font-medium text-text-primary">
                  {q.question}
                </label>
              </div>
              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-text-primary placeholder:text-gray-400"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleSave}
            disabled={!selectedEmotion}
            className={cn(
              "w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
              selectedEmotion
                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <Save className="w-5 h-5" />
            {saved ? 'Saved!' : 'Save Reflection'}
          </button>
          
          <button className="w-full py-4 rounded-xl font-semibold bg-white border border-gray-200 text-text-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share with Spouse
          </button>
        </div>
      </div>
    </div>
  );
}
