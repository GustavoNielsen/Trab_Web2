package com.example.backend.backendtrabweb2.model;

public enum Cargos_usuario {
	CLIENTE(1),
	FUNCIONARIO(2);
	
	private int code;

	private Cargos_usuario(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static Cargos_usuario valueOf(int code) {
		for (Cargos_usuario value : Cargos_usuario.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Código PedidoStatus inválido!");
	}
}
