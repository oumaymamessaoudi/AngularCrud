import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId!: number;
  userDetails!: User;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,private router: Router ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
  }
  downloadDetailsAsPDF() {
    const doc = new jsPDF.default(); // Note the usage of .default() here
    doc.text('Détails de l\'étudiant', 10, 10);

    // Prepare the table data
    const tableData = [
      ['Prénom', 'Nom', 'N° tel', 'Date de naissance', 'Gouvernorat', 'Ville', 'Adresse'],
      [
        this.userDetails.firstName,
        this.userDetails.lastName,
        this.userDetails.mobile,
        this.userDetails.dob,
        this.userDetails.gouvernoratName,
        this.userDetails.villeName,
        this.userDetails.adr
      ]
    ];

    // Add the table to the PDF using jspdf-autotable
    (doc as any).autoTable({
      body: tableData,
      startY: 20
    });

    // Save or open the PDF
    doc.save('details_etudiant.pdf');
  }

  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
/*  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId)
      .subscribe({
        next: (res) => {
          console.log('API Response:', res); // Log the API response
          this.userDetails = res as User;
          console.log('userDetails:', this.userDetails); // Log the assigned userDetails object
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  */

  goBack() {
    this.router.navigate(['/list']); // Replace '/list-of-students' with the actual URL of your list of students page.
  }
}