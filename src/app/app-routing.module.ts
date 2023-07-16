import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GestionDeVillesComponent } from './gestion-de-villes/gestion-de-villes.component';
import { VilleListComponent } from './ville-list/ville-list.component';
import { UserDetailvComponent } from './user-detailv/user-detailv.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'ville', component: GestionDeVillesComponent },

  { path: 'ville-list', component: VilleListComponent },

  { path: 'update/:id', component: CreateRegistrationComponent },
  { path: 'detail/:id', component: UserDetailComponent},
  { path: 'list', component: RegistrationListComponent },

  { path: 'detailv/:id', component: UserDetailvComponent},
  { path: 'updatev/:id', component: VilleListComponent },
  { path: 'listv', component: GestionDeVillesComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }