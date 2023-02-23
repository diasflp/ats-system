import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';

import { IJobs } from '../../../../../models/jobs.interface';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @Output() subitFormEvent = new EventEmitter();

  jobsForm!: FormGroup;

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true,
  };

  confirm: PoModalAction = {
    action: () => {
      this.saveForm(this.jobsForm.value);
    },
    label: 'Confirm',
  };

  get experiencesJobs() {
    return this.jobsForm.get('experiencesJobs') as FormArray;
  }

  get conditionsJobs() {
    return this.jobsForm.get('conditionsJobs') as FormArray;
  }

  constructor(private formBuild: FormBuilder) {
    this.jobsForm = this.formBuild.group({
      company: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      experiencesJobs: new FormArray([]),
      conditionsJobs: new FormArray([]),
    });

    this.addExperiences();
    this.addconditions();
  }

  closeModal() {
    this.poModal.close();
  }

  saveForm(value: IJobs) {
    if (this.jobsForm.valid) this.subitFormEvent.emit(value);
  }

  open() {
    this.poModal.open();
  }

  addconditions() {
    const conditionsJobsForm = this.formBuild.group({
      description: new FormControl(null, Validators.required),
    });

    this.conditionsJobs.push(conditionsJobsForm);
  }

  addExperiences() {
    const experiencesJobsForm = this.formBuild.group({
      description: new FormControl(null, Validators.required),
    });
    this.experiencesJobs.push(experiencesJobsForm);
  }
}
