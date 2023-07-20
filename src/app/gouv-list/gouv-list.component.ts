import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Gouvernorat } from '../models/gouvernorat.model';
import { GouvernoratService } from '../services/gouvernorat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-gouv-list',
  templateUrl: './gouv-list.component.html',
  styleUrls: ['./gouv-list.component.scss']
})
export class GouvListComponent implements OnInit{
  public dataSource3!: MatTableDataSource <Gouvernorat>;
  public gouvernorats!: Gouvernorat[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['gouvernoratName' ,'action'];


  
  constructor(
    private apiService: GouvernoratService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog 
    ){}
  ngOnInit(): void {
   this.getGouvernorats();  
  }
 
getGouvernorats() {
  this.apiService.getAllGouvernorats().subscribe(
    (gouvernorats: Gouvernorat[]) => {
      this.gouvernorats = gouvernorats;
      this.dataSource3 = new MatTableDataSource(this.gouvernorats);
      this.dataSource3.paginator = this.paginator;
      this.dataSource3.sort = this.sort;
    },
    (error: any) => {
      console.error(error);
    }
  );
}


  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource3.filterPredicate = (data: Gouvernorat, filter: string) => {
      return data.gouvernoratName.toLowerCase().includes(filter) || data.id.toString().includes(filter);
    };
    this.dataSource3.filter = filterValue;
    
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }
   /*getGouvernorats(){
   
      this.apiService.getAllGouvernorats().subscribe(
        (gouvernorats: any) => {
          this.gouvernorats = gouvernorats.map((gouvernorat: Gouvernorat) => {
            return {
              gouvernoratName: gouvernorat.gouvernoratName, // Corrected property name
              libelle: gouvernorat.libelle,
              id: gouvernorat.id
            };
          });
          this.dataSource3 = new MatTableDataSource(this.gouvernorats);
          this.dataSource3.paginator = this.paginator;
          this.dataSource3.sort = this.sort;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }*/







  
  editgouv(id: number) {
    this.router.navigate(['/updategouv', id]); // Use an array with '/updategouv' and the 'id' parameter
  }
  deletegouv(id: number) {
    this.apiService.getGouvernoratById(id).subscribe(
      (gouvernorat: Gouvernorat) => {
        this.apiService.getAllStudents().subscribe(
          (students: User[]) => {
            const studentsInGouvernorat = students.filter((student: User) => student.gouvernoratName === gouvernorat.gouvernoratName);
            if (studentsInGouvernorat.length > 0) {
              this.toastr.error('Impossible de supprimer le gouvernorat. Des étudiants y résident.', 'ERROR', { timeOut: 3000 });
            } else {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '300px',
                data: 'Êtes-vous sûr de vouloir supprimer ce gouvernorat?'
              });
  
              dialogRef.afterClosed().subscribe(result => {
                if (result === 'confirm') {
                  const gouvernoratIndex = this.gouvernorats.findIndex(g => g.id === id);
  
                  this.apiService.deleteGouvernorat(id).subscribe(
                    () => {
                      this.toastr.success('Gouvernorat supprimé avec succès.', 'SUCCESS', { timeOut: 3000 });
                      this.gouvernorats.splice(gouvernoratIndex, 1); // Remove the gouvernorat from the gouvernorats array
                      this.dataSource3.data = [...this.gouvernorats]; // Update the data source with the modified gouvernorats array
                    },
                    (error: any) => {
                      this.toastr.error('Erreur lors de la suppression du gouvernorat.', 'ERROR', { timeOut: 3000 });
                      console.error("Erreur lors de la suppression du gouvernorat:", error);
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
        this.toastr.error('Erreur lors de la récupération du gouvernorat.', 'ERROR', { timeOut: 3000 });
        console.error("Erreur lors de la récupération du gouvernorat:", error);
      }
    );
  }
  
}
