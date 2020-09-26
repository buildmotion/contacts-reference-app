import { NgModule } from '@angular/core';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';

@NgModule({
  declarations: [ItemComponent],
  imports: [ItemRoutingModule],
})
export class ItemModule {}
