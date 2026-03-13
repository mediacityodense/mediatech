
export type TrackType = 'Main Stage' | 'Track 2' | 'Workshop' | 'Social' | 'General';

export interface Speaker {
  name: string;
  role?: string;
  company?: string;
  image?: string;
  bio?: string;
  description?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Session {
  id: string;
  startTime: string;
  endTime?: string;
  title: string;
  description?: string;
  track: TrackType;
  location?: string;
  speakers?: Speaker[];
  isBreak?: boolean;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g., "Tuesday"
  shortLabel: string; // e.g., "Tue 24"
  sessions: Session[];
}

export type FilterType = 'All' | 'Main Stage' | 'Track 2' | 'Networking';
