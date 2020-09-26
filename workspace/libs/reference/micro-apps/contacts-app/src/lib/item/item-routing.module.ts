import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './item.component';

const routes: Routes = [{ path: 'edit/:id', component: ItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
