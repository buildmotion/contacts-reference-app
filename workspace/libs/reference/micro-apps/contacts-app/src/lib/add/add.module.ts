import { NgModule } from '@angular/core';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { CommonModule } from '@angular/common';
import { SparkAngularModule } from '@sparkdesignsystem/spark-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddComponent],
  imports: [CommonModule, AddRoutingModule, ReactiveFormsModule, SparkAngularModule],
})
export class AddModule {}
