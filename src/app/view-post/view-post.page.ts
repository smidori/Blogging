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
  
  postId: number = -1; //use to save the postId from url

  photoData: string = ''; //picture data

  post: Post = {
    id: new Date().getTime(),
    title: '',
    summary: '',
    content: '',
    author: '',
    createdDate: null,
    keyWords: '',
    photos: [],
    latitude: null,
    longitude: null
  };

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe((params) => {
      this.postId = Number(params['id']); //get the id from url
      
      console.log("edit = " + this.postId);
      //load get the post searching by id
      this.postService.getPostById(this.postId).subscribe(
        {
          next: (post: Post | undefined) => {
            if (post) {
              this.post = post;
            }
          },
          error: (error: any) => {
            console.error('Error fetching post', error);
          },
        }
      );

    });
  }   
  
}
