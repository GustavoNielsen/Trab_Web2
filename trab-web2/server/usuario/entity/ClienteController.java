package com.example.demo.controller;

import com.example.demo.model.Cliente;
import com.example.demo.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    @Autowired private ClienteService svc;

    @PostMapping
    public ResponseEntity<Cliente> criar(@RequestBody Cliente c) {
        Cliente criado = svc.criar(c);
        return ResponseEntity
            .created(URI.create("/api/clientes/" + criado.getId()))
            .body(criado);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Cliente> porCpf(@PathVariable String cpf) {
        Cliente c = svc.porCpf(cpf);
        return c != null
            ? ResponseEntity.ok(c)
            : ResponseEntity.notFound().build();
    }
}
