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

  constructor(private navCtrl: NavController, private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }

  editPost(post: Post) {
    // Implemente a lógica para redirecionar para a página de edição do post
    // por exemplo, this.navCtrl.navigateForward('/edit-post/' + post.id);
  }

  deletePost(post: Post) {
    // Implemente a lógica para excluir o post
    // por exemplo, this.postService.deletePost(post.id).subscribe(...);
  }

}
