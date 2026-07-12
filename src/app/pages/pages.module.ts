import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutes } from './routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes)
  ]
})
export class PagesModule { }
