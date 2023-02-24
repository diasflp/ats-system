import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoAccordionModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';

import { ProfileComponent } from './profile.component';
import { ProfileServices } from '../../services/profile/profile.service';
import { ModalModule } from '../../component/modal/modal.module';
import { ModalFormComponent } from './component/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent, ModalFormComponent],
  imports: [
    CommonModule,
    ModalModule,
    PoModule,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PoAccordionModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
  ],
  providers: [ProfileServices],
})
export class ProfileModule {}
