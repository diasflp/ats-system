export interface IJobs {
  description: string;
  title: string;
  company: string;
  profileJobs: Array<IProfile>;
  experiencesJobs: Array<IExperiences>;
  conditionsJobs: Array<IConditions>;
}

interface IProfile {
  description: string;
}

interface IExperiences {
  description: string;
}

interface IConditions {
  description: string;
}

export class Jobs {
  description: string;
  title: string;
  company: string;
  profileJobs: Array<IProfile>;
  experiencesJobs: Array<IExperiences>;
  conditionsJobs: Array<IConditions>;

  constructor(jobsParameters: IJobs) {
    this.company = jobsParameters.company;
    this.title = jobsParameters.title;
    this.conditionsJobs = jobsParameters.conditionsJobs;
    this.description = jobsParameters.description;
    this.profileJobs = jobsParameters.profileJobs;
    this.experiencesJobs = jobsParameters.experiencesJobs;
  }
}
