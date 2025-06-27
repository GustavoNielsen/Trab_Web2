package com.example.backend.backendtrabweb2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "solicitacao")
public class Solicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Cliente é obrigatório")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @NotNull(message = "Categoria é obrigatória")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @NotBlank(message = "Descrição do equipamento é obrigatória")
    @Size(max = 500, message = "Descrição do equipamento deve ter no máximo 500 caracteres")
    @Column(name = "descricao_equipamento", nullable = false)
    private String descricaoEquipamento;

    @NotBlank(message = "Descrição do defeito é obrigatória")
    @Size(max = 1000, message = "Descrição do defeito deve ter no máximo 1000 caracteres")
    @Column(name = "descricao_defeito", nullable = false)
    private String descricaoDefeito;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoSolicitacao estado = EstadoSolicitacao.ABERTA;

    @Column(name = "data_solicitacao", nullable = false)
    private LocalDateTime dataSolicitacao;

    @DecimalMin(value = "0.0", inclusive = false, message = "Valor do orçamento deve ser maior que zero")
    @Column(name = "valor_orcamento", precision = 10, scale = 2)
    private BigDecimal valorOrcamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_orcamento_id")
    private Funcionario funcionarioOrcamento;

    @Column(name = "data_orcamento")
    private LocalDateTime dataOrcamento;

    @Size(max = 1000, message = "Motivo rejeição deve ter no máximo 1000 caracteres")
    @Column(name = "motivo_rejeicao")
    private String motivoRejeicao;

    @Column(name = "data_aprovacao")
    private LocalDateTime dataAprovacao;

    @Column(name = "data_rejeicao")
    private LocalDateTime dataRejeicao;

    @Size(max = 1000, message = "Descrição da manutenção deve ter no máximo 1000 caracteres")
    @Column(name = "descricao_manutencao")
    private String descricaoManutencao;

    @Size(max = 1000, message = "Orientações devem ter no máximo 1000 caracteres")
    @Column(name = "orientacoes_cliente")
    private String orientacoesCliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_manutencao_id")
    private Funcionario funcionarioManutencao;

    @Column(name = "data_manutencao")
    private LocalDateTime dataManutencao;

    @Column(name = "data_pagamento")
    private LocalDateTime dataPagamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_finalizacao_id")
    private Funcionario funcionarioFinalizacao;

    @Column(name = "data_finalizacao")
    private LocalDateTime dataFinalizacao;

    @OneToMany(mappedBy = "solicitacao", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HistoricoSolicitacao> historico = new ArrayList<>();

    // Constructors
    public Solicitacao() {
        this.dataSolicitacao = LocalDateTime.now();
    }

    public Solicitacao(Cliente cliente, Categoria categoria, String descricaoEquipamento, String descricaoDefeito) {
        this();
        this.cliente = cliente;
        this.categoria = categoria;
        this.descricaoEquipamento = descricaoEquipamento;
        this.descricaoDefeito = descricaoDefeito;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getDescricaoEquipamento() {
        return descricaoEquipamento;
    }

    public void setDescricaoEquipamento(String descricaoEquipamento) {
        this.descricaoEquipamento = descricaoEquipamento;
    }

    public String getDescricaoDefeito() {
        return descricaoDefeito;
    }

    public void setDescricaoDefeito(String descricaoDefeito) {
        this.descricaoDefeito = descricaoDefeito;
    }

    public EstadoSolicitacao getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitacao estado) {
        this.estado = estado;
    }

    public LocalDateTime getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(LocalDateTime dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public BigDecimal getValorOrcamento() {
        return valorOrcamento;
    }

    public void setValorOrcamento(BigDecimal valorOrcamento) {
        this.valorOrcamento = valorOrcamento;
    }

    public Funcionario getFuncionarioOrcamento() {
        return funcionarioOrcamento;
    }

    public void setFuncionarioOrcamento(Funcionario funcionarioOrcamento) {
        this.funcionarioOrcamento = funcionarioOrcamento;
    }

    public LocalDateTime getDataOrcamento() {
        return dataOrcamento;
    }

    public void setDataOrcamento(LocalDateTime dataOrcamento) {
        this.dataOrcamento = dataOrcamento;
    }

    public String getMotivoRejeicao() {
        return motivoRejeicao;
    }

    public void setMotivoRejeicao(String motivoRejeicao) {
        this.motivoRejeicao = motivoRejeicao;
    }

    public LocalDateTime getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(LocalDateTime dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public LocalDateTime getDataRejeicao() {
        return dataRejeicao;
    }

    public void setDataRejeicao(LocalDateTime dataRejeicao) {
        this.dataRejeicao = dataRejeicao;
    }

    public String getDescricaoManutencao() {
        return descricaoManutencao;
    }

    public void setDescricaoManutencao(String descricaoManutencao) {
        this.descricaoManutencao = descricaoManutencao;
    }

    public String getOrientacoesCliente() {
        return orientacoesCliente;
    }

    public void setOrientacoesCliente(String orientacoesCliente) {
        this.orientacoesCliente = orientacoesCliente;
    }

    public Funcionario getFuncionarioManutencao() {
        return funcionarioManutencao;
    }

    public void setFuncionarioManutencao(Funcionario funcionarioManutencao) {
        this.funcionarioManutencao = funcionarioManutencao;
    }

    public LocalDateTime getDataManutencao() {
        return dataManutencao;
    }

    public void setDataManutencao(LocalDateTime dataManutencao) {
        this.dataManutencao = dataManutencao;
    }

    public LocalDateTime getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDateTime dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public Funcionario getFuncionarioFinalizacao() {
        return funcionarioFinalizacao;
    }

    public void setFuncionarioFinalizacao(Funcionario funcionarioFinalizacao) {
        this.funcionarioFinalizacao = funcionarioFinalizacao;
    }

    public LocalDateTime getDataFinalizacao() {
        return dataFinalizacao;
    }

    public void setDataFinalizacao(LocalDateTime dataFinalizacao) {
        this.dataFinalizacao = dataFinalizacao;
    }

    public List<HistoricoSolicitacao> getHistorico() {
        return historico;
    }

    public void setHistorico(List<HistoricoSolicitacao> historico) {
        this.historico = historico;
    }

    // Métodos de conveniência
    public String getDescricaoEquipamentoLimitada() {
        if (descricaoEquipamento != null && descricaoEquipamento.length() > 30) {
            return descricaoEquipamento.substring(0, 30) + "...";
        }
        return descricaoEquipamento;
    }

    public boolean podeAprovar() {
        return estado == EstadoSolicitacao.ORCADA;
    }

    public boolean podeRejeitar() {
        return estado == EstadoSolicitacao.ORCADA;
    }

    public boolean podeResgatar() {
        return estado == EstadoSolicitacao.REJEITADA;
    }

    public boolean podePagar() {
        return estado == EstadoSolicitacao.ARRUMADA;
    }

    public boolean podeFazerOrcamento() {
        return estado == EstadoSolicitacao.ABERTA;
    }

    public boolean podeFazerManutencao() {
        return estado == EstadoSolicitacao.APROVADA || estado == EstadoSolicitacao.REDIRECIONADA;
    }

    public boolean podeFinalizar() {
        return estado == EstadoSolicitacao.PAGA;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Solicitacao)) return false;
        Solicitacao that = (Solicitacao) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Solicitacao{" +
                "id=" + id +
                ", descricaoEquipamento='" + descricaoEquipamento + '\'' +
                ", estado=" + estado +
                ", dataSolicitacao=" + dataSolicitacao +
                '}';
    }
}
