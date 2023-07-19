import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Post } from '../model/post-interface';
import { PostService } from '../service/post.service';
import { tap, catchError, throwError } from 'rxjs';

@Component({
  selector: 'manage-post',
  templateUrl: './manage-post.page.html',
  styleUrls: ['./manage-post.page.scss'],
})
export class ManagePostPage implements OnInit {

  posts: Post[] = [];

  constructor(private navCtrl: NavController, private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  //load posts saved in local storage
  loadPosts() {
    console.log("manage => loadPosts" )
    this.postService.getPosts().pipe(
      tap((posts: Post[]) => {
        this.posts = posts;
      }),
      catchError((error) => {
        console.error('Error fetching posts', error);
        // Return an empty array
        return [];
      })
    ).subscribe();
  }

  //navigate to page to edit the post
  editPost(postId: number) {
    this.navCtrl.navigateForward('/post/' + postId);
  } 

  //delete selected post
  deletePost(postId: number) {
    this.postService.deletePost(postId).pipe(
      tap((response: boolean) => {
        if (response) {
          console.log('Post success deleted!');
          this.loadPosts(); // Reload posts after deletion
        } else {
          console.error('Post not found!');
        }
      }),
      catchError((error) => {
        console.error('Error deleting post', error);
        return throwError(() => 'Error deleting post, please try again');
      })
    ).subscribe();
  }
}
