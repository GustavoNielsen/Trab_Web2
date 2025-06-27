package com.example.backend.backendtrabweb2.repository;

import com.example.backend.backendtrabweb2.model.EstadoSolicitacao;
import com.example.backend.backendtrabweb2.model.Funcionario;
import com.example.backend.backendtrabweb2.model.Solicitacao;
import com.example.backend.backendtrabweb2.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    
    /**
     * Busca solicitações do cliente ordenadas por data/hora crescente
     */
    List<Solicitacao> findByClienteOrderByDataSolicitacaoAsc(Cliente cliente);
    
    /**
     * Busca solicitações por estado ordenadas por data/hora crescente
     */
    List<Solicitacao> findByEstadoOrderByDataSolicitacaoAsc(EstadoSolicitacao estado);
    
    /**
     * Busca solicitações abertas (para funcionários)
     */
    List<Solicitacao> findByEstadoOrderByDataSolicitacaoAsc(EstadoSolicitacao estado);
    
    /**
     * Busca solicitações de hoje
     */
    @Query("SELECT s FROM Solicitacao s WHERE DATE(s.dataSolicitacao) = CURRENT_DATE ORDER BY s.dataSolicitacao ASC")
    List<Solicitacao> findSolicitacoesDeHoje();
    
    /**
     * Busca solicitações por período de datas
     */
    @Query("SELECT s FROM Solicitacao s WHERE s.dataSolicitacao BETWEEN :inicio AND :fim ORDER BY s.dataSolicitacao ASC")
    List<Solicitacao> findByDataSolicitacaoBetweenOrderByDataSolicitacaoAsc(
        @Param("inicio") LocalDateTime inicio, 
        @Param("fim") LocalDateTime fim
    );
    
    /**
     * Busca solicitações redirecionadas para um funcionário específico
     */
    @Query("SELECT s FROM Solicitacao s WHERE s.estado = 'REDIRECIONADA' AND " +
           "EXISTS (SELECT h FROM HistoricoSolicitacao h WHERE h.solicitacao = s AND " +
           "h.estadoAtual = 'REDIRECIONADA' AND h.funcionarioDestino = :funcionario) " +
           "ORDER BY s.dataSolicitacao ASC")
    List<Solicitacao> findSolicitacoesRedirecionadasPara(@Param("funcionario") Funcionario funcionario);
    
    /**
     * Busca solicitações que um funcionário pode visualizar
     */
    @Query("SELECT DISTINCT s FROM Solicitacao s LEFT JOIN HistoricoSolicitacao h ON h.solicitacao = s " +
           "WHERE (s.estado != 'REDIRECIONADA') OR " +
           "(s.estado = 'REDIRECIONADA' AND h.funcionarioDestino = :funcionario) " +
           "ORDER BY s.dataSolicitacao ASC")
    List<Solicitacao> findSolicitacoesVisiveisPara(@Param("funcionario") Funcionario funcionario);
    
    /**
     * Busca solicitações pagas (para relatório de receitas)
     */
    @Query("SELECT s FROM Solicitacao s WHERE s.estado IN ('PAGA', 'FINALIZADA') AND " +
           "s.dataPagamento BETWEEN :inicio AND :fim ORDER BY s.dataPagamento ASC")
    List<Solicitacao> findSolicitacoesPagasPorPeriodo(
        @Param("inicio") LocalDateTime inicio, 
        @Param("fim") LocalDateTime fim
    );
    
    /**
     * Busca solicitações pagas agrupadas por categoria
     */
    @Query("SELECT s FROM Solicitacao s WHERE s.estado IN ('PAGA', 'FINALIZADA') " +
           "ORDER BY s.categoria.nome, s.dataPagamento ASC")
    List<Solicitacao> findSolicitacoesPagasAgrupadasPorCategoria();
    
    /**
     * Relatório de receitas por período
     */
    @Query("SELECT s.dataPagamento, SUM(s.valorOrcamento) FROM Solicitacao s " +
           "WHERE s.estado IN ('PAGA', 'FINALIZADA') AND " +
           "s.dataPagamento BETWEEN :inicio AND :fim " +
           "GROUP BY DATE(s.dataPagamento) ORDER BY s.dataPagamento ASC")
    List<Object[]> findReceitasPorDia(
        @Param("inicio") LocalDateTime inicio, 
        @Param("fim") LocalDateTime fim
    );
    
    /**
     * Relatório de receitas por categoria
     */
    @Query("SELECT c.nome, SUM(s.valorOrcamento), COUNT(s) FROM Solicitacao s " +
           "JOIN s.categoria c WHERE s.estado IN ('PAGA', 'FINALIZADA') " +
           "GROUP BY c.id, c.nome ORDER BY SUM(s.valorOrcamento) DESC")
    List<Object[]> findReceitasPorCategoria();
    
    /**
     * Busca última solicitação do cliente
     */
    @Query("SELECT s FROM Solicitacao s WHERE s.cliente = :cliente " +
           "ORDER BY s.dataSolicitacao DESC")
    List<Solicitacao> findUltimaSolicitacaoDoCliente(@Param("cliente") Cliente cliente);
    
    /**
     * Conta solicitações por estado
     */
    long countByEstado(EstadoSolicitacao estado);
    
    /**
     * Busca solicitações por múltiplos estados
     */
    @Query("SELECT s FROM Solicitacao s WHERE s.estado IN :estados ORDER BY s.dataSolicitacao ASC")
    List<Solicitacao> findByEstadoInOrderByDataSolicitacaoAsc(@Param("estados") List<EstadoSolicitacao> estados);
}
