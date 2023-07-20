import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Gouvernorat } from '../models/gouvernorat.model';
import { Observable } from 'rxjs';
import { Ville } from '../models/ville.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private villeUrl: string = "http://localhost:4000/ville";

  private baseUrl: string = "http://localhost:3000/enquiry"
  private gouvUrl: string = "http://localhost:5000/gouvernorat"

  constructor(private http: HttpClient) { }


  getGouvernorats(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(`${this.gouvUrl}`);
  }
  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  updateRegisterUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistered(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }
  getAllGouvernorats(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(`${this.gouvUrl}`);
  }
  
  getVillesForGouvernorat(gouvernoratId: string): Observable<Ville[]> {
    console.log(`Fetching villes for gouvernorat with ID: ${gouvernoratId}`);
    return this.http.get<Ville[]>(`${this.villeUrl}/${gouvernoratId}`);
  }
}

/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000/enquiry"
  constructor(private http: HttpClient) { }

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  updateRegisterUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistered(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url);
  }
  

  getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

}
*/
