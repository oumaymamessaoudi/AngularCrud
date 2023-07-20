import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VilleService } from '../services/ville.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Ville } from '../models/ville.model';

// Import the Gouvernorat model and service
import { Gouvernorat } from '../models/gouvernorat.model';
import { GouvernoratService } from '../services/gouvernorat.service';

@Component({
  selector: 'app-ville-list',
  templateUrl: './ville-list.component.html',
  styleUrls: ['./ville-list.component.scss']
})
export class VilleListComponent implements OnInit {
  public villeForm!: FormGroup;
  private villeIdToUpdate!: number;
  public villeIsUpdatedActive: boolean = false;
  



  private isGouvernoratsLoaded = false; // Add a boolean flag to track if the gouvernorats are loaded



  // Property to store the list of Gouvernorats
  public gouvernorats: Gouvernorat[] = [];

  constructor(private formBuilder: FormBuilder ,
         private villeService: VilleService,
         private gouvernoratService: GouvernoratService, // Inject the Gouvernorat service
         private toastr: ToastrService,
         private router: Router,
         private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getGouvernorats();
    // Initialize the form and fetch the Gouvernorats
    this.villeForm = this.formBuilder.group({
      villeName: ['', [Validators.required, Validators.maxLength(50)]],
      libelle: [''],
      gouvernoratId: ['null'],
      gouvernoratName: ['']  // Add a new form control to store the selected Gouvernorat ID
    });

    // Fetch the list of Gouvernorats
    this.getGouvernorats();

    this.activatedRoute.params.subscribe(val => {
      this.villeIdToUpdate = val['id'];
      this.villeService.getVilleById(this.villeIdToUpdate)
        .subscribe(res => {
          this.villeIsUpdatedActive = true;
          this.fillFormToUpdateVille(res);
        });
    });    
  }
  getGouvernorats() {
   

    this.gouvernoratService.getAllGouvernorats().subscribe(
         (gouvernorats: Gouvernorat[]) => {
           this.gouvernorats = gouvernorats;
           this.isGouvernoratsLoaded = true; // Set the flag to true when the gouvernorats are fetched
         },
         (error: any) => {
           console.error('Error fetching Gouvernorats:', error);
         }
       );
     }

  addVille() {
  const villeData = this.villeForm.value;

  if (this.villeForm.invalid) {
    this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
    return;
  }




  const selectedGouvernorat = this.gouvernorats.find(g => g.id === villeData.gouvernoratId);
  // Set the gouvernoratName in the villeData object
  villeData.gouvernoratName = selectedGouvernorat ? selectedGouvernorat.gouvernoratName  : '';
  console.log('gouvernoratName:', villeData.gouvernoratName);



  this.villeService.createVille(villeData).subscribe(
    () => {
      this.villeForm.reset();
      this.toastr.success('Ajout avec succès', 'SUCCESS');
    },
    (error: any) => {
      console.error('Error adding ville:', error);
      this.toastr.error('Une erreur est survenue lors de l\'ajout de la ville', 'ERREUR');
    }
  );
}

updatev() {
  const villeData = this.villeForm.value;

  if (this.villeForm.invalid) {
    this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
    return;
  }

  const selectedGouvernorat = this.gouvernorats.find(g => g.id === villeData.gouvernoratId);
  villeData.gouvernoratName = selectedGouvernorat ? selectedGouvernorat.gouvernoratName : '';

  this.villeService.updateVille(villeData, this.villeIdToUpdate).subscribe(
    res => {
      this.villeForm.reset();
      this.toastr.success('Mise à jour avec succès', 'SUCCESS');
      this.router.navigate(['listv']);
    },
    error => {
      this.toastr.error('Une erreur est survenue lors de la mise à jour', 'ERREUR');
    }
  );
}

// Inside the VilleListComponent class
fillFormToUpdateVille(ville: Ville) {
  console.log('Filling form for Ville:', ville);

  // Check if the gouvernorats array is populated
  if (this.isGouvernoratsLoaded) { // Check if the gouvernorats are loaded before filling the form
    const gouvernoratName = this.getGouvernoratNameById(ville.gouvernoratId);
    console.log('Selected Gouvernorat ID:', ville.gouvernoratId);
    console.log('Selected Gouvernorat Name:', gouvernoratName);

    this.villeForm.setValue({
      villeName: ville.villeName,
      libelle: ville.libelle,
      gouvernoratId: ville.gouvernoratId,
      gouvernoratName: gouvernoratName // Include the gouvernoratName property
    });
  } else {
    // If gouvernorats array is not populated, wait a short time and try again
    setTimeout(() => this.fillFormToUpdateVille(ville), 100);
  }
}

getGouvernoratNameById(gouvernoratId: number): string {
  const selectedGouvernorat = this.gouvernorats.find(g => g.id === gouvernoratId);
  return selectedGouvernorat ? selectedGouvernorat.gouvernoratName : '';
}
}
