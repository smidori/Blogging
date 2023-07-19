import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPostPage } from './list-post.page';

const routes: Routes = [
  {
    path: '',
    component: ListPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPostPageRoutingModule {}
