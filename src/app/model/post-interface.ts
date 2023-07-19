export interface Post {
    id: number;
    title: string;
    summary: string;
    content: string;
    author: string;
    createdDate: Date | null;
    keyWords: string[];
    photos?: string[]; // Used for multiple photos
    // likes: number;
    // comments: Comment[];
  }
  
//   export interface Comment {
//     id: number;
//     author: string;
//     content: string;
//     date: Date;
//   }
  