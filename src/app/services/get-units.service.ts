import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';
@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl ="https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  //behaviorSubjet muda de estado, muda o comportamento e um observavel(allunits$)
  //os valores que mudaram serao o array vazio e o location
  //o observavel quando muda notifica aquele que esta observando ele
  private allUnitsSubject: BehaviorSubject<Location[]>=new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]>= this.allUnitsSubject.asObservable();
  private filteredUnits: Location[]= [];

  constructor(private httpCliente: HttpClient) {
    this.httpCliente.get<UnitsResponse>(this.apiUrl).subscribe(data => { 
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    })
   
  }
  getAllUnits(): Observable<Location[]>{
    return this.allUnits$;
  }

  getFilteredUnits(){
    return this.filteredUnits;
  }
  
  setFilteredUnits(value: Location[]){
    this.filteredUnits = value;
  }
  
}




