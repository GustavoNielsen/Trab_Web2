package com.example.demo.controller;

import com.example.demo.model.Solicitacao;
import com.example.demo.service.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {
    @Autowired private SolicitacaoService svc;

    @PostMapping
    public ResponseEntity<Solicitacao> criar(@RequestBody Solicitacao s) {
        Solicitacao criado = svc.criar(s);
        return ResponseEntity
            .created(URI.create("/api/solicitacoes/" + criado.getId()))
            .body(criado);
    }

    @GetMapping("/cliente/{cpf}")
    public List<Solicitacao> listarPorCliente(@PathVariable String cpf) {
        return svc.listarPorCliente(cpf);
    }

    @PatchMapping("/{id}/orcamento")
    public ResponseEntity<Void> orcamento(@PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        svc.registrarOrcamento(id, (double) body.get("valor"), (String) body.get("observacoes"));
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/pagamento")
    public ResponseEntity<Void> pagamento(@PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        svc.registrarPagamento(id, (double) body.get("valor"), (String) body.get("observacoes"));
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/resgatar")
    public ResponseEntity<Void> resgatar(@PathVariable Long id) {
        svc.resgatarServico(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/redirecionar")
    public ResponseEntity<Void> redirecionar(@PathVariable Long id,
            @RequestParam Long novoFuncionario) {
        svc.redirecionarManutencao(id, novoFuncionario);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<Void> finalizar(@PathVariable Long id) {
        svc.finalizarSolicitacao(id);
        return ResponseEntity.noContent().build();
    }
}
