import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  gouvernoratData: number[] = [];
  gouvernoratLabels: string[] = [];
  gouvernoratChartType: string = 'pie';
  gouvernoratChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  ageData: number[] = [];
  ageLabels: string[] = ['18-20', '21-25', '26-30', '31-35', '36+'];
  ageChartType: string = 'bar';
  ageChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  fetchStudentData() {
    this.apiService.getStudents().subscribe(
      (data) => {
        this.gouvernoratData = this.calculateGouvernoratData(data);
        this.ageData = this.calculateAgeData(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  calculateGouvernoratData(data: any[]): number[] {
    const gouvernoratCounts: any = data.reduce((acc, curr) => {
      acc[curr.gouvernoratName] = (acc[curr.gouvernoratName] || 0) + 1;
      return acc;
    }, {});

    this.gouvernoratLabels = Object.keys(gouvernoratCounts);
    return Object.values(gouvernoratCounts);
  }

  calculateAgeData(data: any[]): number[] {
    const ageRanges = [18, 21, 26, 31, 36];
    const ageCounts = Array(ageRanges.length).fill(0);

    for (const student of data) {
      const age = this.calculateAge(student.dob);
      for (let i = 0; i < ageRanges.length; i++) {
        if (age >= ageRanges[i] && age < ageRanges[i + 1]) {
          ageCounts[i]++;
          break;
        }
      }
    }

    return ageCounts;
  }

  calculateAge(dateOfBirth: string): any {
    // Implement the age calculation logic here
    // ...
  }
}
