package br.net.sgme.backend.model;

public class CategoriaEquipamento {

    private int idCategoria;
    private int idFuncionario;
    private String nome;

    public CategoriaEquipamento() {
    }

    public CategoriaEquipamento(int idCategoria, int idFuncionario, String nome) {
        this.idCategoria = idCategoria;
        this.idFuncionario = idFuncionario;
        this.nome = nome;
    }

    public int getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(int idCategoria) {
        this.idCategoria = idCategoria;
    }

    public int getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(int idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
