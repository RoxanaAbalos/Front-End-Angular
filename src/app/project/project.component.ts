import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { Project } from '../models/project';
import { AuthService } from '../services/auth.service';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  perfilData: Perfil = new Perfil();
  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  projects: Project[] = [];
  editProject: Project | undefined;

  constructor(private perfilService: PerfilService,public authService:AuthService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.perfilService.getPerfil().subscribe(
      perfilData => this.perfilData = perfilData
    );
  }
  public onOpenModal(mode: string, project?: Project): void {
    const container = document.getElementById('main-container-proyect');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectModal');
    } else if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-target', '#editProyectModal');
    }
    container?.appendChild(button);
    button.click();
  }

  onAddProyect(addForm: NgForm): void {
    document.getElementById('add-proyect-form')?.click();
    this.perfilData.projects.push(<Project>addForm.value);
    this.perfilService.add(this.perfilData).subscribe(
      json => {
        console.log(json);
        Swal.fire(`${<Project>addForm.value.titulo}`, `${json.mensaje} `, 'success');
        this.getData();
        addForm.reset();
      }
    );
  }

  public onUpdateProyect(project: Project): void {
    this.editProject = project;
    this.perfilData.projects.splice(this.perfilData.projects.findIndex(id => id.id == project.id), 1, project);

    this.perfilService.update(this.perfilData).subscribe(
      json => {
        console.log(json);
        Swal.fire(`${project.titulo}`, `${json.mensaje} `, 'success');
        this.getData();
      }
    );
  }

  public onDeleteProyect(data: Project): void {
    Swal.fire({
      title: `Estas seguro de eliminar el Proyecto ${data.titulo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfilData.projects = this.perfilData.projects.filter(
          item => item !== data
        );
        this.perfilService.update(this.perfilData).subscribe({
          next: (response: void) => {
            Swal.fire(`${data.titulo} eliminado`, 'Proyecto  eliminado con exito !!', 'success');
            this.getData();
          }
        });

      }
    })

  }
  esPar(numero) {
    return (numero % 2) == 0;
  }

}
