export type PostStatus = 'draft' | 'published';

export interface Post {
  id: number;
  title: string;
  authorId: number;
  content: string;
  status: PostStatus;
  createdAt: Date;
  publishedAt: Date | null;
}
