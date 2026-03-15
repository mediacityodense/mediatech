
import React, { useState } from 'react';
import { X, User, Briefcase, Mail, Linkedin, Edit2, Save, Share2, QrCode } from 'lucide-react';

interface UserProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  linkedin: string;
}

interface DigitalBadgeProps {
  onClose: () => void;
}

const emptyProfile: UserProfile = {
  name: '',
  role: '',
  company: '',
  email: '',
  linkedin: ''
};

const getSavedProfile = (): UserProfile => {
  try {
    const savedProfile = localStorage.getItem('mco_delegate_profile');
    return savedProfile ? { ...emptyProfile, ...JSON.parse(savedProfile) } : emptyProfile;
  } catch {
    return emptyProfile;
  }
};

const DigitalBadge: React.FC<DigitalBadgeProps> = ({ onClose }) => {
  const [profile, setProfile] = useState<UserProfile>(getSavedProfile);
  const [isEditing, setIsEditing] = useState(() => !getSavedProfile().name.trim());



  const handleSave = () => {
    localStorage.setItem('mco_delegate_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

const generateVCard = () => {
    // 1. Vi splitter navnet for at tilfredsstille iOS krav til 'N' feltet
    const names = profile.name.trim().split(' ');
    const lastName = names.length > 1 ? names.pop() : ''; // Det sidste ord er efternavn
    const firstName = names.join(' '); // Resten er fornavn(e)

    return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${profile.name}
ORG:${profile.company}
TITLE:${profile.role}
EMAIL:${profile.email}
URL:${profile.linkedin}
END:VCARD`;
  };

  const qrData = encodeURIComponent(generateVCard());
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-mco-purple p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
                <QrCode size={20} />
                <h2 className="font-bold text-lg">My Digital Badge</h2>
            </div>
            <button 
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X size={24} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            <div className="space-y-4">
               <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-50 text-mco-purple rounded-full flex items-center justify-center mx-auto mb-2">
                     <Edit2 size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">Create Your Badge</h3>
                  <p className="text-xs text-gray-500">Enter your details to generate a contact QR code.</p>
               </div>

               <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            placeholder="e.g. Jane Doe"
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mco-purple/50 focus:border-mco-purple outline-none transition-all text-sm font-medium"
                        />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Job Title</label>
                    <div className="relative">
                        <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            value={profile.role}
                            onChange={(e) => setProfile({...profile, role: e.target.value})}
                            placeholder="e.g. Product Manager"
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mco-purple/50 focus:border-mco-purple outline-none transition-all text-sm font-medium"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                    <div className="relative">
                        <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            value={profile.company}
                            onChange={(e) => setProfile({...profile, company: e.target.value})}
                            placeholder="e.g. Media City Odense"
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mco-purple/50 focus:border-mco-purple outline-none transition-all text-sm font-medium"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            placeholder="jane@example.com"
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mco-purple/50 focus:border-mco-purple outline-none transition-all text-sm font-medium"
                        />
                    </div>
                  </div>

                   <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">LinkedIn URL</label>
                    <div className="relative">
                        <Linkedin size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                            placeholder="linkedin.com/in/..."
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mco-purple/50 focus:border-mco-purple outline-none transition-all text-sm font-medium"
                        />
                    </div>
                  </div>
               </div>

               <button 
                  onClick={handleSave}
                  disabled={!profile.name}
                  className="w-full mt-6 bg-mco-purple text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <Save size={18} />
                  <span>Save Badge</span>
               </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
                {/* Badge Card Visual */}
                <div className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden mb-6 group">
                     {/* Badge Lanyard Hole */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-200 rounded-b-lg opacity-50"></div>
                     
                     <div className="text-center relative z-10">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{profile.name || 'Delegate Name'}</h2>
                        <p className="text-mco-purple font-bold text-sm mb-0.5">{profile.role || 'Role'}</p>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{profile.company || 'Company'}</p>
                        
                        <div className="my-6 bg-white p-2 rounded-xl shadow-inner border border-gray-100 inline-block">
                             <img 
                                src={qrUrl} 
                                alt="Contact QR Code" 
                                className="w-48 h-48 object-contain"
                             />
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                             <Share2 size={12} />
                             <span>Scan to add to contacts</span>
                        </div>
                     </div>
                </div>

                <button 
                    onClick={() => setIsEditing(true)}
                    className="text-mco-purple font-medium text-sm flex items-center gap-2 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                >
                    <Edit2 size={16} />
                    <span>Edit Profile</span>
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalBadge;
