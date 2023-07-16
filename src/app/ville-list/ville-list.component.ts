import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VilleService } from '../services/ville.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Ville } from '../models/ville.model';
@Component({
  selector: 'app-ville-list',
  templateUrl: './ville-list.component.html',
  styleUrls: ['./ville-list.component.scss']
})
export class VilleListComponent implements OnInit {
  public villeForm!: FormGroup;
  private villeIdToUpdate!: number;
  public villeIsUpdatedActive: boolean = false;

  constructor(private formBuilder: FormBuilder ,
         private villeService: VilleService,
         private toastr: ToastrService,
         private router : Router ,
         private activatedRoute: ActivatedRoute ) {
  }
  ngOnInit(): void {
    this.villeForm = this.formBuilder.group({
      villeName: [''],
        libelle: ['']
      });
      this.activatedRoute.params.subscribe(val => {
        this.villeIdToUpdate = val['id'];
        this.villeService.getVilleById(this.villeIdToUpdate)
          .subscribe(res => {
            this.villeIsUpdatedActive = true;
            this.fillFormToUpdateVille(res);
          });
      });    
  }
  addVille() {
  const villeData = this.villeForm.value;

  if (this.villeForm.invalid) {
    this.toastr.error('Veuillez remplir tous les champs correctement', 'ERREUR');
    return;
  }

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

updatev(){
  this.villeService.updateVille(this.villeForm.value, this.villeIdToUpdate)
  .subscribe(
    res => {
      this.villeForm.reset();
      this.toastr.success('Mise à jour avec succès', 'SUCCESS');
      this.router.navigate(['listv']);
    },
    error => {
      // Handle any error that occurred during the update operation
      this.toastr.error('Une erreur est survenue lors de la mise à jour', 'ERREUR');
    }
  );

}

fillFormToUpdateVille(ville: Ville){
  this.villeForm.setValue({
    villeName: ville.villeName,
    libelle: ville.libelle

  });
}
}

