import { useState } from 'react';
import { ArrowLeft, Camera, Save, Check, Calendar, Heart, Mail, User, Users } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ProfileScreenProps {
  onBack: () => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export function ProfileScreen({ onBack, onShowToast }: ProfileScreenProps) {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    partnerName: 'Michael',
    partnerEmail: 'michael.johnson@email.com',
    anniversaryDate: '2018-06-15',
    relationshipStatus: 'married' as 'dating' | 'engaged' | 'married',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    onShowToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-playfair text-lg font-semibold">Profile</h1>
          {isEditing ? (
            <button onClick={handleSave} className="p-2 rounded-full hover:bg-white/10">
              <Check className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-sm font-medium hover:underline">
              Edit
            </button>
          )}
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col items-center pb-8 pt-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold ring-4 ring-white/30">
              {profile.name.charAt(0)}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-secondary" />
              </button>
            )}
          </div>
          <h2 className="text-xl font-bold mt-3">{profile.name}</h2>
          <p className="text-white/80 text-sm">{profile.email}</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Personal Information
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4">
              <label className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Your Name</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                />
              ) : (
                <p className="font-medium text-text-primary pl-8">{profile.name}</p>
              )}
            </div>

            <div className="p-4">
              <label className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Email</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                />
              ) : (
                <p className="font-medium text-text-primary pl-8">{profile.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Partner Info */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Partner Information
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4">
              <label className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm text-text-secondary">Partner's Name</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.partnerName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, partnerName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                />
              ) : (
                <p className="font-medium text-text-primary pl-8">{profile.partnerName}</p>
              )}
            </div>

            <div className="p-4">
              <label className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-pink-500" />
                <span className="text-sm text-text-secondary">Partner's Email</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.partnerEmail}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, partnerEmail: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                />
              ) : (
                <p className="font-medium text-text-primary pl-8">{profile.partnerEmail}</p>
              )}
            </div>
          </div>
        </div>

        {/* Relationship Details */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3 px-2">
            Relationship Details
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4">
              <label className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Relationship Status</span>
              </label>
              {isEditing ? (
                <div className="flex gap-2 pl-8">
                  {(['dating', 'engaged', 'married'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setEditedProfile(prev => ({ ...prev, relationshipStatus: status }))}
                      className={cn(
                        "flex-1 py-2 rounded-lg font-medium transition-all capitalize",
                        editedProfile.relationshipStatus === status
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="font-medium text-text-primary pl-8 capitalize">{profile.relationshipStatus}</p>
              )}
            </div>

            <div className="p-4">
              <label className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-secondary">Anniversary Date</span>
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedProfile.anniversaryDate}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, anniversaryDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
                />
              ) : (
                <p className="font-medium text-text-primary pl-8">
                  {new Date(profile.anniversaryDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons for Edit Mode */}
        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 rounded-xl font-semibold border border-gray-200 text-text-secondary hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        )}

        {/* Invite Partner */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-1">Connected with {profile.partnerName}</p>
              <p className="text-sm text-text-secondary mb-3">
                Share your reflections and journey together!
              </p>
              <button className="text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors">
                Resend Invite →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
