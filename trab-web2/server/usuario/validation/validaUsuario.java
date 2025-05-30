package server.usuario.validation;

import server.usuario.entity.usuario;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class validaUsuario {

    // Regex simples para validação básica de e-mail
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
            "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    /**
     * Valida um objeto usuario.
     *
     * @param usuario O objeto usuario a ser validado.
     * @return Uma lista de mensagens de erro. Se a lista estiver vazia, o usuário é válido.
     */
    public static List<String> validar(usuario usuario) {
        List<String> erros = new ArrayList<>();

        if (usuario == null) {
            erros.add("Objeto usuário não pode ser nulo.");
            return erros; // Retorna imediatamente se o objeto for nulo
        }

        // Validação do Nome
        if (usuario.getNome() == null || usuario.getNome().trim().isEmpty()) {
            erros.add("Nome é obrigatório.");
        }

        // Validação do Email
        if (usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
            erros.add("Email é obrigatório.");
        } else if (!EMAIL_PATTERN.matcher(usuario.getEmail()).matches()) {
            erros.add("Formato de email inválido.");
        }

        // Validação da Senha
        if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            // Nota: A validação de senha geralmente deve ser mais robusta (comprimento, caracteres especiais, etc.)
            // Aqui, verificamos apenas se não está vazia.
            erros.add("Senha é obrigatória.");
        }

        // Validação do CPF
        if (usuario.getCpf() == null || usuario.getCpf().trim().isEmpty()) {
            erros.add("CPF é obrigatório.");
            // Nota: Uma validação real de CPF envolveria verificar o formato e os dígitos verificadores.
        }

        // Validação do Endereço
        if (usuario.getEndereco() == null || usuario.getEndereco().trim().isEmpty()) {
            erros.add("Endereço é obrigatório.");
        }

        // Validação do Telefone
        if (usuario.getTelefone() == null || usuario.getTelefone().trim().isEmpty()) {
            erros.add("Telefone é obrigatório.");
            // Nota: Uma validação real de telefone pode verificar o formato.
        }

        // Validação do Perfil
        try {
            if (usuario.getPerfil() == null) {
                erros.add("Perfil é obrigatório.");
            }
        } catch (IllegalArgumentException e) {
             // Ocorre se o 'Integer perfil' interno tiver um valor que não corresponde a nenhum enum em cargos_usuario
            erros.add("Código de perfil inválido.");
        } catch (NullPointerException e) {
            // Ocorre se o 'Integer perfil' interno for null
             erros.add("Perfil é obrigatório (não definido).");
        }


        return erros;
    }

    // Método auxiliar para verificar strings nulas ou vazias (após remover espaços)
    private static boolean isNullOrBlank(String str) {
        return str == null || str.trim().isEmpty();
    }
}


