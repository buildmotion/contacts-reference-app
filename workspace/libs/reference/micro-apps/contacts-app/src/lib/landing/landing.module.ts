import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SparkAngularModule } from '@sparkdesignsystem/spark-angular';

@NgModule({
  declarations: [LandingComponent],
  imports: [LandingRoutingModule, SparkAngularModule],
})
export class LandingModule {}
