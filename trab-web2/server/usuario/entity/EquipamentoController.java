package com.example.demo.controller;

import com.example.demo.model.Equipamento;
import com.example.demo.service.EquipamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/equipamentos")
public class EquipamentoController {

    @Autowired
    private EquipamentoService svc;


    @PostMapping
    public ResponseEntity<Equipamento> criar(@RequestBody Equipamento e) {
        Equipamento criado = svc.criar(e);
        // Supondo que 'categoria' seja a chave única:
        return ResponseEntity
            .created(URI.create("/api/equipamentos/" + criado.getCategoria()))
            .body(criado);
    }


    @GetMapping
    public ResponseEntity<List<Equipamento>> listarTodos() {
        List<Equipamento> lista = svc.listarTodos();
        return ResponseEntity.ok(lista);
    }


    @GetMapping("/{categoria}")
    public ResponseEntity<Equipamento> porCategoria(@PathVariable String categoria) {
        Equipamento e = svc.porCategoria(categoria);
        return e != null
            ? ResponseEntity.ok(e)
            : ResponseEntity.notFound().build();
    }

    @PutMapping("/{categoria}")
    public ResponseEntity<Equipamento> atualizar(
            @PathVariable String categoria,
            @RequestBody Equipamento eAtualizado) {

        Equipamento atualizado = svc.atualizar(categoria, eAtualizado);
        return atualizado != null
            ? ResponseEntity.ok(atualizado)
            : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{categoria}")
    public ResponseEntity<Void> remover(@PathVariable String categoria) {
        boolean excluiu = svc.removerPorCategoria(categoria);
        return excluiu
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}
