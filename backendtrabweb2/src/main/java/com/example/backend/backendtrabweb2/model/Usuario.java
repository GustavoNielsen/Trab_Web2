package com.example.backend.backendtrabweb2.model;

public class Usuario {
    
	private Long id;

	private String endereco;
	private String senha;
	private String email;
	private String nome;
	private String cpf;
	private String telefone;
	private Integer perfil;

	public Usuario() {
		
	}

	public Usuario(Long id, String endereco, String senha, String email, String nome, String cpf,
			String telefone, Cargos_usuario perfil) {
		this.id = id;
		this.endereco = endereco;
		this.senha = senha;
		this.email = email;
		this.nome = nome;
		this.cpf = cpf;
		this.telefone = telefone;
		setPerfil(perfil);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Cargos_usuario getPerfil() {
		return Cargos_usuario.valueOf(perfil);
	}

	public void setPerfil(Cargos_usuario perfil) {
		if(perfil != null) {
			this.perfil = perfil.getCode();
		}
	}    
}
