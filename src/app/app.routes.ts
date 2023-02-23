import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'oportunidades', pathMatch: 'full' },
  {
    path: 'oportunidades',
    loadChildren: () =>
      import('./pages/jobs/jobs.module').then(m => m.JobsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
