package br.net.sgme.backend.model;

import java.sql.Time;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"categoria"})  // Ignora o campo 'categoria' na serialização
public class Solicitacao {

    private int idSolicitacao;
    private int idCliente;
    private int idFuncionario;
    private Date data;
    private Time hora;
    private String descricaoEquipamento;
    @JsonProperty("idCategoria")
    private int idCategoria;
    private String descricaoDefeito;
    private String status;
    private String motivoRejeicao;

    public Solicitacao() {
    }

    // Para cadastro:
    public Solicitacao(int idCliente, String descricaoEquipamento, int idCategoria,
            String descricaoDefeito) {
        this.idCliente = idCliente;
        this.descricaoEquipamento = descricaoEquipamento;
        this.idCategoria = idCategoria;
        this.descricaoDefeito = descricaoDefeito;
    }

    // Para recuperacao da base:
    public Solicitacao(int idSolicitacao, int idCliente, int idFuncionario, Date data, Time hora,
            String descricaoEquipamento, int idCategoria, String descricaoDefeito,
            String status, String motivoRejeicao) {
        this.idSolicitacao = idSolicitacao;
        this.idCliente = idCliente;
        this.idFuncionario = idFuncionario;
        this.data = data;
        this.hora = hora;
        this.descricaoEquipamento = descricaoEquipamento;
        this.idCategoria = idCategoria;
        this.descricaoDefeito = descricaoDefeito;
        this.status = status;
        this.motivoRejeicao = motivoRejeicao;
    }

    public int getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(int idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
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

    public String getDescricaoEquipamento() {
        return descricaoEquipamento;
    }

    public void setDescricaoEquipamento(String descricaoEquipamento) {
        this.descricaoEquipamento = descricaoEquipamento;
    }

    public int getCategoria() {
        return idCategoria;
    }

    public void setCategoria(int idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getDescricaoDefeito() {
        return descricaoDefeito;
    }

    public void setDescricaoDefeito(String descricaoDefeito) {
        this.descricaoDefeito = descricaoDefeito;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMotivoRejeicao() {
        return motivoRejeicao;
    }

    public void setMotivoRejeicao(String motivoRejeicao) {
        this.motivoRejeicao = motivoRejeicao;
    }
}
