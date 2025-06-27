package com.example.backend.backendtrabweb2.repository;

import com.example.backend.backendtrabweb2.model.HistoricoSolicitacao;
import com.example.backend.backendtrabweb2.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoSolicitacaoRepository extends JpaRepository<HistoricoSolicitacao, Long> {
    
    /**
     * Busca histórico de uma solicitação ordenado por data/hora
     */
    List<HistoricoSolicitacao> findBySolicitacaoOrderByDataHoraAsc(Solicitacao solicitacao);
    
    /**
     * Busca histórico de uma solicitação ordenado por data/hora (decrescente)
     */
    List<HistoricoSolicitacao> findBySolicitacaoOrderByDataHoraDesc(Solicitacao solicitacao);
    
    /**
     * Busca último registro de histórico de uma solicitação
     */
    @Query("SELECT h FROM HistoricoSolicitacao h WHERE h.solicitacao = :solicitacao " +
           "ORDER BY h.dataHora DESC")
    List<HistoricoSolicitacao> findUltimoHistoricoDaSolicitacao(@Param("solicitacao") Solicitacao solicitacao);
    
    /**
     * Busca histórico de redirecionamentos de uma solicitação
     */
    @Query("SELECT h FROM HistoricoSolicitacao h WHERE h.solicitacao = :solicitacao AND " +
           "h.funcionarioOrigem IS NOT NULL AND h.funcionarioDestino IS NOT NULL " +
           "ORDER BY h.dataHora ASC")
    List<HistoricoSolicitacao> findRedirecionamentosDaSolicitacao(@Param("solicitacao") Solicitacao solicitacao);
}
