import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePostPage } from './manage-post.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePostPageRoutingModule {}
