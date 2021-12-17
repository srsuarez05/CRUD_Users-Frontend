import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public userService: UserService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.obtenerUsuarios();
  }

  eliminarUsuario(id: number){
    if(confirm('¿Esta seguro que desea eliminar el registro?')){
      this.userService.eliminarUsuario(id).subscribe(data => {
        this.toastr.warning('Registro Eliminado', 'El usuario ha sido eliminado');
        this.userService.obtenerUsuarios();
      });
    }  
  }

  editar(user){
    this.userService.actualizar(user);
  }

}
