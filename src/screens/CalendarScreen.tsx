import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, Heart } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { cn } from '@/utils/cn';

interface CalendarScreenProps {
  userProgress: { read: string[]; reflected: string[] };
}

const specialDates = [
  { date: new Date(2024, 1, 14), label: "Valentine's Day", icon: Heart, color: 'text-red-500' },
  { date: new Date(2024, 5, 15), label: 'Anniversary', icon: Heart, color: 'text-accent' },
];

export function CalendarScreen({ userProgress }: CalendarScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const completedDays = [3, 7, 10, 14, 17, 21, 24, 28].map(d => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
  const reflectedDays = [7, 14, 21, 28].map(d => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isCompleted = (day: Date) => completedDays.some(d => isSameDay(d, day));
  const isReflected = (day: Date) => reflectedDays.some(d => isSameDay(d, day));
  const isSpecial = (day: Date) => specialDates.find(s => isSameDay(s.date, day));

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 py-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h1 className="font-playfair text-2xl font-bold text-text-primary mb-2">Your Journey</h1>
        <p className="text-text-secondary">Track your devotional progress</p>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-2">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{userProgress.read.length}</p>
            <p className="text-xs text-text-secondary">Devotionals Read</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{userProgress.reflected.length}</p>
            <p className="text-xs text-text-secondary">Reflections</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">🔥</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">7</p>
            <p className="text-xs text-text-secondary">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <h2 className="font-playfair text-lg font-semibold text-text-primary">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {weekDays.map(day => (
              <div key={day} className="py-3 text-center text-xs font-semibold text-text-secondary">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 p-2 gap-1">
            {/* Empty cells for days before the month starts */}
            {Array.from({ length: startDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            
            {days.map(day => {
              const completed = isCompleted(day);
              const reflected = isReflected(day);
              const special = isSpecial(day);
              const today = isSameDay(day, new Date());

              return (
                <button
                  key={day.toISOString()}
                  className={cn(
                    "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all",
                    today && "ring-2 ring-primary ring-offset-1",
                    completed && !reflected && "bg-primary/10",
                    reflected && "bg-success/10",
                    !completed && !reflected && "hover:bg-gray-50"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    today ? "text-primary font-bold" : "text-text-primary"
                  )}>
                    {format(day, 'd')}
                  </span>
                  
                  {/* Indicators */}
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {completed && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    )}
                    {reflected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    )}
                    {special && (
                      <Heart className="w-2.5 h-2.5 text-red-500" fill="currentColor" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-text-primary mb-3">Legend</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-text-secondary">Devotional Read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-sm text-text-secondary">Reflection Done</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-red-500" fill="currentColor" />
              <span className="text-sm text-text-secondary">Special Date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full ring-2 ring-primary"></div>
              <span className="text-sm text-text-secondary">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="px-4 mt-4">
        <h3 className="font-playfair text-lg font-semibold text-text-primary mb-3">Special Dates</h3>
        <div className="space-y-2">
          {specialDates.map((special, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">{special.label}</p>
                <p className="text-sm text-text-secondary">{format(special.date, 'MMMM d, yyyy')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
