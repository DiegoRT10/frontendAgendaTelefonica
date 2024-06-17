import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'login', component: LoginComponent, },
  {path:'homeUser', component: HomeUserComponent, canActivate:[authGuard, roleGuard],  data: {expectedRole: 2}},
  {path:'homeAdmin', component: HomeAdminComponent, canActivate:[authGuard, roleGuard],  data: {expectedRole: 1}},
  {path:'User', component: UserComponent, canActivate:[authGuard, roleGuard],  data: {expectedRole: 2}},
  {path:'**', pathMatch:'full', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
