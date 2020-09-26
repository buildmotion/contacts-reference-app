import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedHtmlPipe } from './pipes/trusted-html.pipe';
import { EnumKeysPipe } from './pipes/enum-keys.pipe';

@NgModule({
  declarations: [TrustedHtmlPipe, EnumKeysPipe],
  imports: [CommonModule],
})
export class ComponentsModule {}
