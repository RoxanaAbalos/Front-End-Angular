import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectsData: Perfil = new Perfil();
  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.perfilService.getPerfil().subscribe(
      projectsData => this.projectsData = projectsData
    );
  }

  onOpenModal(){

  }
  onDeleteSkill(){

  }

  esPar(numero) {
    return (numero % 2) == 0;
  }

}
