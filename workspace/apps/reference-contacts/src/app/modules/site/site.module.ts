import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';

import { SparkAngularModule } from '@sparkdesignsystem/spark-angular';

const COMPONENTS = [FooterComponent, HeaderComponent, LayoutComponent];
const MODULES = [SharedModule, SparkAngularModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
})
export class SiteModule {}
