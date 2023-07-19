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

  // Read All
  getPosts(): Observable<Post[]> {
    const posts = this.getPostsFromStorage(); // Carrega os posts do localStorage
    return of(posts);
  }

  // Read One by ID
  getPostById(id: number): Observable<Post | undefined> {
    const posts = this.getPostsFromStorage(); // Carrega os posts do localStorage
    const post = posts.find(p => p.id === id);
    return of(post);
  }

  // Update
  updatePost(post: Post): Observable<Post | undefined> {
    const posts = this.getPostsFromStorage(); // Carrega os posts do localStorage
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = post;
      this.savePostsToStorage(posts); // Salva os posts atualizados no localStorage
      return of(post);
    }
    return of(undefined);
  }

  // Delete
  deletePost(id: number): Observable<boolean> {
    const posts = this.getPostsFromStorage(); // Carrega os posts do localStorage
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
      this.savePostsToStorage(posts); // Salva os posts atualizados no localStorage
      return of(true);
    }
    return of(false);
  }

  // Carrega os posts do localStorage
  private getPostsFromStorage(): Post[] {
    const postsString = localStorage.getItem(this.storageKey);
    return postsString ? JSON.parse(postsString) : [];
  }

  // Salva os posts no localStorage
  private savePostsToStorage(posts: Post[]): void {
    const postsString = JSON.stringify(posts);
    localStorage.setItem(this.storageKey, postsString);
  }
}
