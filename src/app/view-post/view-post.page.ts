import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { tap, catchError, throwError } from 'rxjs';
import { Post } from '../model/post-interface';
import { PostService } from '../service/post.service';

@Component({
  selector: 'view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {
  
  postId: number = -1;

  photoData: string = '';

  post: Post = {
    id: new Date().getTime(),
    title: '',
    summary: '',
    content: '',
    author: '',
    createdDate: null,
    keyWords: '',
    photos: [],
  };

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = Number(params['id']);
      
      console.log("edit = " + this.postId);
      
      this.postService.getPostById(this.postId).subscribe(
        (post: Post | undefined) => {
          if (post) {
            this.post = post;
          }  
          // else {
          //   console.error('Post not found!');
          //   // Handle the case when the postId is not found
          //   this.navCtrl.navigateBack('/list-post');
          // }
        },
        (error) => {
          console.error('Error fetching post', error);
        }
      );

    });
  }

   
  
}
