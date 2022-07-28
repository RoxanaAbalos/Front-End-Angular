import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { Worked } from '../models/worked';
import { AuthService } from '../services/auth.service';
import { PerfilService } from '../services/perfil.service';
@Component({
  selector: 'app-worked',
  templateUrl: './worked.component.html',
  styleUrls: ['./worked.component.css']
})
export class WorkedComponent implements OnInit {
  perfilData: Perfil = new Perfil();
  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  workedEdit: Worked | undefined;
  constructor(private perfilService: PerfilService,public authService:AuthService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.perfilService.getPerfil().subscribe(
      perfilData => this.perfilData = perfilData
    );
  }
  public onOpenModal(mode: string, worked?: Worked): void {
    const container = document.getElementById('main-container-experience');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienceModal');
    } else if (mode === 'edit') {
      this.workedEdit = worked;
      button.setAttribute('data-target', '#editExperienceModal');
    }
    container?.appendChild(button);
    button.click();
  }

  onAddProyect(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.perfilData.workeds.push(<Worked>addForm.value);
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        console.log(json);
        Swal.fire(`${<Worked>addForm.value.puesto}`, `${json.mensaje} `, 'success');
        this.getData();
        addForm.reset();
      }
    );
  }

  onUpdateProyect(worked: Worked): void {
    this.workedEdit = worked;
    this.perfilData.workeds.splice(this.perfilData.workeds.findIndex(id => id.id == worked.id), 1, worked);
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        console.log(json);
        Swal.fire(`${worked.puesto}`, `${json.mensaje} `, 'success');
        this.getData();
      }
    );
  }

  onDeleteExperience(data: Worked): void {
    Swal.fire({
      title: `Estas seguro de eliminar ${data.puesto}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfilData.workeds = this.perfilData.workeds.filter(
          item => item !== data
        );
        this.perfilService.update(this.perfilData).subscribe({
          next: (response: void) => {
            Swal.fire(`${data.puesto} Eliminada`, 'Experiencia eliminada con exito !!', 'success');
            this.getData();
          }
        });

      }
    })

  }

}
