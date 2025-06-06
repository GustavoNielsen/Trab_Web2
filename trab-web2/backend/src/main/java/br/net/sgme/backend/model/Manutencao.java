package br.net.sgme.backend.model;

import java.sql.Time;
import java.util.Date;

public class Manutencao {

    private int idManutencao;
    private int idSolicitacao;
    private int idFuncionario;
    private Date data;
    private Time hora;
    private String descricaoManutencao;
    private String orientacoesCliente;

    public Manutencao() {
    }

    public Manutencao(int idManutencao, int idSolicitacao, int idFuncionario, Date data, Time hora,
            String descricaoManutencao, String orientacoesCliente) {
        this.idManutencao = idManutencao;
        this.idSolicitacao = idSolicitacao;
        this.idFuncionario = idFuncionario;
        this.data = data;
        this.hora = hora;
        this.descricaoManutencao = descricaoManutencao;
        this.orientacoesCliente = orientacoesCliente;
    }

    public int getIdManutencao() {
        return idManutencao;
    }

    public void setIdManutencao(int idManutencao) {
        this.idManutencao = idManutencao;
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
}
