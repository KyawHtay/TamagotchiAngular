import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPets } from './_interfaces/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private Url = 'https://localhost:44322/api/Tamagotchi/displaypet/1';

  constructor(private http: HttpClient) { }

  getPets(): Observable<IPets[]> {
    return this.http.get<IPets[]>(this.Url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

    // Get one pet
  // Since we are working with a json file, we can only retrieve all pets
  // So retrieve all pets and then find the one we want using 'map'
  getPet(id: number): Observable<IPets> {
    return this.getPets()
      .pipe(
        map((pets: IPets[]) => pets.find(p => p.id === id),
       // tap(data => console.log('Pet: ', JSON.stringify(data)))
       )
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}


