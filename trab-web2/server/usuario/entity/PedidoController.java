package server.usuario.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import server.pedido.entity.Pedido; // Assumindo que a entidade Pedido existe aqui
import server.pedido.service.PedidoService; // Assumindo que o PedidoService existe aqui

import java.util.List;

@RestController
@RequestMapping("/pedidos") // Define o caminho base para todos os endpoints deste controller
public class PedidoController {

    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        // Nota: Idealmente, você receberia um PedidoDTO e o converteria para a entidade Pedido no Service.
        Pedido novoPedido = pedidoService.criarPedido(pedido);
        return new ResponseEntity<>(novoPedido, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listarTodosPedidos() {
        List<Pedido> pedidos = pedidoService.listarTodos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedidoPorId(@PathVariable Long id) {
        return pedidoService.buscarPorId(id)
                .map(ResponseEntity::ok) // Se encontrado, retorna 200 OK com o pedido
                .orElse(ResponseEntity.notFound().build()); // Se não encontrado, retorna 404 Not Found
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> atualizarPedido(@PathVariable Long id, @RequestBody Pedido pedidoDetalhes) {
        // Nota: Idealmente, você receberia um PedidoDTO.
        try {
            Pedido pedidoAtualizado = pedidoService.atualizarPedido(id, pedidoDetalhes);
            return ResponseEntity.ok(pedidoAtualizado);
        } catch (RuntimeException e) { // Captura uma exceção genérica se o pedido não for encontrado no service
            // Idealmente, o service lançaria uma exceção específica (ex: PedidoNaoEncontradoException)
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPedido(@PathVariable Long id) {
        try {
            pedidoService.deletarPedido(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        } catch (RuntimeException e) { // Similar à atualização, capturar exceção específica é melhor
            return ResponseEntity.notFound().build();
        }
    }
}

