package br.net.sgme.backend.model;

import java.sql.Time;
import java.util.Date;

public class Orcamento {

    private int idOrcamento;
    private int idSolicitacao;
    private int idFuncionario;
    private Date data;
    private Time hora;
    private Float valorOrcado;

    public Orcamento() {
    }

    public Orcamento(int idOrcamento, int idSolicitacao, int idFuncionario, Date data, Time hora, Float valorOrcado) {
        this.idOrcamento = idOrcamento;
        this.idSolicitacao = idSolicitacao;
        this.idFuncionario = idFuncionario;
        this.data = data;
        this.hora = hora;
        this.valorOrcado = valorOrcado;
    }

    public int getIdOrcamento() {
        return idOrcamento;
    }

    public void setIdOrcamento(int idOrcamento) {
        this.idOrcamento = idOrcamento;
    }

    public int getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(int idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public int getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(int idFuncionario) {
        this.idFuncionario = idFuncionario;
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

    public Float getValorOrcado() {
        return valorOrcado;
    }

    public void setValorOrcado(Float valorOrcado) {
        this.valorOrcado = valorOrcado;
    }
}
