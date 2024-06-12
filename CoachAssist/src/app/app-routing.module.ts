import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadingService } from './services/preloading.service';

const routes: Routes = [
  {
    path: 'students',
    title: 'Ученики',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    data: { preload: true }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/students'
  },
  {
    path: '**',
    redirectTo: '/students'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadingService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
