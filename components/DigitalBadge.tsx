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
    const names = profile.name.trim().split(' ');
    const lastName = names.length > 1 ? names.pop() : '';
    const firstName = names.join(' ');

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
  const badgeName = profile.name.trim() || 'Delegate Name';
  const badgeRole = profile.role.trim() || 'Role';
  const badgeCompany = profile.company.trim() || 'Company';
  const inputClassName =
    'w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-mco-purple/40 focus:ring-4 focus:ring-mco-purple/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="flex max-h-[94vh] w-full max-w-sm flex-col overflow-hidden rounded-[24px] border border-mco-purple/20 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#FAF4FF_44%,#F2E7FF_100%)] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.38)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-mco-purple/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.38)_100%)] px-4 py-3.5 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mco-purple/10 text-mco-purple">
                <QrCode size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Digital Badge</h2>
                <p className="text-xs text-gray-500">Scan to share your contact details.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="rounded-[20px] border border-mco-purple/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.64)_100%)] p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mco-purple/10 text-mco-purple">
                    <Edit2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Create your badge</h3>
                    <p className="text-xs text-gray-500">Enter your details to generate a contact QR code.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-[20px] border border-mco-purple/10 bg-white/88 p-4 backdrop-blur-sm">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">Job Title</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Briefcase size={16} />
                    </div>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      placeholder="e.g. Product Manager"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">Company</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Briefcase size={16} />
                    </div>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      placeholder="e.g. Media City Odense"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">LinkedIn URL</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Linkedin size={16} />
                    </div>
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/..."
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!profile.name}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#6D28D9_0%,#8B5CF6_100%)] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-20px_rgba(109,40,217,0.65)] transition-colors hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={18} />
                <span>Save Badge</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-[22px] border border-mco-purple/15 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_53%),linear-gradient(180deg,#FFFFFF_0%,#FBF7FF_58%,#F4ECFF_100%)] shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)]">
                <div className="h-1.5 bg-[linear-gradient(90deg,#6D28D9_0%,#8B5CF6_55%,#C4B5FD_100%)]" />
                <div className="p-4">
                  <h2 className="break-words text-[24px] font-bold leading-[1.05] tracking-[-0.03em] text-gray-900">{badgeName}</h2>
                  <p className="mt-1 break-words text-sm font-semibold text-mco-purple">{badgeRole}</p>
                  <p className="mt-1 break-words text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{badgeCompany}</p>

                  <div className="my-4 flex justify-center">
                    <div className="rounded-[18px] border border-mco-purple/10 bg-white p-2.5 shadow-[inset_0_1px_0_rgba(139,92,246,0.08)]">
                      <img
                        src={qrUrl}
                        alt="Contact QR Code"
                        className="aspect-square w-[170px] object-contain sm:w-[185px]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Share2 size={12} />
                    <span>Scan to add to contacts</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 rounded-xl border border-mco-purple/10 bg-white/86 px-4 py-3 text-sm font-semibold text-gray-700 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <span className="inline-flex items-center gap-2">
                    <Edit2 size={16} />
                    Edit Profile
                  </span>
                </button>
                <div className="rounded-xl border border-mco-purple/10 bg-white/72 px-3 py-2 text-center backdrop-blur-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-mco-purple/70">Ready</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalBadge;
