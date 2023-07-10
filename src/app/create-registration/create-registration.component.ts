import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
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
  packages: string[] = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Le Kef",
    "Mahdia",
    "La Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan"
];
  public registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    //private toastService: NgToastService,
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: ['', [Validators.required, this.phoneValidator()]],      dob: [''],
      package: [''],
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

 /* Submit() {
    this.api.postRegistration(this.registrationForm.value)
      .subscribe(res => {
        
        this.registrationForm.reset();
      });
    this.toastr.success('Ajout avec succès', 'SUCCESS');
  }*/
  Submit() {
    const registerObj = this.registrationForm.value;
    console.log(registerObj); // Log the value of registerObj to the console
  
    if (this.registrationForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
      return;
    }
  
    this.api.postRegistration(registerObj)
      .subscribe(res => {
        this.registrationForm.reset();
      });        this.toastr.success('Ajout avec succès', 'SUCCESS');

  }
  
  
  update() {
    this.api.updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(
        res => {
          this.registrationForm.reset();
          this.toastr.success('Mise à jour avec succès', 'SUCCESS');
          this.router.navigate(['list']);
        },
        error => {
          // Handle any error that occurred during the update operation
          this.toastr.error('Une erreur est survenue lors de la mise à jour', 'ERREUR');
        }
      );
  }
  

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      dob: user.dob,
      package: user.package,
      adr: user.adr

    });
  }
  phoneValidator() {
    return (control: any) => {
      const phoneNumber = control.value;
      const validFormats = [
        /^\(\+216\)\d{6}$/,
        /^\(00216\)\d{8}$/,
        /^\+216\d{8}$/,
        /^00216\d{8}$/,
        /^\(\+216\)\d{2}\s?\d{3}\s?\d{3}$/,
        /^\d{2}\s?\d{3}\s?\d{3}$/,
      ];

      const isValid = validFormats.some((format) => format.test(phoneNumber));

      return isValid ? null : { invalidPhone: true };
    };
  }
}