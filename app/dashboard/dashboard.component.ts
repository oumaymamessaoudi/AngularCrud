
import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';


import { ApiService } from '../services/api.service';
import { GouvernoratService } from '../services/gouvernorat.service';
import { VilleService } from '../services/ville.service';
import { User } from '../models/user.model';
import { Gouvernorat } from '../models/gouvernorat.model';
import { Ville } from '../models/ville.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pieChartData: any[] = []; 
  public pieChartView: [number, number] = [700, 400]; 
  public pieChartLegend = true;
  

  public barChartData: any[] = []; 
  public barChartView: [number, number] = [700, 400];
  public barChartLegend = true;
  public barChartXAxis = true;
  public barChartYAxis = true;
  public barChartShowXAxisLabel = true;
  public barChartXAxisLabel = 'Tranche d\'âge';
  public barChartShowYAxisLabel = true;
  public barChartYAxisLabel = 'Nombre des étudiants';




  constructor(
    private apiService: ApiService,
    private gouvernoratService: GouvernoratService,
    private villeService: VilleService
  ) { }

  ngOnInit(): void {
    this.updateChartData();
  }
  
  
  updateChartData() {
    this.apiService.getRegisteredUser().subscribe((users: User[]) => {
      const distribution = this.calculateGouvernoratDistribution(users);
      distribution.subscribe(data => {
        this.pieChartData = data;
      });
    });

    this.apiService.getRegisteredUser().subscribe((users: User[]) => {
      const ageDistribution = this.calculateAgeDistribution(users);
      this.barChartData = ageDistribution;
    });
  }

calculateGouvernoratDistribution(users: User[]): Observable<any[]> {
  return this.gouvernoratService.getAllGouvernorats().pipe(
    map((gouvernorats: Gouvernorat[]) => {
      return gouvernorats.map(g => ({
        name: g.gouvernoratName,
        value: users.filter(u => u.gouvernoratName === g.gouvernoratName).length
      }));
    })
  );
}
calculateAgeDistribution(users: User[]): any[] {
  const currentDate = new Date();
  const ageRanges = [
    { min: 18, max: 20, label: '18-20' },
    { min: 21, max: 25, label: '21-25' },
    { min: 26, max: 30, label: '26-30' },
    { min: 31, max: 35, label: '31-35' },
    { min: 36, max: 38, label: '36-38' }
  ];

  const ageDistribution = ageRanges.map(range => ({
    name: range.label,
    value: users.filter(u => this.calculateAge(u.dob, currentDate) >= range.min && this.calculateAge(u.dob, currentDate) <= range.max).length
  }));

  return ageDistribution;
}

calculateAge(dob: string, currentDate: Date): number {
  const birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

onPieChartSelect(event: any) {
  console.log(event);
}

onBarChartSelect(event: any) {
  console.log(event);
}
}