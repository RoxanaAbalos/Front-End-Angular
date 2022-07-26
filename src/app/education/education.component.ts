import { Component, OnInit } from '@angular/core';
import { Education } from '../models/education';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  formacionData: Perfil=new Perfil();
  constructor(private perfilService:PerfilService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.perfilService.getPerfil().subscribe(
      formacionData => this.formacionData = formacionData
    );
    
  }
  onOpenModal(){

  }
  onDeleteSkill(){
    
  }

}
