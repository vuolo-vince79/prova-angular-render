import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { userGuard } from './service/user.guard';
import { adminGuard } from './service/admin.guard';

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "register", component : RegisterComponent, pathMatch : "full"},
  {path : "home", component : HomeComponent, pathMatch : "full", canActivate : [userGuard]},
  {path : "admin", component : AdminComponent, pathMatch : "full", canActivate : [adminGuard]},
  {path : "**", redirectTo : "", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
