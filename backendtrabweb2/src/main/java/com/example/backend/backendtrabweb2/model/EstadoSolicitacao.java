package com.example.backend.backendtrabweb2.model;

public enum EstadoSolicitacao {
    ABERTA("Aberta", "Solicitação em aberto, aguardando orçamento"),
    ORCADA("Orçada", "Orçamento realizado, aguardando aprovação do cliente"),
    APROVADA("Aprovada", "Orçamento aprovado pelo cliente, aguardando manutenção"),
    REJEITADA("Rejeitada", "Orçamento rejeitado pelo cliente"),
    REDIRECIONADA("Redirecionada", "Manutenção redirecionada para outro funcionário"),
    ARRUMADA("Arrumada", "Equipamento arrumado, aguardando pagamento"),
    PAGA("Paga", "Serviço pago pelo cliente"),
    FINALIZADA("Finalizada", "Solicitação finalizada");

    private final String nome;
    private final String descricao;

    EstadoSolicitacao(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getCor() {
        switch (this) {
            case ABERTA: return "#808080"; // Cinza
            case ORCADA: return "#A52A2A"; // Marrom
            case REJEITADA: return "#FF0000"; // Vermelho
            case APROVADA: return "#FFFF00"; // Amarelo
            case REDIRECIONADA: return "#800080"; // Roxo
            case ARRUMADA: return "#0000FF"; // Azul
            case PAGA: return "#FFA500"; // Alaranjado
            case FINALIZADA: return "#008000"; // Verde
            default: return "#000000"; // Preto
        }
    }

    public boolean podeTransicionarPara(EstadoSolicitacao novoEstado) {
        switch (this) {
            case ABERTA:
                return novoEstado == ORCADA;
            case ORCADA:
                return novoEstado == APROVADA || novoEstado == REJEITADA;
            case APROVADA:
                return novoEstado == ARRUMADA || novoEstado == REDIRECIONADA;
            case REJEITADA:
                return novoEstado == APROVADA; // Resgatar serviço
            case REDIRECIONADA:
                return novoEstado == ARRUMADA || novoEstado == REDIRECIONADA;
            case ARRUMADA:
                return novoEstado == PAGA;
            case PAGA:
                return novoEstado == FINALIZADA;
            case FINALIZADA:
                return false; // Estado final
            default:
                return false;
        }
    }
}
