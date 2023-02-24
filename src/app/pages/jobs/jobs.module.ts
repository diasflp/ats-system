import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoAccordionModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';

import { JobsComponent } from './jobs.component';
import { JobsServices } from '../../services/jobs/jobs.service';
import { ModalComponent } from '../../component/modal/modal.component';
import { ModalFormComponent } from './component/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JobsComponent, ModalComponent, ModalFormComponent],
  imports: [
    CommonModule,
    PoModule,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PoAccordionModule,
    RouterModule.forChild([{ path: '', component: JobsComponent }]),
  ],
  providers: [JobsServices],
})
export class JobsModule {}
