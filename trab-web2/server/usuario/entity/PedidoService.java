package server.usuario.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import server.pedido.entity.Pedido;
import server.pedido.entity.Pedido.StatusPedido;
import server.pedido.repository.PedidoRepository;
import server.usuario.entity.cliente;
import server.usuario.repository.ClienteRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;

    @Autowired
    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public Pedido criarPedido(Pedido pedido) {
        validarPedido(pedido);
        
        // Se o pedido não tiver data, define a data atual
        if (pedido.getDataPedido() == null) {
            pedido.setDataPedido(LocalDateTime.now());
        }
        
        // Se o status não estiver definido, define como RECEBIDO
        if (pedido.getStatus() == null) {
            pedido.setStatus(StatusPedido.RECEBIDO);
        }
        
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> buscarPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    @Transactional
    public Pedido atualizarPedido(Long id, Pedido pedidoDetalhes) {
        Pedido pedidoExistente = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o ID: " + id));
        
        // Atualiza os campos do pedido existente com os novos valores
        if (pedidoDetalhes.getEquipamento() != null) {
            pedidoExistente.setEquipamento(pedidoDetalhes.getEquipamento());
        }
        
        if (pedidoDetalhes.getDescricaoProblema() != null) {
            pedidoExistente.setDescricaoProblema(pedidoDetalhes.getDescricaoProblema());
        }
        
        if (pedidoDetalhes.getObservacoesTecnicas() != null) {
            pedidoExistente.setObservacoesTecnicas(pedidoDetalhes.getObservacoesTecnicas());
        }
        
        if (pedidoDetalhes.getStatus() != null) {
            atualizarStatus(pedidoExistente, pedidoDetalhes.getStatus());
        }
        
        if (pedidoDetalhes.getValorOrcamento() != null) {
            pedidoExistente.setValorOrcamento(pedidoDetalhes.getValorOrcamento());
        }
        
        if (pedidoDetalhes.getValorFinal() != null) {
            pedidoExistente.setValorFinal(pedidoDetalhes.getValorFinal());
        }
        
        if (pedidoDetalhes.getDataPrevisaoEntrega() != null) {
            pedidoExistente.setDataPrevisaoEntrega(pedidoDetalhes.getDataPrevisaoEntrega());
        }
        
        if (pedidoDetalhes.getDataEntrega() != null) {
            pedidoExistente.setDataEntrega(pedidoDetalhes.getDataEntrega());
        }
        
        if (pedidoDetalhes.getTecnicoResponsavel() != null) {
            pedidoExistente.setTecnicoResponsavel(pedidoDetalhes.getTecnicoResponsavel());
        }
        
        // Se o cliente foi alterado, verifica se o novo cliente existe
        if (pedidoDetalhes.getCliente() != null && 
            !pedidoDetalhes.getCliente().getIdCliente().equals(pedidoExistente.getCliente().getIdCliente())) {
            
            cliente novoCliente = clienteRepository.findById(pedidoDetalhes.getCliente().getIdCliente())
                    .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
            
            pedidoExistente.setCliente(novoCliente);
        }
        
        return pedidoRepository.save(pedidoExistente);
    }

    private void atualizarStatus(Pedido pedido, StatusPedido novoStatus) {
        // Regras de transição de status podem ser implementadas aqui
        // Por exemplo, não permitir voltar de ENTREGUE para EM_MANUTENCAO
        
        // Exemplo de regra: ao marcar como ENTREGUE, registra a data de entrega
        if (novoStatus == StatusPedido.ENTREGUE && pedido.getStatus() != StatusPedido.ENTREGUE) {
            pedido.setDataEntrega(LocalDateTime.now());
        }
        
        pedido.setStatus(novoStatus);
    }

    @Transactional
    public void deletarPedido(Long id) {
        if (!pedidoRepository.existsById(id)) {
            throw new RuntimeException("Pedido não encontrado com o ID: " + id);
        }
        
        pedidoRepository.deleteById(id);
    }

    public List<Pedido> buscarPedidosPorCliente(Long idCliente) {
        return pedidoRepository.findByClienteId(idCliente);
    }

    public List<Pedido> buscarPedidosPorStatus(StatusPedido status) {
        return pedidoRepository.findByStatus(status);
    }

    @Transactional
    public Pedido registrarOrcamento(Long idPedido, BigDecimal valor, String observacoes, LocalDateTime dataPrevisao) {
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o ID: " + idPedido));
        
        pedido.setValorOrcamento(valor);
        pedido.setObservacoesTecnicas(observacoes);
        pedido.setDataPrevisaoEntrega(dataPrevisao);
        pedido.setStatus(StatusPedido.AGUARDANDO_APROVACAO);
        
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido aprovarOrcamento(Long idPedido) {
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o ID: " + idPedido));
        
        if (pedido.getStatus() != StatusPedido.AGUARDANDO_APROVACAO) {
            throw new IllegalStateException("Pedido não está aguardando aprovação");
        }
        
        pedido.setStatus(StatusPedido.APROVADO);
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido finalizarServico(Long idPedido, BigDecimal valorFinal, String observacoes) {
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o ID: " + idPedido));
        
        pedido.setValorFinal(valorFinal);
        pedido.setObservacoesTecnicas(observacoes);
        pedido.setStatus(StatusPedido.CONCLUIDO);
        
        return pedidoRepository.save(pedido);
    }

    private void validarPedido(Pedido pedido) {
        if (pedido == null) {
            throw new IllegalArgumentException("Pedido não pode ser nulo");
        }
        
        if (pedido.getCliente() == null || pedido.getCliente().getIdCliente() == null) {
            throw new IllegalArgumentException("Cliente é obrigatório");
        }
        
        // Verifica se o cliente existe
        clienteRepository.findById(pedido.getCliente().getIdCliente())
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        
        if (pedido.getEquipamento() == null || pedido.getEquipamento().trim().isEmpty()) {
            throw new IllegalArgumentException("Equipamento é obrigatório");
        }
    }
}
