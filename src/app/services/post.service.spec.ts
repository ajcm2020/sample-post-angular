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

  it('should have 3 seed posts', () => {
    expect(service.posts().length).toBe(3);
  });

  it('should return posts in reverse order (newest first)', () => {
    const posts = service.posts();
    expect(posts[0].id).toBe(3);
    expect(posts[2].id).toBe(1);
  });

  it('should add a new post and return it', () => {
    const newPost = service.addPost({
      title: 'Test Post',
      author: 'Tester',
      content: 'Some content',
    });
    expect(newPost.id).toBe(4);
    expect(newPost.title).toBe('Test Post');
    expect(newPost.createdAt).toBeInstanceOf(Date);
  });

  it('should reflect the added post in the list', () => {
    service.addPost({ title: 'New', author: 'Author', content: 'Body' });
    expect(service.posts().length).toBe(4);
    // newest first — added post is at index 0
    expect(service.posts()[0].title).toBe('New');
  });

  it('should auto-increment ids', () => {
    const a = service.addPost({ title: 'A', author: 'X', content: 'X' });
    const b = service.addPost({ title: 'B', author: 'X', content: 'X' });
    expect(b.id).toBe(a.id + 1);
  });
});
