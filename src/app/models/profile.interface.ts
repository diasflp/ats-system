import { IJobs } from './jobs.interface';

export interface IProfile {
  id: number;
  name: string;
  description: string;
  email: string;
  experiencesProfile: Array<IExperiences>;
  jobs: Array<IJobs>;
}

interface IExperiences {
  description: string;
}

export class Profile {
  id: number;
  name: string;
  email: string;
  description: string;
  experiencesProfile: Array<IExperiences>;
  jobs: Array<IJobs>;

  constructor(profileParameters: IProfile) {
    this.id = profileParameters.id;
    this.name = profileParameters.name;
    this.email = profileParameters.email;
    this.description = profileParameters.description;
    this.experiencesProfile = profileParameters.experiencesProfile;
    this.jobs = profileParameters.jobs;
  }
}
