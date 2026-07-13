import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'add',
    component: AddEditFormComponent
  },
  {
    path: 'edit/:id',
    component: AddEditFormComponent
  },
  {
    path: 'details/:id',
    component: CourseDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CoursesComponent,
    AddEditFormComponent,
    CourseDetailsComponent
  ]
})
export class CoursesModule { }