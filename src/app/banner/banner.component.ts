import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { URL_BACKEND } from '../config/config';
import { Perfil } from '../models/perfil';
import { ModalService } from '../services/modal.service';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  perfilData: Perfil = new Perfil();
  editPerfil: Perfil | undefined;
  perfilSelect: Perfil|undefined;
  urlBackend:string=URL_BACKEND;
  constructor(private perfilService: PerfilService,private modalService:ModalService) { }

  ngOnInit(): void {
    this.getData();
    this.modalService.notificarUpload.subscribe(
      perfilData=> this.perfilData=perfilData
   );
  }

  getData() {
    this.perfilService.getPerfil().subscribe(
      perfilData => this.perfilData = perfilData
    );
  }
  openModal(perfil:Perfil){
    console.log(perfil);
    this.perfilSelect = perfil;
    this.modalService.openModal();
 }


  public onOpenModal(mode: string, perfil?: Perfil): void {
    const container = document.getElementById('main-container-perfil');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editPerfil = perfil;
      button.setAttribute('data-target', '#editPersonModal');
    }
    container?.appendChild(button);
    button.click();
  }

  onUpdatePerson(perfil: Perfil): void {
    this.editPerfil = perfil
    this.perfilData.apellido = perfil.apellido;
    this.perfilData.nombre = perfil.nombre;
    this.perfilData.email = perfil.email;
    this.perfilData.telefono = perfil.telefono;
    this.perfilData.acerca = perfil.acerca;
    this.perfilService.update(this.perfilData).subscribe(
      json => {
        Swal.fire(`Perfil :${json.perfil.apellido}`, `${json.mensaje} `, 'success');
        console.log(json);
        this.getData();
      }
    );
  }

}
