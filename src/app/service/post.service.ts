import { Injectable } from '@angular/core';
import { Post } from '../model/post-interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private storageKey = 'posts'; // used to save the data in the localStorage

  constructor() { }

  // Save post
  savePost(post: Post): Observable<Post> {
    const posts = this.getPostsFromStorage(); // load the posts  in the localStorage
    post.id = new Date().getTime();
    post.createdDate = new Date(); //set the current date

    posts.unshift(post); // add the new post to the beginning of the array
    this.savePostsToStorage(posts); // save all posts
    return of(post);
  }

  // get all posts
  getPosts(): Observable<Post[]> {
    const posts = this.getPostsFromStorage();
    return of(posts);
  }

  // Get post by id
  getPostById(id: number): Observable<Post | undefined> {
    const posts = this.getPostsFromStorage();
    const post = posts.find(p => p.id === id);
    return of(post);
  }

  // Update post -> find it, update and save
  updatePost(post: Post): Observable<Post> {
    const posts = this.getPostsFromStorage(); 
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = post;
      this.savePostsToStorage(posts); 
      return of(post);
    }
    return of(post);
  }

  // Delete
  deletePost(id: number): Observable<boolean> {
    const posts = this.getPostsFromStorage(); 
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
      this.savePostsToStorage(posts); 
      return of(true);
    }
    return of(false);
  }

  // load posts from localStorage
  private getPostsFromStorage(): Post[] {
    const postsString = localStorage.getItem(this.storageKey);
    return postsString ? JSON.parse(postsString) : [];
  }

  // Save posts in the localStorage
  private savePostsToStorage(posts: Post[]): void {
    const postsString = JSON.stringify(posts);
    localStorage.setItem(this.storageKey, postsString);
  }
}
