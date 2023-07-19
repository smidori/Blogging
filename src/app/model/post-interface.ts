export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  createdDate: Date | null;
  keyWords: string;
  photos?: string[]; // Used for multiple photos
  latitude?: number | null;
  longitude?: number | null;
}
