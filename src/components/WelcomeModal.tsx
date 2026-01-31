import { useState } from 'react';
import { X, Heart, BookOpen, Calendar, MessageCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    icon: Heart,
    title: "Welcome to The Marriage Journal",
    description: "A faith-based devotional app designed to help you and your spouse grow closer together in love and faith.",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop",
  },
  {
    icon: BookOpen,
    title: "Weekly Devotionals",
    description: "Explore 54+ devotionals covering topics like communication, intimacy, spiritual growth, and more.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
  },
  {
    icon: Calendar,
    title: "Reflect Together",
    description: "Journal your thoughts, track your progress, and share reflections with your spouse.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
  },
  {
    icon: MessageCircle,
    title: "SHMILY Notes",
    description: "Send surprise love notes to your spouse and remind them: 'See How Much I Love You.'",
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&h=600&fit=crop",
  },
];

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={handleSkip}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Image */}
        <div className="relative h-48 mx-4 rounded-2xl overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">
            {slide.title}
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            {slide.description}
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === index
                    ? "w-6 bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!isLastSlide && (
              <button
                onClick={handleSkip}
                className="flex-1 py-3 rounded-xl font-medium text-text-secondary hover:bg-gray-100 transition-colors"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {isLastSlide ? 'Get Started' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
