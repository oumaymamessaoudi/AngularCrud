import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { HttpClientModule } from '@angular/common/http';
import { NgConfirmModule } from 'ng-confirm-box';

import { RegistrationListComponent } from './registration-list/registration-list.component';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {ToastrModule} from 'ngx-toastr' ;

import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GestionDeVillesComponent } from './gestion-de-villes/gestion-de-villes.component';
import { VilleListComponent } from './ville-list/ville-list.component';
import { UserDetailvComponent } from './user-detailv/user-detailv.component';
import { GouvAddingComponent } from './gouv-adding/gouv-adding.component';
import { GouvListComponent } from './gouv-list/gouv-list.component';
import { UserDetailgouvComponent } from './user-detailgouv/user-detailgouv.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationListComponent,
    CreateRegistrationComponent,
    UserDetailComponent,
    ConfirmDialogComponent,
    GestionDeVillesComponent,
    VilleListComponent,
    UserDetailvComponent,
    GouvAddingComponent,
    GouvListComponent,
    UserDetailgouvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,

    NgConfirmModule,

   ToastrModule.forRoot({}),

    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }