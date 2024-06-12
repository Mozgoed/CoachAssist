import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadingService } from './services/preloading.service';

const routes: Routes = [
  {
    path: 'students',
    title: 'Ученики',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadingService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
