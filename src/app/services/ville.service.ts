import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ville } from '../models/ville.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private baseUrl: string = "http://localhost:4000/ville";
  private apiUrl: string = "http://localhost:3000/enquiry";

  constructor(private http: HttpClient) { }

  getAllVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.baseUrl}`);
  }

  getVilleById(id: number): Observable<Ville> {
    return this.http.get<Ville>(`${this.baseUrl}/${id}`);
  }

  createVille(villeObj: Ville): Observable<Ville> {
    return this.http.post<Ville>(`${this.baseUrl}`, villeObj);
  }

  updateVille(villeObj: Ville, id: number): Observable<Ville> {
    return this.http.put<Ville>(`${this.baseUrl}/${id}`, villeObj);
  }

  deleteVille(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}

/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ville } from '../models/ville.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
 private baseUrl: string = "http://localhost:4000/ville";
  constructor(private http: HttpClient) { }
 getAllVilles() {
  return this.http.get<Ville[]>(`${this.baseUrl}`);
}

getVilleById(id: number) {
  return this.http.get<Ville>(`${this.baseUrl}/${id}`);
}

createVille(villeObj: Ville) {
  return this.http.post<Ville>(`${this.baseUrl}`, villeObj);
}


updateVille(villeObj: Ville, id: number) {
  return this.http.put<Ville>(`${this.baseUrl}/${id}`, villeObj);
}

deleteVille(id: number) {
  return this.http.delete<Ville>(`${this.baseUrl}/${id}`);
}

getAllStudents() {
  return this.http.get(this.baseUrl);
}

getVilles(): Observable<Ville[]> {
  return this.http.get<Ville[]>(`${this.baseUrl}`);
}

}
*/