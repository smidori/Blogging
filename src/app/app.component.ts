import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public appPages = [
    { title: 'Posts', url: '/list-post', icon: 'list' },
    { title: 'Add Post', url: '/post', icon: 'add' },
    { title: 'Manage Posts', url: '/manage-post', icon: 'create' },
  ];
  constructor() {}
}
