package com.example.backend.backendtrabweb2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico_solicitacao")
public class HistoricoSolicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Solicitação é obrigatória")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitacao_id", nullable = false)
    private Solicitacao solicitacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_anterior")
    private EstadoSolicitacao estadoAnterior;

    @NotNull(message = "Estado atual é obrigatório")
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_atual", nullable = false)
    private EstadoSolicitacao estadoAtual;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_origem_id")
    private Funcionario funcionarioOrigem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_destino_id")
    private Funcionario funcionarioDestino;

    @NotNull(message = "Data/hora é obrigatória")
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    // Constructors
    public HistoricoSolicitacao() {
        this.dataHora = LocalDateTime.now();
    }

    public HistoricoSolicitacao(Solicitacao solicitacao, EstadoSolicitacao estadoAnterior, 
                               EstadoSolicitacao estadoAtual, String descricao, Funcionario funcionario) {
        this();
        this.solicitacao = solicitacao;
        this.estadoAnterior = estadoAnterior;
        this.estadoAtual = estadoAtual;
        this.descricao = descricao;
        this.funcionario = funcionario;
    }

    // Factory methods para diferentes tipos de histórico
    public static HistoricoSolicitacao criarSolicitacao(Solicitacao solicitacao, Cliente cliente) {
        return new HistoricoSolicitacao(
            solicitacao,
            null,
            EstadoSolicitacao.ABERTA,
            "Solicitação criada pelo cliente " + cliente.getNome(),
            null
        );
    }

    public static HistoricoSolicitacao orcamento(Solicitacao solicitacao, Funcionario funcionario) {
        return new HistoricoSolicitacao(
            solicitacao,
            EstadoSolicitacao.ABERTA,
            EstadoSolicitacao.ORCADA,
            "Orçamento realizado por " + funcionario.getNome(),
            funcionario
        );
    }

    public static HistoricoSolicitacao aprovacao(Solicitacao solicitacao, Cliente cliente) {
        return new HistoricoSolicitacao(
            solicitacao,
            EstadoSolicitacao.ORCADA,
            EstadoSolicitacao.APROVADA,
            "Orçamento aprovado pelo cliente " + cliente.getNome(),
            null
        );
    }

    public static HistoricoSolicitacao rejeicao(Solicitacao solicitacao, Cliente cliente, String motivo) {
        return new HistoricoSolicitacao(
            solicitacao,
            EstadoSolicitacao.ORCADA,
            EstadoSolicitacao.REJEITADA,
            "Orçamento rejeitado pelo cliente " + cliente.getNome() + ". Motivo: " + motivo,
            null
        );
    }

    public static HistoricoSolicitacao resgate(Solicitacao solicitacao, Cliente cliente) {
        return new HistoricoSolicitacao(
            solicitacao,
            EstadoSolicitacao.REJEITADA,
            EstadoSolicitacao.APROVADA,
            "Serviço resgatado pelo cliente " + cliente.getNome(),
            null
        );
    }

    public static HistoricoSolicitacao manutencao(Solicitacao solicitacao, Funcionario funcionario) {
        return new HistoricoSolicitacao(
            solicitacao,
            solicitacao.getEstado(),
            EstadoSolicitacao.ARRUMADA,
            "Manutenção realizada por " + funcionario.getNome(),
            funcionario
        );
    }

    public static HistoricoSolicitacao redirecionamento(Solicitacao solicitacao, 
                                                       Funcionario funcionarioOrigem, 
                                                       Funcionario funcionarioDestino) {
        HistoricoSolicitacao historico = new HistoricoSolicitacao(
            solicitacao,
            solicitacao.getEstado(),
            EstadoSolicitacao.REDIRECIONADA,
            "Manutenção redirecionada de " + funcionarioOrigem.getNome() + 
            " para " + funcionarioDestino.getNome(),
            funcionarioOrigem
        );
        historico.setFuncionarioOrigem(funcionarioOrigem);
        historico.setFuncionarioDestino(funcionarioDestino);
        return historico;
    }

    public static HistoricoSolicitacao pagamento(Solicitacao solicitacao, Cliente cliente) {
        return new HistoricoSolicitacao(
            solicitacao,
            EstadoSolicitacao.ARRUMADA,
            EstadoSolicitacao.PAGA,
            "Pagamento realizado pelo cliente " + cliente.getNome(),
            null
        );
    }

    public static HistoricoSolicitacao finalizacao(Solicitacao solicitacao, Funcionario funcionario) {
        return new HistoricoSolicitacao(
            solicitacao,
            EstadoSolicitacao.PAGA,
            EstadoSolicitacao.FINALIZADA,
            "Solicitação finalizada por " + funcionario.getNome(),
            funcionario
        );
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    public EstadoSolicitacao getEstadoAnterior() {
        return estadoAnterior;
    }

    public void setEstadoAnterior(EstadoSolicitacao estadoAnterior) {
        this.estadoAnterior = estadoAnterior;
    }

    public EstadoSolicitacao getEstadoAtual() {
        return estadoAtual;
    }

    public void setEstadoAtual(EstadoSolicitacao estadoAtual) {
        this.estadoAtual = estadoAtual;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Funcionario getFuncionarioOrigem() {
        return funcionarioOrigem;
    }

    public void setFuncionarioOrigem(Funcionario funcionarioOrigem) {
        this.funcionarioOrigem = funcionarioOrigem;
    }

    public Funcionario getFuncionarioDestino() {
        return funcionarioDestino;
    }

    public void setFuncionarioDestino(Funcionario funcionarioDestino) {
        this.funcionarioDestino = funcionarioDestino;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof HistoricoSolicitacao)) return false;
        HistoricoSolicitacao that = (HistoricoSolicitacao) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "HistoricoSolicitacao{" +
                "id=" + id +
                ", estadoAnterior=" + estadoAnterior +
                ", estadoAtual=" + estadoAtual +
                ", descricao='" + descricao + '\'' +
                ", dataHora=" + dataHora +
                '}';
    }
}
