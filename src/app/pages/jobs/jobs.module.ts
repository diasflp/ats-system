import { NgModule } from '@angular/core';
import { PoAccordionModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { JobsComponent } from './jobs.component';
import { JobsServices } from '../../services/jobs/jobs.service';
import { CommonModule } from '@angular/common';
import { PoButtonModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [JobsComponent],
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
