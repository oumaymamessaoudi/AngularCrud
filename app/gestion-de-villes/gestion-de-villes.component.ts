import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Ville } from '../models/ville.model';
import { VilleService } from '../services/ville.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gestion-de-villes',
  templateUrl: './gestion-de-villes.component.html',
  styleUrls: ['./gestion-de-villes.component.scss']
})
export class GestionDeVillesComponent implements OnInit {
  public dataSource2!: MatTableDataSource <Ville>;
  public villes!: Ville[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id','villename' ,'gouvernoratName' ,'action'];

  constructor(
    private apiService: VilleService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog ){}
  ngOnInit(): void {
   this.getVilles();  
  }
  
  
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource2.filterPredicate = (data: Ville, filter: string) => {
      return (
        data.id.toString().includes(filter) ||
        data.villeName.toLowerCase().includes(filter) ||
        data.gouvernoratName.toLowerCase().includes(filter)
      );
    };
    this.dataSource2.filter = filterValue;
  
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  getVilles() {
    this.apiService.getAllVilles().subscribe(
      (villes: any) => {
        this.villes = villes.map((ville: Ville) => {
          return {
            villeName: ville.villeName, 
            libelle: ville.libelle,
            id: ville.id,
            gouvernoratName: ville.gouvernoratName 
          };
        });
        this.dataSource2 = new MatTableDataSource(this.villes);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  
editv(id:number){
  this.router.navigate(['updatev',id]);
}
deletev(id: number) {
  this.apiService.getVilleById(id).subscribe(
    (ville: Ville) => {
      this.apiService.getAllStudents().subscribe(
        (students: User[]) => {
          const studentsInVille = students.filter((student: User) => student.villeName === ville.villeName);
          if (studentsInVille.length > 0) {
            this.toastr.error('Impossible de supprimer la ville. Des étudiants y résident.', 'ERROR', { timeOut: 3000 });
          } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '300px',
              data: 'Êtes-vous sûr de vouloir supprimer cette ville?'
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result === 'confirm') {
                const villeIndex = this.villes.findIndex(v => v.id === id);

                this.apiService.deleteVille(id).subscribe(
                  () => {
                    this.toastr.success('Ville supprimée avec succès.', 'SUCCESS', { timeOut: 3000 });
                    this.villes.splice(villeIndex, 1); 
                    this.dataSource2.data = [...this.villes]; 
                  },
                  (error: any) => {
                    this.toastr.error('Erreur lors de la suppression de la ville.', 'ERROR', { timeOut: 3000 });
                    console.error("Erreur lors de la suppression de la ville:", error);
                  }
                );
              }
            });
          }
        },
        (error: any) => {
          this.toastr.error('Erreur lors de la récupération des étudiants', 'ERROR', { timeOut: 3000 });
          console.error("Erreur lors de la récupération des étudiants:", error);
        }
      );
    },
    (error: any) => {
      this.toastr.error('Erreur lors de la récupération de ville.', 'ERROR', { timeOut: 3000 });
      console.error("Erreur lors de la récupération de ville:", error);
    }
  );
}}