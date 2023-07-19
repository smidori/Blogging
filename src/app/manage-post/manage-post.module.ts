import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePostPageRoutingModule } from './manage-post-routing.module';

import { ManagePostPage } from './manage-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePostPageRoutingModule
  ],
  declarations: [ManagePostPage]
})
export class ManagePostPageModule {}
