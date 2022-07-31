import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public titulo: string = 'Por favor Loguearse!';
  usuario:Usuario;
  constructor() { }

  ngOnInit(): void {
  }
  login(){
    
  }
}
