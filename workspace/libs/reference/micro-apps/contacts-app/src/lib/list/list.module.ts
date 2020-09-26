import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SparkAngularModule } from '@sparkdesignsystem/spark-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ListRoutingModule, SparkAngularModule],
})
export class ListModule {}
