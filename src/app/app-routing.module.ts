import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';

// Child gebruikt men voor dit => /user/registration => omdat registratie ponder user behoord!
const routes: Routes = [
  {
    //Als er geen link wordt ingegeven is de /user/registration de eerste pagina die zal worden weergegeven.
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full'
  },
  {
    path:'user',
    component: UserComponent,
    children:[
      {
        path:'registration',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
