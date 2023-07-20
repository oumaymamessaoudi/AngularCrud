import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Gouvernorat } from '../models/gouvernorat.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {
  private gouvUrl = 'http://localhost:5000/gouvernorat'; 
  private apiUrl: string = "http://localhost:3000/enquiry";

  constructor(private http: HttpClient) {}

  getAllGouvernorats(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(this.gouvUrl);
  }

  addGouvernorat(gouvernorat: Gouvernorat): Observable<Gouvernorat> {
    return this.http.post<Gouvernorat>(this.gouvUrl, gouvernorat);
  }
  
  createGouv(gouvObj: Gouvernorat): Observable<Gouvernorat> {
    return this.http.post<Gouvernorat>(`${this.gouvUrl}`, gouvObj);
  }
  updateGouvernorat( gouvernorat: Gouvernorat,id: number): Observable<Gouvernorat> {
    const url = `${this.gouvUrl}/${id}`;
    return this.http.put<Gouvernorat>(url, gouvernorat);
  }/*
  updateGouvernorat(id: number, gouvernorat: Gouvernorat): Observable<any> {
    return this.http.put(this.gouvUrl + `/gouvernorats/${id}`, gouvernorat);
  }*/

  deleteGouvernorat(id: number): Observable<void> {
    const url = `${this.gouvUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getGouvernoratById(id: number): Observable<Gouvernorat> {
    const url = `${this.gouvUrl}/${id}`;
    return this.http.get<Gouvernorat>(url);
  }
  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Implement other methods as per your requirements

}