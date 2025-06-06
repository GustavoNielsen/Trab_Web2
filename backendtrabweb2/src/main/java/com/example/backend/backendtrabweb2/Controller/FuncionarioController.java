package com.example.backend.backendtrabweb2.Controller;

import com.example.backend.backendtrabweb2.model.*;
import com.example.backend.backendtrabweb2.rest.*;

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
}
