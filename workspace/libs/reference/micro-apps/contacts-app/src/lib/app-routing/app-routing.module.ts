import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule) },
  { path: 'contacts/list', loadChildren: () => import('../list/list.module').then(m => m.ListModule) },
  { path: 'contacts/item/edit:id', loadChildren: () => import('../item/item.module').then(m => m.ItemModule) },
  { path: 'contacts/new-contact', loadChildren: () => import('../add/add.module').then(m => m.AddModule) },
  // { path: '', loadChildren: () => import('../add/add.module').then(m => m.AddModule) },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppRoutingModule {}
