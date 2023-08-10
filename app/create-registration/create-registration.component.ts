import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { VilleService } from '../services/ville.service';
import { Ville } from '../models/ville.model';
import { Gouvernorat } from '../models/gouvernorat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
 
  public registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  public gouvernorats: Gouvernorat[] = [];
 
  gouvernorats$: Observable<Gouvernorat[]>;
  villes: Ville[] = [];
  selectedGouvernorat: string = '';
 
 
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private villeService: VilleService,
    
  ) {
    this.gouvernorats$ = this.villeService.getAllGouvernorats();
  }

  ngOnInit(): void {
    this.getGouvernorats();
    this.getVilles();
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]], 
      mobile: ['', [Validators.required, this.phoneValidator()]],
      dob: [''],
      villeName: [''],
      adr: [''],
      gouvernoratName: ['']
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
onGouvernoratSelected(gouvernoratName: string) {
  this.selectedGouvernorat = gouvernoratName;
  this.villeService.getVillesByGouvernorat(gouvernoratName).subscribe((villes) => {
    this.villes = villes;
  });
}

getGouvernorats(): void {
  this.api.getAllGouvernorats().subscribe(
    (gouvernorats: Gouvernorat[]) => {
      this.gouvernorats = gouvernorats;
    },
    (error: any) => {
      console.error('Error getting gouvernorats:', error);
    }
  );
}

onGouvernoratChange(gouvernoratName: string) {
  this.registrationForm.patchValue({
    villeName: '' 
  });

  if (gouvernoratName) {
    this.villeService.getVillesByGouvernorat(gouvernoratName).subscribe(
      (villes: Ville[]) => {
        this.villes = villes;
      },
      (error: any) => {
        console.error('Error getting villes:', error);
      }
    );
  }
}
  Submit() {
    const registerObj = this.registrationForm.value;
    console.log(registerObj); 
  
    if (this.registrationForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
      return;
    }
  
    this.api.postRegistration(registerObj)
      .subscribe(res => {
        const userId = res.id;
        this.router.navigate(['/user-detail', userId]);
        this.registrationForm.reset();
      });        this.toastr.success('Ajout avec succès', 'SUCCESS');

  }
  
  
  update() {
    this.api.updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(
        res => {
          const updatedUserId = res.id;
          this.router.navigate(['/user-detail', updatedUserId]);
          this.registrationForm.reset();
          this.toastr.success('Mise à jour avec succès', 'SUCCESS');
        },
        error => {
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
      villeName: user.villeName, 
      adr: user.adr,
      gouvernoratName: user.gouvernoratName|| ''
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

getVilles(): void {
  this.villeService.getAllVilles().subscribe(
    (villes: Ville[]) => {
      this.villes = villes;
    },
    (error: any) => {
      console.error('Error getting villes:', error);
    }
  );
}
annuler() {
  this.router.navigate(['/list']); 
}
}