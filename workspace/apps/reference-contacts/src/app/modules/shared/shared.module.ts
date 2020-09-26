import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const MODULES = [CommonModule, FormsModule, HttpClientModule, HttpClientModule, ReactiveFormsModule, RouterModule];
@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
