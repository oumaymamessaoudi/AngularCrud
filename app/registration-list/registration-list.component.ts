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
    this.getUsers(); }


  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: User, filter: string) => {
        return (
          data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter) ||
          data.mobile.toString().includes(filter)
        );
      };
      this.dataSource.filter = filterValue;
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getUsers() {
      this.apiService.getRegisteredUser().subscribe(
        res => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.error(error); 
        }
      );
    }
  
  edit(id: number) {
    this.router.navigate(['update', id])
  }
 

delete(id: number) {
  console.log('Deleting user with id:', id);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: id
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm') {
      this.apiService.deleteRegistered(id).subscribe({
        next: (res) => {
          this.toastr.success('Suppression réussie', 'SUCCESS', { timeOut: 3000 });
          this.getUsers(); 
        },
        error: (err) => {
          this.toastr.error('Erreur!', 'ERROR', { timeOut: 3000 });
        }
      });
    } else {
      this.toastr.info('Suppression annulée', 'INFO', { timeOut: 3000 });
    }
  });
}

}