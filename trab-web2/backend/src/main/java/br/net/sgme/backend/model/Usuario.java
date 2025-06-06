package br.net.sgme.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id_usu")
    private int id;
    @Column(name = "cpf_usu")
    private String cpf;
    @Column(name = "nome_usu")
    private String nome;
    @Column(name = "email_usu")
    private String email;
    @Column(name = "telefone_usu")
    private String telefone;
    @Column(name = "cep_usu")
    private String cep;
    @Column(name = "endereco_usu")
    private String endereco;
    @Column(name = "numero_usu")
    private int numero;
    @Column(name = "bairro_usu")
    private String bairro;
    @Column(name = "cidade_usu")
    private String cidade;
    @Column(name = "estado_usu")
    private String estado;
    @Column(name = "senha_usu")
    private String senha;
    @Column(name = "perfil_usu")
    private int perfil;

    // Construtor sem parâmetros
    public Usuario() {
    }

    // Construtor com parâmetros
    public Usuario(int id, String cpf, String nome, String email,
            String telefone, String cep, String endereco, int numero,
            String bairro, String cidade, String estado, String senha, int perfil) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.senha = senha;
        this.perfil = perfil;
    }

    // Getter e Setter para id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter e Setter para cpf
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    // Getter e Setter para nome
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter e Setter para email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter e Setter para telefone
    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    // Getter e Setter para cep
    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    // Getter e Setter para endereco
    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    // Getter e Setter para numero
    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    // Getter e Setter para bairro
    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    // Getter e Setter para cidade
    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    // Getter e Setter para estado
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    // Getter e Setter para senha
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // Getter e Setter para perfil
    public int getPerfil() {
        return perfil;
    }

    public void setPerfil(int perfil) {
        this.perfil = perfil;
    }
}
