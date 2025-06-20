package server.usuario.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import server.usuario.entity.Pedido;
import server.usuario.entity.cliente;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    
    List<Pedido> findByCliente(cliente cliente);
    
    
    @Query("SELECT p FROM Pedido p WHERE p.cliente.idCliente = :idCliente")
    List<Pedido> findByClienteId(@Param("idCliente") Long idCliente);
    
    
    List<Pedido> findByStatus(StatusPedido status);
    
    
    List<Pedido> findByDataPedidoBetween(LocalDateTime inicio, LocalDateTime fim);
    

    @Query("SELECT p FROM Pedido p WHERE DATE(p.dataPrevisaoEntrega) = DATE(:dataPrevisao)")
    List<Pedido> findByDataPrevisaoEntrega(@Param("dataPrevisao") LocalDateTime dataPrevisao);
    
    
    List<Pedido> findByTecnicoResponsavel(String tecnico);
    
    
    Long countByStatus(StatusPedido status);
    
    
    List<Pedido> findByEquipamentoContainingIgnoreCase(String equipamento);
}
