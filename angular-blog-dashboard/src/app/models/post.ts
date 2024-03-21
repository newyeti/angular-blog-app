import { Timestamp } from '@angular/fire/firestore';

export interface Post {
  id: string;
  title: string;
  permalink: string;
  category: {
    id: string;
    name: string;
  };
  postImgPath: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Timestamp;
}
