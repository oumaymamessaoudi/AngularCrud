import { Component, OnInit } from '@angular/core';
import { GouvernoratService } from '../services/gouvernorat.service';
import { Gouvernorat } from '../models/gouvernorat.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detailgouv',
  templateUrl: './user-detailgouv.component.html',
  styleUrls: ['./user-detailgouv.component.scss']
})
export class UserDetailgouvComponent implements OnInit {

  gouvId!: number;
  gouvernoratDetails!: Gouvernorat;
  constructor(private activatedRoute: ActivatedRoute, private GouvernoratService: GouvernoratService,private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.gouvId = val['id'];
      this.fetchGouvDetails(this.gouvId);
    })
  }

  fetchGouvDetails(userId: number) {
    this.GouvernoratService.getGouvernoratById(userId)
      .subscribe({
        next: (res) => {
          this.gouvernoratDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
  goBackg() {
    this.router.navigate(['/gouv-list']); // Replace '/list-of-students' with the actual URL of your list of students page.
  }}