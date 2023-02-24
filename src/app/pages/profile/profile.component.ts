import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { IProfile } from '../../models/profile.interface';
import { ProfileServices } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('modal') modal: any;
  @ViewChild('modalForm') modalForm: any;

  listProfile: Array<IProfile> = [];
  isDetail = false;

  constructor(private profileServices: ProfileServices) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    const jobs$ = this.profileServices.get();
    this.listProfile = await lastValueFrom(jobs$);
  }

  async details(jobId: number) {
    this.isDetail = true;
    const getJob$ = this.profileServices.getById(jobId);
    const job = await lastValueFrom(getJob$);
    this.modalForm.open(job);
  }

  getLabel(profile: IProfile) {
    return `${profile.name} - ${profile.email}`;
  }

  deleteConfirm($event: number) {
    this.profileServices.delete($event).subscribe();
    this.modal.closeModal();
    this.init();
  }

  async subitFormEvent($event: IProfile) {
    if (this.isDetail) {
      this.profileServices.put($event, $event.id).subscribe();
    } else {
      $event.id = this.listProfile.length + 1;
      this.profileServices.post($event).subscribe();
    }
    this.modalForm.closeModal();
    this.init();
  }
}
