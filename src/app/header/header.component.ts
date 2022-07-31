import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public  usuario:Usuario;
  constructor(private router:Router, public authService:AuthService ) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

  }

  login():void{
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
    }else{
    if (this.usuario.username==null || this.usuario.password==null){
      Swal.fire('Error Login','Username o Password Vacias !','error');
      return;
    }
    this.authService.login(this.usuario).subscribe(
      response=>{
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          let usuario = this.authService.usuario;
          Swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión con éxito!`, 'success');
      },err => {
        if (err.status == 400) {
          Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );
  }
  }
  logout(){
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
  }
}
