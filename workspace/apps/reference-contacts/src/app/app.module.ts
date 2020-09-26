import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SparkAngularModule } from '@sparkdesignsystem/spark-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { CrossCuttingModule } from './modules/cross-cutting/cross-cutting.module';
import { SharedModule } from './modules/shared/shared.module';
import { SiteModule } from './modules/site/site.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    CrossCuttingModule.forRoot(),
    BrowserModule,
    SparkAngularModule,
    AppRoutingModule,
    SiteModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  exports: [SiteModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
