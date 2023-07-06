import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';


import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit  {
  public users!: User[];
  dataSource!: MatTableDataSource <User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  displayedColumns: string[] = [ 'firstName','lastName','mobile','action']
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmService: NgConfirmService,
    private toastr: ToastrService,


    private dialog: MatDialog
     ) { }
  ngOnInit(): void {
    this.getUsers();  }
    getUsers() {
      this.apiService.getRegisteredUser().subscribe(
        res => {
          this.users = res;
          console.log(this.users); // Log the users array to the console
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.error(error); // Log any errors to the console
        }
      );
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id])
  }
 /*delete(id: number) {
    this.confirmService.showConfirm("Êtes-vous sûr de vouloir supprimer ?",
      () => {
        // if 'oui' clicked
        this.apiService.deleteRegistered(id)
          .subscribe({
            next: (res) => {
              this.toastr.success('Supprimé avec succès', 'SUCCÈS', { timeOut: 3000 });
              this.getUsers();
            },
            error: (err) => {
              this.toastr.error('Quelque chose s\'est mal passé !', 'ERREUR', { timeOut: 3000 });
            }
          });
      },
      () => {
        // if 'Non' clicked
      })
  }
}*/
/*the correct
 
delete(id: number) {
  this.confirmService.showConfirm("Êtes-vous sûr de vouloir supprimer ?",
    () => {
      // if 'oui' clicked
      this.apiService.deleteRegistered(id)
        .subscribe(res => {
        });
          this.toastr.success('Supprimé avec succès', 'SUCCÈS', { timeOut: 3000 });
          this.getUsers();

    },
    () => {
      // if 'Non' clicked
    });
}*/
/*
delete(id: number) {
  console.log('Deleting user with id:', id);
  
  this.confirmService.showConfirm("Êtes-vous sûr de vouloir supprimer ?",
    () => {
      console.log('Confirmed deletion');
      
      this.apiService.deleteRegistered(id)
        .subscribe(
          res => {
            console.log('Delete response:', res);
            this.toastr.success('Supprimé avec succès', 'SUCCÈS', { timeOut: 3000 });
            this.getUsers();
          },
          err => {
            console.log('Delete error:', err);
            this.toastr.error('Quelque chose s\'est mal passé !', 'ERREUR', { timeOut: 3000 });
          }
        );
    },
    () => {
      console.log('Cancelled deletion');
      // If 'Non' clicked
    });
}


*/

delete(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: id
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm') {
      this.apiService.deleteRegistered(id).subscribe({
        next: (res) => {
          this.toastr.success('Suppression réussie', 'SUCCESS', { timeOut: 3000 });
          this.getUsers(); // Trigger re-fetch of data
        },
        error: (err) => {
          this.toastr.error('Erreur!', 'ERROR', { timeOut: 3000 });
        }
      });
    } else {
      this.toastr.info('Suppression annulée', 'INFO', { timeOut: 3000 });
    }
  });
}}