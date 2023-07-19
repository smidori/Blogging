import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Post } from '../model/post-interface';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.page.html',
  styleUrls: ['./list-post.page.scss'],
})
export class ListPostPage implements OnInit {

  posts: Post[] = [];
  filteredPosts: Post[] = []; // Add a new array to store the filtered posts
  keywordSearch: string = ''; //used to do the search
  
  constructor(private navCtrl: NavController, private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  //load the post saved in the local storage
  loadPosts() {
    console.log("list => loadPosts" )
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  //navigate to page to view the post
  viewPost(postId: number) {
    this.navCtrl.navigateForward('/view-post/' + postId);
  }

  //apply the filter in the posts that were created
  applyFilter() {
    if (this.keywordSearch.trim().length > 0) {
      // Filter the posts based on the keyword
      this.loadPosts(); //bring all again, to avoid being applying filter after filtered list
      this.filteredPosts = this.posts.filter(post =>
        post.keyWords.toLowerCase().includes(this.keywordSearch.toLowerCase())
      );
      this.posts = this.filteredPosts;
    } else {
      this.loadPosts();
    }

  }

  //clear the filter and bring all posts again
  clearFilter() {
    this.keywordSearch = '';
    this.loadPosts();
  }
}
