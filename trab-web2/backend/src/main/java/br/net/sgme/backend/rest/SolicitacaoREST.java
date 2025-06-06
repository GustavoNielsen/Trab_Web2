package br.net.sgme.backend.rest;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.sgme.backend.model.HistoricoSolicitacao;
import br.net.sgme.backend.model.Orcamento;
import br.net.sgme.backend.model.Solicitacao;

@CrossOrigin
@RestController
public class SolicitacaoREST {

    public static List<Solicitacao> solicitacoes = new ArrayList<>();
    public static List<HistoricoSolicitacao> historicoSolicitacoes = new ArrayList<>();
    public static List<Orcamento> orcamentos = new ArrayList<>();

    // -------------- CRUD Solicitacao ------------- //
    // Lista todas as solicitacoes:
    @GetMapping("/solicitacoes")
    public List<Solicitacao> obterTodasSolicitacoes() {
        return solicitacoes;
    }

    // Recupera Solicitacoes pelo idCliente:
    @GetMapping("/solicitacoes/cliente/{idCliente}")
    public List<Solicitacao> obterSolicitacoesPorCliente(@PathVariable int idCliente) {
        return solicitacoes.stream()
                .filter(solicitacao -> solicitacao.getIdCliente() == idCliente)
                .collect(Collectors.toList());
    }

    // Função para recuperar todas as informações de uma solicitação por idSolicitacao
    @GetMapping("/solicitacoes/{idSolicitacao}")
    public Solicitacao obterSolicitacaoPorId(@PathVariable int idSolicitacao) {
        return solicitacoes.stream()
                .filter(solicitacao -> solicitacao.getIdSolicitacao() == idSolicitacao)
                .findFirst()
                .orElse(null); // Retorna null se a solicitação não for encontrada
    }

    // Função para recuperar o histórico completo de uma solicitação por idSolicitacao
    @GetMapping("/historico/{idSolicitacao}")
    public List<HistoricoSolicitacao> obterHistoricoPorIdSolicitacao(@PathVariable int idSolicitacao) {
        return historicoSolicitacoes.stream()
                .filter(historico -> historico.getIdSolicitacao() == idSolicitacao)
                .collect(Collectors.toList());
    }

    // Função para inserir historico de alteração
    @PostMapping("/historicoSolicitacoes")
    public ResponseEntity<HistoricoSolicitacao> inserir(@RequestBody HistoricoSolicitacao historicoSolicitacao) {
        // Atribui um novo ID ao histórico de solicitação
        HistoricoSolicitacao h = historicoSolicitacoes.stream()
                .max(Comparator.comparing(HistoricoSolicitacao::getIdHistorico))
                .orElse(null);

        if (h == null) {
            historicoSolicitacao.setIdHistorico(1);
        } else {
            historicoSolicitacao.setIdHistorico(h.getIdHistorico() + 1);
        }

        // Adiciona o novo histórico de solicitação à lista
        historicoSolicitacoes.add(historicoSolicitacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(historicoSolicitacao);
    }

    // Função para alterar status da solicitação 
    @PutMapping("/solicitacoes/{idSolicitacao}/status")
    public ResponseEntity<Solicitacao> alterarStatusSolicitacao(@PathVariable int idSolicitacao, @RequestBody String novoStatus) {
        // Encontra a solicitação pelo ID
        Solicitacao solicitacao = solicitacoes.stream()
                .filter(s -> s.getIdSolicitacao() == idSolicitacao)
                .findFirst()
                .orElse(null);
        if (solicitacao == null) {
            // Se a solicitação não for encontrada, retorna um erro 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        // Altera o status da solicitação
        solicitacao.setStatus(novoStatus);
        // Retorna a solicitação atualizada com status 200
        return ResponseEntity.status(HttpStatus.OK).body(solicitacao);
    }

    // Função para inserir nova solicitacao
    @PostMapping("/solicitacoes")
    public ResponseEntity<Solicitacao> inserirSolicitacao(@RequestBody Solicitacao solicitacao) {
        // Criação de um novo ID para a solicitação (incrementa o ID com base no maior valor já existente)
        Solicitacao ultimaSolicitacao = solicitacoes.stream()
                .max(Comparator.comparing(Solicitacao::getIdSolicitacao))
                .orElse(null);
        int novoId = (ultimaSolicitacao == null) ? 1 : ultimaSolicitacao.getIdSolicitacao() + 1;
        // Preenchendo os campos da solicitação com os dados fornecidos ou valores padrão
        solicitacao.setIdSolicitacao(novoId);
        solicitacao.setStatus("ABERTA"); // Status inicial
        solicitacao.setIdFuncionario(0); // idFuncionario vazio inicialmente
        solicitacao.setData(new Date()); // Data atual
        solicitacao.setHora(new Time(System.currentTimeMillis())); // Hora atual
        solicitacao.setMotivoRejeicao(null); // Motivo de rejeição vazio inicialmente
        // Adiciona a solicitação na lista
        solicitacoes.add(solicitacao);
        // Retorna a solicitação criada com status 201
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitacao);
    }

    // Função para obter o orçamento associado a uma solicitação específica
    @GetMapping("/solicitacoes/{idSolicitacao}/orcamento")
    public ResponseEntity<Orcamento> obterOrcamentoPorIdSolicitacao(@PathVariable int idSolicitacao) {
        // Busca o orçamento pela idSolicitacao
        Optional<Orcamento> orcamentoOptional = orcamentos.stream()
                .filter(o -> o.getIdSolicitacao() == idSolicitacao)
                .findFirst();
        // Se o orçamento for encontrado, retorna com status OK (200)
        if (orcamentoOptional.isPresent()) {
            return ResponseEntity.ok(orcamentoOptional.get());
        } else {
            // Caso o orçamento não seja encontrado, retorna status NOT FOUND (404)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    static {
        // Solicitações de teste
        solicitacoes.add(new Solicitacao(
                1, 101, 201, new Date(), new Time(System.currentTimeMillis()),
                "Notebook Dell", 1, "Não liga", "ABERTA", null));
        solicitacoes.add(new Solicitacao(
                2, 102, 202, new Date(), new Time(System.currentTimeMillis()),
                "Impressora HP", 2, "Erro de papel", "APROVADA", null));
        solicitacoes.add(new Solicitacao(
                4, 101, 202, new Date(), new Time(System.currentTimeMillis()),
                "Impressora HP", 2, "Erro toner", "APROVADA", null));
        solicitacoes.add(new Solicitacao(
                3, 103, 203, new Date(), new Time(System.currentTimeMillis()),
                "Monitor Samsung", 3, "Tela com listras", "FINALIZADA", "Reparo realizado com sucesso"));

        // Histórico de solicitações de teste
        historicoSolicitacoes.add(new HistoricoSolicitacao(
                1, 1, "ABERTA", new Date(), new Time(10, 30, 0),
                201, 202, "Solicitação recebida"));
        historicoSolicitacoes.add(new HistoricoSolicitacao(
                2, 1, "APROVADA", new Date(), new Time(12, 45, 0),
                202, 203, "Em andamento para análise"));
        historicoSolicitacoes.add(new HistoricoSolicitacao(
                3, 1, "FINALIZADA", new Date(), new Time(15, 0, 0),
                203, 204, "Problema resolvido"));

        // Orçamento teste
        orcamentos.add(new Orcamento(
                1, 2, 202, new Date(), new Time(System.currentTimeMillis()), 450.75f)); // Solicitação 2 - Impressora HP
        orcamentos.add(new Orcamento(
                2, 3, 203, new Date(), new Time(System.currentTimeMillis()), 300.00f)); // Solicitação 3 - Monitor Samsung

    }
}
