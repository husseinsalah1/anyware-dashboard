export interface IAnnouncement {
  _id?: string;
  title: string;
  description: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface AnnouncementState {
  announcements: IAnnouncement[];
  announcement: IAnnouncement | null;
  loading: boolean;
  error: string | null;
}
