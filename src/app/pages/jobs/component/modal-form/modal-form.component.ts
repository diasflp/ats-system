import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';

import { IJobs } from '../../../../models/jobs.interface';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @Output() subitFormEvent = new EventEmitter();

  job!: IJobs;
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
    this.initForm();
  }

  private initForm() {
    const company = this.job ? this.job.company : null;
    const title = this.job ? this.job.title : null;
    const description = this.job ? this.job.description : null;
    this.jobsForm = this.formBuild.group({
      company: new FormControl(company, Validators.required),
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
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
    if (this.job) {
      value.id = this.job.id;
    }
    if (this.jobsForm.valid) this.subitFormEvent.emit(value);
  }

  open(job: IJobs) {
    this.job = job;
    this.poModal.open();
    this.initForm();
  }

  addconditions() {
    if (this.job) {
      this.job.conditionsJobs.forEach((eco) => {
        const conditionsJobsForm = this.formBuild.group({
          description: new FormControl(eco.description, Validators.required),
        });
        this.conditionsJobs.push(conditionsJobsForm);
      });
    } else {
      const conditionsJobsForm = this.formBuild.group({
        description: new FormControl(null, Validators.required),
      });

      this.conditionsJobs.push(conditionsJobsForm);
    }
  }

  addExperiences() {
    if (this.job) {
      this.job.experiencesJobs.forEach((eco) => {
        const experiencesJobsForm = this.formBuild.group({
          description: new FormControl(eco.description, Validators.required),
        });
        this.experiencesJobs.push(experiencesJobsForm);
      });
    } else {
      const experiencesJobsForm = this.formBuild.group({
        description: new FormControl(null, Validators.required),
      });
      this.experiencesJobs.push(experiencesJobsForm);
    }
  }
}
