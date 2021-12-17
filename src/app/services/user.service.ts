import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  myAppUrl= 'https://ss-crud-users.azurewebsites.net/';
  myApiUrl= 'api/Users/';
  list: User[];
  private actualizarFormulario = new BehaviorSubject<User>({} as any);

  constructor(private http: HttpClient) { }

  guardarUsuario(user: User): Observable<User>{
    return this.http.post<User>(this.myAppUrl + this.myApiUrl, user);
  }

  obtenerUsuarios(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
                  .then(data =>{
                    this.list = data as User[];
                  });
  }

  eliminarUsuario(id: number): Observable<User>{
    return this.http.delete<User>(this.myAppUrl + this.myApiUrl + id);
  }

  actualizar(user){
    this.actualizarFormulario.next(user);
  }

  obtenerUsuario(): Observable<User>{
    return this.actualizarFormulario.asObservable();
  }

  actualizarUsuario(id: number, user: User): Observable<User>{
    return this.http.put<User>(this.myAppUrl + this.myApiUrl + id, user);
  }
}
