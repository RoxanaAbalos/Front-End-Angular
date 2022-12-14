import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { Skill } from '../models/skill';
import { AuthService } from '../services/auth.service';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
 public perfilData: Perfil = new Perfil();
 public skills: Skill[] = [];
 public skillEdit: Skill | undefined;
  public lista: string[] = ["Bajo", "Medio", "Alto", "Experto"];
  constructor(private perfilService: PerfilService,public authService:AuthService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.perfilService.getPerfil().subscribe(
      perfilData => this.perfilData = perfilData
    );
  }

  public onOpenModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container-skill');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
    } else if (mode === 'edit') {
      this.skillEdit = skill;
      button.setAttribute('data-target', '#editSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }
  onAddSkill(addForm: NgForm): void {
    document.getElementById('add-skill-form')?.click();
    this.perfilData.skills.push(<Skill>addForm.value);
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        Swal.fire(`${<Skill>addForm.value.habilidad}`, `${json.mensaje} `, 'success');
        this.getData();
        addForm.reset();
      }
    );
  }
  onUpdateSkill(skill: Skill): void {
    this.skillEdit = skill;
    this.perfilData.skills.splice(this.perfilData.skills.findIndex(id => id.id == skill.id), 1, skill);
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        Swal.fire(`${skill.habilidad}`, `${json.mensaje} `, 'success');
        this.getData();
      }
    );
  }

  onDeleteSkill(data: Skill): void {
    Swal.fire({
      title: 'Estas seguro de eliminar la Habilidad',
      text: data.habilidad,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfilData.skills = this.perfilData.skills.filter(
          item => item !== data
        );
        this.perfilService.update(this.perfilData).subscribe(
          {
            next: (response: void) => {
              Swal.fire(`${data.habilidad} eliminado`, 'Habilidad eliminada con exito !!', 'success');
              this.getData();
            }
          }
        );

      }
    })

  }
}
