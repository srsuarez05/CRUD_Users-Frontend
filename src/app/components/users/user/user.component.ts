import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription: Subscription;
  user: User;
  idUser= 0;

  constructor(private formBuilder: FormBuilder, 
              private userService: UserService,
              private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id: 0,
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaNac: ['', [Validators.required]],
      telefono: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    this.suscription = this.userService.obtenerUsuario().subscribe(data =>{
      console.log(data);
      this.user = data;
      this.form.patchValue({
        cedula: this.user.cedula,
        nombre: this.user.nombre,
        fechaNac: this.user.fechaNac,
        telefono: this.user.telefono
      });
      this.idUser = this.user.id;
    });
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  guardarUsuario(){
    if(this.idUser === 0 || this.idUser === undefined){
      this.agregar();
    }else{
      this.editar();
    } 
  }  

  agregar(){
    const user: User = {
      cedula: this.form.get('cedula').value,
      nombre: this.form.get('nombre').value,
      fechaNac: this.form.get('fechaNac').value,
      telefono: this.form.get('telefono').value
    }
    this.userService.guardarUsuario(user).subscribe(data =>{
      this.toastr.success('Registro Agregado', 'Usuario creado exitosamente.');
      this.userService.obtenerUsuarios();
      this.form.reset();
    });
  }

  editar(){
    const user: User = {
      id: this.user.id,
      cedula: this.form.get('cedula').value,
      nombre: this.form.get('nombre').value,
      fechaNac: this.form.get('fechaNac').value,
      telefono: this.form.get('telefono').value
    }
    this.userService.actualizarUsuario(this.idUser, user).subscribe(data =>{
      this.toastr.info('Registro Actualizado', 'Usuario actualizado exitosamente.');
      this.userService.obtenerUsuarios();
      this.form.reset();
      this.idUser = 0;
    })    
  }


}
