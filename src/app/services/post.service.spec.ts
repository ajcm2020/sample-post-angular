import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have 6 seed posts', () => {
    expect(service.posts().length).toBe(6);
  });

  it('should return posts in reverse order (newest first)', () => {
    const posts = service.posts();
    expect(posts[0].id).toBe(6);
    expect(posts[posts.length - 1].id).toBe(1);
  });

  it('should add a new post and return it', () => {
    const newPost = service.addPost({
      title: 'Test Post',
      authorId: 1,
      content: 'Some content',
      status: 'published',
      publishedAt: new Date(),
    });
    expect(newPost.id).toBe(7);
    expect(newPost.title).toBe('Test Post');
    expect(newPost.authorId).toBe(1);
    expect(newPost.createdAt).toBeInstanceOf(Date);
  });

  it('should reflect the added post in the list', () => {
    service.addPost({ title: 'New', authorId: 1, content: 'Body', status: 'draft', publishedAt: null });
    expect(service.posts().length).toBe(7);
    expect(service.posts()[0].title).toBe('New');
  });

  it('should auto-increment ids', () => {
    const a = service.addPost({ title: 'A', authorId: 1, content: 'X', status: 'draft', publishedAt: null });
    const b = service.addPost({ title: 'B', authorId: 1, content: 'X', status: 'draft', publishedAt: null });
    expect(b.id).toBe(a.id + 1);
  });

  it('should support draft status', () => {
    const post = service.addPost({ title: 'Draft', authorId: 2, content: 'Draft content', status: 'draft', publishedAt: null });
    expect(post.status).toBe('draft');
    expect(post.publishedAt).toBeNull();
  });
});
