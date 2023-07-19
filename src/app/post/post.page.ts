import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { tap, catchError, throwError, map } from 'rxjs';
import { Post } from '../model/post-interface';
import { PostService } from '../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  typeForm: string = 'New'; //used to manage to show new or update
  postId: number = -1; //used to get from param
  photoData: string = ''; //to save base64

  //object
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
      this.postId = Number(params['id']);
      
      console.log("edit = " + this.postId);
      
      this.postService.getPostById(this.postId).subscribe(
        {
          next: (post: Post | undefined) => {
            if (post) {
              this.post = post;
              this.typeForm = 'Update';
            }
          },
          error: (error: any) => {
            console.error('Error fetching post', error);
          },
        }
      );
    });

  }

  //check if all the obligated fields are filled
  isFormValid(): boolean {
    return (
      this.post.title?.trim() !== '' &&
      this.post.summary?.trim() !== '' &&
      this.post.content?.trim() !== '' &&
      this.post.author.trim() !== '' &&
      this.post.keyWords.length > 0
    );
  }

  //take the picture in the small resolution, because it has been saved in the localstorage
  async takeLowResolutionPhoto() {
    const image = await Camera.getPhoto({
      quality: 20,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      correctOrientation: true,
    });

    this.photoData = 'data:image/jpeg;base64,' + image.base64String;
    this.post.photos?.push(this.photoData);
  }

  //save the post in the local storage
  savePost() {
    //Use the postService to persist the post
    this.postService.savePost(this.post).pipe(
      tap((response: Post) => {
        console.log('Post success saved!', response);
        
        this.clearFormData(); //clean the fields
        // navigate to another page
        this.navCtrl.navigateForward('/list-post');
      }),
      catchError((error) => {
        console.error('Error saving post', error);

        //return of(this.post); 
        return throwError(() => 'Error saving post, please try again')
      })
    ).subscribe();
  }
  
  updatePost() {
    //Use the postService to update the post
    this.postService.updatePost(this.post).pipe(
      tap((response: Post) => {
        console.log('Post success saved!', response);
        
        this.clearFormData(); //clean the fields
        // navigate to another root page
        this.navCtrl.navigateRoot('/list-post');

      }),
      catchError((error) => {
        console.error('Error saving post', error);

        //return of(this.post); 
        return throwError(() => 'Error saving post, please try again')
      })
    ).subscribe();
  }

  //clean the values from the form
  clearFormData() {
    this.post = {
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
  }

  //delete photo that was taken
  deleteImage(index: number) {
    if (this.post.photos && this.post.photos.length > index) {
      this.post.photos.splice(index, 1);
    }
  }

  //get geolocation
  async getGeolocation(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.post.latitude = coordinates.coords.latitude;
    this.post.longitude = coordinates.coords.longitude;
  }
}
