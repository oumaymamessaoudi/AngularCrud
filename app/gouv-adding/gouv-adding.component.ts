import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GouvernoratService } from '../services/gouvernorat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gouvernorat } from '../models/gouvernorat.model'; 

@Component({
  selector: 'app-gouv-adding',
  templateUrl: './gouv-adding.component.html',
  styleUrls: ['./gouv-adding.component.scss']
})
export class GouvAddingComponent implements OnInit {
 
  public gouvForm!: FormGroup;
  GouvernoratService: GouvernoratService | undefined;
  public gouvIdToUpdate!: number;
  public gouvIsUpdatedActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private gouvernoratService: GouvernoratService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gouvForm = this.formBuilder.group({
      gouvernoratName: ['', [Validators.required, Validators.maxLength(50)]],
      libelle: ['']
    }); 

    this.activatedRoute.params.subscribe(val => {
      this.gouvIdToUpdate =  val['id'];
      this.gouvernoratService.getGouvernoratById(this.gouvIdToUpdate)
        .subscribe(res => {
          this.gouvIsUpdatedActive = true;
          this.fillFormToUpdateGouv(res);
        });
    });    
  }

  fillFormToUpdateGouv(gouvernorat: Gouvernorat) { 
    this.gouvForm.setValue({
      gouvernoratName: gouvernorat.gouvernoratName,
      libelle: gouvernorat.libelle
    });
  }

  addGouv() {
    const gouvData = this.gouvForm.value;
  
    if (this.gouvForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
      return;
    }
  
    this.gouvernoratService.createGouv(gouvData).subscribe(
      (res: any) => {
        const addedGouvId = res.id; 
        this.router.navigate(['/user-detailgouv', addedGouvId]);
        this.gouvForm.reset();
        this.toastr.success('Ajout avec succès', 'SUCCESS');
      },
      (error: any) => {
        console.error('Error adding gouvernorat:', error);
        this.toastr.error('Une erreur est survenue lors de l\'ajout du gouvernorat', 'ERREUR');
      }
    );
  }
  
updateGouv(){
  const gouvData = this.gouvForm.value;
  
    if (this.gouvForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
      return;
    }
  
    this.gouvernoratService.updateGouvernorat(gouvData , this.gouvIdToUpdate).subscribe(
      (res: any) => {
        const updatedGouvId = res.id;
        this.router.navigate(['/user-detailgouv', updatedGouvId]);
        this.gouvForm.reset();
        this.toastr.success('Mise à jour avec succès', 'SUCCESS');

      },
      (error: any) => {
        console.error('Error adding gouvernorat:', error);
        this.toastr.error('Une erreur est survenue lors de l\'ajout du gouvernorat', 'ERREUR');
      }
    );
  }
  annulerg() {
    this.router.navigate(['/gouv-list']); 
  }
  
 

}
