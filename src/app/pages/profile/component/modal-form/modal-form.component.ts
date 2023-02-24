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

import { IProfile } from '../../../../models/profile.interface';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @Output() subitFormEvent = new EventEmitter();

  profile!: IProfile;
  profileForm!: FormGroup;

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true,
  };

  confirm: PoModalAction = {
    action: () => {
      this.saveForm(this.profileForm.value);
    },
    label: 'Confirm',
  };

  get experiencesProfile() {
    return this.profileForm.get('experiencesProfile') as FormArray;
  }
  constructor(private formBuild: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    const name = this.profile ? this.profile.name : null;
    const email = this.profile ? this.profile.email : null;
    const description = this.profile ? this.profile.description : null;
    this.profileForm = this.formBuild.group({
      name: new FormControl(name, Validators.required),
      email: new FormControl(email, Validators.required),
      description: new FormControl(description, Validators.required),
      experiencesProfile: new FormArray([]),
    });

    this.addExperiences();
  }

  closeModal() {
    this.poModal.close();
  }

  saveForm(value: IProfile) {
    if (this.profile) {
      value.id = this.profile.id;
    }
    if (this.profileForm.valid) this.subitFormEvent.emit(value);
  }

  open(profile: IProfile) {
    this.profile = profile;
    this.poModal.open();
    this.initForm();
  }

  addExperiences() {
    if (this.profile) {
      this.profile.experiencesProfile.forEach((eco) => {
        const experiencesProfileForm = this.formBuild.group({
          description: new FormControl(eco.description, Validators.required),
        });
        this.experiencesProfile.push(experiencesProfileForm);
      });
    } else {
      const experiencesProfileForm = this.formBuild.group({
        description: new FormControl(null, Validators.required),
      });
      this.experiencesProfile.push(experiencesProfileForm);
    }
  }
}
