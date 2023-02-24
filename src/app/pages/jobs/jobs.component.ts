import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { IJobs } from '../../models/jobs.interface';
import { JobsServices } from '../../services/jobs/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  @ViewChild('modal') modal: any;
  @ViewChild('modalForm') modalForm: any;

  listJobs: Array<IJobs> = [];
  isDetail = false;

  constructor(private jobsServices: JobsServices) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    const jobs$ = this.jobsServices.get();
    this.listJobs = await lastValueFrom(jobs$);
  }

  async details(jobId: number) {
    this.isDetail = true;
    const getJob$ = this.jobsServices.getById(jobId);
    const job = await lastValueFrom(getJob$);
    this.modalForm.open(job);
  }

  getLabel(jobs: IJobs) {
    return `${jobs.company} - ${jobs.title}`;
  }

  deleteConfirm($event: number) {
    this.jobsServices.delete($event).subscribe();
    this.modal.closeModal();
    this.init();
  }

  async subitFormEvent($event: IJobs) {
    if (this.isDetail) {
      this.jobsServices.put($event, $event.id).subscribe();
    } else {
      $event.id = this.listJobs.length + 1;
      this.jobsServices.post($event).subscribe();
    }
    this.modalForm.closeModal();
    this.init();
  }
}
