import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ville } from '../models/ville.model';
import { VilleService } from '../services/ville.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detailv',
  templateUrl: './user-detailv.component.html',
  styleUrls: ['./user-detailv.component.scss']
})
export class UserDetailvComponent implements OnInit {

  villeId!: number;
  villeDetails!: Ville;
  constructor(private activatedRoute: ActivatedRoute, private villeservice: VilleService,private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.villeId = val['id'];
      this.fetchVilleDetails(this.villeId);
    })
  }

  fetchVilleDetails(userId: number) {
    this.villeservice.getVilleById(userId)
      .subscribe({
        next: (res) => {
          this.villeDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
  goBackv() {
    this.router.navigate(['/listv']); // Replace '/list-of-students' with the actual URL of your list of students page.
  }
}