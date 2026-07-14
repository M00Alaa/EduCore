import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild(routes)],
})
export class AccountModule {

}
