package server.usuario.cargos;

public enum cargos_usuario {
	CLIENTE(1),
	FUNCIONARIO(2);
	
	private int code;

	private cargos_usuario(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static cargos_usuario valueOf(int code) {
		for (cargos_usuario value : cargos_usuario.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Código PedidoStatus inválido!");
	}
}