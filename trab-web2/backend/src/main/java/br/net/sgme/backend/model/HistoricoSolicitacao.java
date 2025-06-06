package br.net.sgme.backend.model;

import java.sql.Time;
import java.util.Date;

public class HistoricoSolicitacao {

    private int idHistorico;
    private int idSolicitacao;
    private String status;
    private Date data;
    private Time hora;
    private int idFuncionarioOrigem;
    private int idFuncionarioDestino;
    private String descricaoAlteracao;

    public HistoricoSolicitacao() {
    }

    public HistoricoSolicitacao(int idHistorico, int idSolicitacao, String status, Date data, Time hora,
            int idFuncionarioOrigem, int idFuncionarioDestino, String descricaoAlteracao) {
        this.idHistorico = idHistorico;
        this.idSolicitacao = idSolicitacao;
        this.status = status;
        this.data = data;
        this.hora = hora;
        this.idFuncionarioOrigem = idFuncionarioOrigem;
        this.idFuncionarioDestino = idFuncionarioDestino;
        this.descricaoAlteracao = descricaoAlteracao;
    }

    public int getIdHistorico() {
        return idHistorico;
    }

    public void setIdHistorico(int idHistorico) {
        this.idHistorico = idHistorico;
    }

    public int getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(int idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Time getHora() {
        return hora;
    }

    public void setHora(Time hora) {
        this.hora = hora;
    }

    public int getIdFuncionarioOrigem() {
        return idFuncionarioOrigem;
    }

    public void setIdFuncionarioOrigem(int idFuncionarioOrigem) {
        this.idFuncionarioOrigem = idFuncionarioOrigem;
    }

    public int getIdFuncionarioDestino() {
        return idFuncionarioDestino;
    }

    public void setIdFuncionarioDestino(int idFuncionarioDestino) {
        this.idFuncionarioDestino = idFuncionarioDestino;
    }

    public String getDescricaoAlteracao() {
        return descricaoAlteracao;
    }

    public void setDescricaoAlteracao(String descricaoAlteracao) {
        this.descricaoAlteracao = descricaoAlteracao;
    }
}
