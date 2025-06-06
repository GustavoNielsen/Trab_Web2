package com.example.demo.controller;

import com.example.demo.model.Funcionario;
import com.example.demo.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    @Autowired private FuncionarioService svc;

    @PostMapping
    public ResponseEntity<Funcionario> criar(@RequestBody Funcionario f) {
        Funcionario criado = svc.criar(f);
        return ResponseEntity
            .created(URI.create("/api/funcionarios/" + criado.getId()))
            .body(criado);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Funcionario> porCpf(@PathVariable String cpf) {
        Funcionario f = svc.porCpf(cpf);
        return f != null
            ? ResponseEntity.ok(f)
            : ResponseEntity.notFound().build();
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<Funcionario> atualizar(
            @PathVariable String cpf,
            @RequestBody Funcionario fAtualizado) {

        Funcionario atualizado = svc.atualizar(cpf, fAtualizado);
        return atualizado != null
            ? ResponseEntity.ok(atualizado)
            : ResponseEntity.notFound().build();
    }

    // 5) REMOVER funcionário por CPF
    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> remover(@PathVariable String cpf) {
        boolean excluiu = svc.removerPorCpf(cpf);
        return excluiu
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}