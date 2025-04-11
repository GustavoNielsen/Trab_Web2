import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mostrar-orcamento',
  imports: [CommonModule, RouterOutlet, MostrarOrcamentoComponent],
  templateUrl: './mostrar-orcamento.component.html',
  styleUrl: './mostrar-orcamento.component.css'
})
export class MostrarOrcamentoComponent {
  valorServico: string = '150';//integrar com as outras funcionalidades
  aprovarServico() {
    Swal.fire({
      title: 'Serviço Aprovado!',
      text: 'Serviço Aprovado no Valor R$ ' + this.valorServico,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('funfou');
    //    this.router.navigate(['']);//colocar rota dps
      }
    });
  }

  rejeitarServico() {
    // motivo rejeição
    Swal.fire({
      title: 'Rejeitar Serviço',
      input: 'textarea',
      inputLabel: 'Motivo da rejeição',
      inputPlaceholder: 'Digite o motivo...',
      inputAttributes: {
        'aria-label': 'Digite o motivo da rejeição'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed && result.value) {
        const motivo = result.value;

        //confirmação da rejeição
        Swal.fire({
          title: 'Serviço Rejeitado',
          text: 'A solicitação foi marcada como REJEITADA.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
         // this.router.navigate(['']); //colocar rota depois 
        });
      }
    });
  }
}
