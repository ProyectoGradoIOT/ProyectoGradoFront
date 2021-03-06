import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ControlService {

  constructor(private http:HttpClient) { }

  Get():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}webhook`)
  }

  GetByStation(idStation:string,quantity:number){
    return this.http.get<any>(`${environment.apiUrl}webhook/${idStation}/${quantity.toString()}`)
  }
}
