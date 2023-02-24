import { IProfile } from './profile.interface';

export interface IJobs {
  id: number;
  description: string;
  title: string;
  company: string;
  experiencesJobs: Array<IExperiences>;
  conditionsJobs: Array<IConditions>;
  profile: Array<IProfile>;
}

interface IExperiences {
  description: string;
}

interface IConditions {
  description: string;
}

export class Jobs {
  id: number;
  description: string;
  title: string;
  company: string;
  experiencesJobs: Array<IExperiences>;
  conditionsJobs: Array<IConditions>;
  profile: Array<IProfile>;

  constructor(jobsParameters: IJobs) {
    this.id = jobsParameters.id;
    this.company = jobsParameters.company;
    this.title = jobsParameters.title;
    this.conditionsJobs = jobsParameters.conditionsJobs;
    this.description = jobsParameters.description;
    this.experiencesJobs = jobsParameters.experiencesJobs;
    this.profile = jobsParameters.profile;
  }
}
