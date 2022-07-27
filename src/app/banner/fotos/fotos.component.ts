import { Component, Input, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { ModalService } from 'src/app/services/modal.service';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {
  @Input() perfil: Perfil;
  perfilData : Perfil|undefined;
  titulo: string = "Subir Foto"
  private fotoSelecionada: File;
  constructor(public perfilService: PerfilService ,public modalService:ModalService) { }

  ngOnInit(): void {
 
  }
 
  seleccionarFoto(event) {
    this.fotoSelecionada = event.target.files[0];
    if (this.fotoSelecionada.type.indexOf('image') < 0) {
      Swal.fire('Error: ', 'El archivo debe ser una foto o imagen', 'error');
      this.fotoSelecionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSelecionada) {
      Swal.fire('Error: ', 'Debe selecccionar una foto', 'error');
    } else {
      this.perfilService.subirFoto(this.fotoSelecionada, this.perfil.id).subscribe({
        next: (response: Perfil) => {
          this.perfil = response;
          Swal.fire('La foto se ha subido completamente!', 'La foto se ha subio con exito', 'success');
          this.modalService.notificarUpload.emit(this.perfil);
        }

      });
    }
  }
  cerrarModal() {
    this.modalService.closeModal();
    this.fotoSelecionada = null;
  }


}
