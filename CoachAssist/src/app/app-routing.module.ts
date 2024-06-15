import { NgModule } from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
import { PreloadingService } from './services/preloading.service';

const routes: Routes = [
  {
    path: 'students/:id',
    loadComponent: () => import('./pages/student/student.component').then(m => m.StudentComponent),
    title: (route: ActivatedRouteSnapshot) => `Ученик номер ${route.paramMap.get('id')}`
  },
  {
    path: 'students',
    title: 'Ученики',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
    data: { preload: true }
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    title: 'Настройки',
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
