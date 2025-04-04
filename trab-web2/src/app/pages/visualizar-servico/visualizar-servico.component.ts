import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-servico',
  imports: [],
  templateUrl: './visualizar-servico.component.html',
  styleUrl: './visualizar-servico.component.css'
})
export class VisualizarServicoComponent {
  valorServico: string = '1000000';

  

  aprovarServico() {
    Swal.fire({
      title: 'Serviço Aprovado!',
      text: 'Serviço Aprovado no Valor R$ ' + this.valorServico,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('funfou');
    //    this.router.navigate(['']);//colocar rota
      }
    });
  }
}

