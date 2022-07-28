import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Education } from '../models/education';
import { Perfil } from '../models/perfil';
import { AuthService } from '../services/auth.service';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  perfilData: Perfil = new Perfil();
  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  formaciones: Education[] = [];
  editFormation: Education | undefined;
  constructor(private perfilService: PerfilService, public authService:AuthService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.perfilService.getPerfil().subscribe(
      perfilData => this.perfilData = perfilData
    );
  }

  public onOpenModal(mode: string, education?: Education): void {

    const container = document.getElementById('main-container-formation');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addFormationModal');
    } else if (mode === 'edit') {
      this.editFormation = education;
      button.setAttribute('data-target', '#editFormationModal');
    }

    container?.appendChild(button);
    button.click();
  }

  onAddFormation(addForm: NgForm): void {
    document.getElementById('add-formation-form')?.click();
    this.perfilData.educations.push(<Education>addForm.value)
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        console.log(json);
        Swal.fire(`${<Education>addForm.value.titulo}`, `${json.mensaje} `, 'success');
        this.getData();
        addForm.reset();
      }
    );
  }


  onUpdateFormation(education: Education): void {
    this.editFormation = education;
    this.perfilData.educations.splice(this.perfilData.skills.findIndex(id => id.id == education.id), 1, education);
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        console.log(json);
        Swal.fire(`${education.titulo}`, `${json.mensaje} `, 'success');
        this.getData();
      }
    );
  }

  onDeleteFormation(data: Education): void {
    Swal.fire({
      title: `Estas seguro de eliminar la Formacion ${data.titulo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfilData.educations = this.perfilData.educations.filter(
          item => item !== data
        );
        this.perfilService.update(this.perfilData).subscribe({
          next: (response: void) => {
            Swal.fire(`${data.titulo} eliminada`, 'Formacion eliminada con exito !!', 'success');
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
