import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPostPageRoutingModule } from './list-post-routing.module';

import { ListPostPage } from './list-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPostPageRoutingModule
  ],
  declarations: [ListPostPage]
})
export class ListPostPageModule {}
