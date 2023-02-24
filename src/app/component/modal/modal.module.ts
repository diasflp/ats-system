import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';

import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, PoButtonModule, PoModalModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}
