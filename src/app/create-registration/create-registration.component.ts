import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    /*private toastService: NgToastService,*/
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      dob: [''],
      adr: [''],
    });


    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate)
        .subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res);
        });
    });    
}

  Submit() {
    this.api.postRegistration(this.registrationForm.value)
      .subscribe(res => {
        
        this.registrationForm.reset();
      });
    this.toastr.success('Ajout avec succès', 'SUCCESS');
  }
  update() {
    this.api.updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res => {
        
        this.registrationForm.reset();
      });
      this.toastr.success('Mise à jour avec succès', 'SUCCESS');
        this.router.navigate(['list']);
  }
  

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      dob: user.dob,
      adr: user.adr
    })
  }

}