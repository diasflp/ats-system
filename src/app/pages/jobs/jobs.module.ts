import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoAccordionModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoModule } from '@po-ui/ng-components';

import { JobsComponent } from './jobs.component';
import { JobsServices } from '../../services/jobs/jobs.service';
import { ModalComponent } from '../../components/modal/modal.component';

@NgModule({
  declarations: [JobsComponent, ModalComponent],
  imports: [
    CommonModule,
    PoModule,
    PoButtonModule,
    PoAccordionModule,
    RouterModule.forChild([{ path: '', component: JobsComponent }]),
  ],
  providers: [JobsServices],
})
export class JobsModule {}
