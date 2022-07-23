import { Component, OnInit } from '@angular/core';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-worked',
  templateUrl: './worked.component.html',
  styleUrls: ['./worked.component.css']
})
export class WorkedComponent implements OnInit {
  perfilData: Perfil = new Perfil();
  constructor(private perfilService:PerfilService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.perfilService.getPerfil().subscribe(
      perfilData => this.perfilData = perfilData
    );
  }

}
