import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IJobs } from '../../models/jobs.interface';
import { JobsServices } from '../../services/jobs/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  listJobs: Array<IJobs> = [];

  constructor(private jobsServices: JobsServices) {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    const jobs$ = this.jobsServices.get();
    this.listJobs = await lastValueFrom(jobs$);
  }

  details() {
    alert('details');
  }

  remove() {
    alert('remove');
  }

  getLabel(jobs: IJobs) {
    return `${jobs.company} - ${jobs.title}`;
  }
}
