import { useState } from 'react';
import { ArrowLeft, Check, Crown, Star, BookOpen, Heart, RefreshCw, Download, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PremiumScreenProps {
  onBack: () => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const features = [
  { icon: BookOpen, text: 'All 54+ Weekly Devotionals' },
  { icon: Heart, text: 'Unlimited SHMILY Notes' },
  { icon: RefreshCw, text: 'Partner Sync & Sharing' },
  { icon: Download, text: 'Export Journal Entries' },
  { icon: Star, text: 'Ad-Free Experience' },
];

export function PremiumScreen({ onBack, onShowToast }: PremiumScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onShowToast('Welcome to Premium! Enjoy all features.', 'success');
      onBack();
    }, 2000);
  };

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-b from-secondary via-gray-900 to-secondary">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={onBack} className="text-sm font-medium text-white/70 hover:text-white">
          Restore Purchase
        </button>
      </div>

      {/* Hero */}
      <div className="px-6 pt-4 pb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30">
          <Crown className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="font-playfair text-3xl font-bold text-white mb-3">
          Upgrade to Premium
        </h1>
        <p className="text-white/70 max-w-xs mx-auto">
          Unlock the full Marriage Journal experience and grow your relationship together
        </p>
      </div>

      {/* Features */}
      <div className="px-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 text-center">Everything included:</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-white">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {/* Monthly */}
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={cn(
              "relative rounded-2xl p-4 text-left transition-all",
              selectedPlan === 'monthly'
                ? "bg-white ring-2 ring-accent"
                : "bg-white/10 hover:bg-white/20"
            )}
          >
            <div className={cn(
              "absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center",
              selectedPlan === 'monthly'
                ? "bg-accent border-accent"
                : "border-white/50"
            )}>
              {selectedPlan === 'monthly' && <Check className="w-3 h-3 text-secondary" />}
            </div>
            <p className={cn(
              "text-sm font-medium mb-1",
              selectedPlan === 'monthly' ? "text-text-secondary" : "text-white/70"
            )}>
              Monthly
            </p>
            <p className={cn(
              "text-2xl font-bold",
              selectedPlan === 'monthly' ? "text-text-primary" : "text-white"
            )}>
              $4.99
            </p>
            <p className={cn(
              "text-xs",
              selectedPlan === 'monthly' ? "text-text-secondary" : "text-white/50"
            )}>
              per month
            </p>
          </button>

          {/* Yearly */}
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={cn(
              "relative rounded-2xl p-4 text-left transition-all",
              selectedPlan === 'yearly'
                ? "bg-white ring-2 ring-accent"
                : "bg-white/10 hover:bg-white/20"
            )}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
              BEST VALUE
            </div>
            <div className={cn(
              "absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center",
              selectedPlan === 'yearly'
                ? "bg-accent border-accent"
                : "border-white/50"
            )}>
              {selectedPlan === 'yearly' && <Check className="w-3 h-3 text-secondary" />}
            </div>
            <p className={cn(
              "text-sm font-medium mb-1",
              selectedPlan === 'yearly' ? "text-text-secondary" : "text-white/70"
            )}>
              Yearly
            </p>
            <p className={cn(
              "text-2xl font-bold",
              selectedPlan === 'yearly' ? "text-text-primary" : "text-white"
            )}>
              $39.99
            </p>
            <p className={cn(
              "text-xs",
              selectedPlan === 'yearly' ? "text-text-secondary" : "text-white/50"
            )}>
              per year (save 33%)
            </p>
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 mb-6">
        <button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-accent to-yellow-500 text-secondary py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Crown className="w-5 h-5" />
              Start 7-Day Free Trial
            </>
          )}
        </button>
        <p className="text-center text-white/50 text-xs mt-3">
          Cancel anytime. No commitment required.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="px-6 text-center">
        <div className="flex items-center justify-center gap-4 text-white/50 text-xs">
          <span>🔒 Secure Payment</span>
          <span>•</span>
          <span>Cancel Anytime</span>
          <span>•</span>
          <span>7-Day Free Trial</span>
        </div>
      </div>

      {/* Free vs Premium Comparison */}
      <div className="px-6 mt-8">
        <div className="bg-white/5 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 text-center">Free vs Premium</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Weekly Devotionals</span>
              <div className="flex gap-8">
                <span className="text-white/50 text-sm">4</span>
                <span className="text-accent font-semibold">54+</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">SHMILY Notes</span>
              <div className="flex gap-8">
                <span className="text-white/50 text-sm">3/mo</span>
                <span className="text-accent font-semibold">∞</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Partner Sync</span>
              <div className="flex gap-8">
                <X className="w-4 h-4 text-white/30" />
                <Check className="w-4 h-4 text-accent" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Export Entries</span>
              <div className="flex gap-8">
                <X className="w-4 h-4 text-white/30" />
                <Check className="w-4 h-4 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
