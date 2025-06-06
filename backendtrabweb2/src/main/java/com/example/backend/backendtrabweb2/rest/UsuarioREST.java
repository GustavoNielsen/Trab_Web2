package com.example.backend.backendtrabweb2.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.backendtrabweb2.model.Cargos_usuario;
import com.example.backend.backendtrabweb2.model.Login;
import com.example.backend.backendtrabweb2.model.Usuario;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class UsuarioREST {
    public static List<Usuario> lista = new ArrayList<>();

    static {
        lista.add(new Usuario(1L, "Endereco XV", "1234", "joao@gmail.com", "João", "11111111111", "4136210493", Cargos_usuario.CLIENTE ));
		lista.add(new Usuario(2L, "Endereco XX", "1235", "jose@gmail.com", "José", "11111111112", "4136210494", Cargos_usuario.CLIENTE));
		lista.add(new Usuario(3L, "Endereco XY", "1236", "joana@gmail.com", "Joana", "11111111113", "4136210495", Cargos_usuario.CLIENTE));
		lista.add(new Usuario(4L, "Endereco XY", "admin", "admin@email.com", "admin", "11111111110", "4136210493", Cargos_usuario.FUNCIONARIO));
    }

    @GetMapping("/usuarios")
    public List<Usuario> obterTodosUsuarios() {
        return lista;
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable("id") int id) {

        Usuario u = lista.stream().filter(usu -> usu.getId() == id).findAny().orElse(null);

        if (u == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.ok(u);
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> inserir(@RequestBody Usuario usuario) {
        Usuario u = lista.stream().filter(usu -> usu.getEmail().equals(usuario.getEmail())).findAny().orElse(null);

        if (u != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        u = lista.stream().max(Comparator.comparing(Usuario::getId)).orElse(null);

        if (u == null)
            usuario.setId(1L);
        else
            usuario.setId(u.getId() + 1);

        lista.add(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> alterar(@PathVariable("id") int id, @RequestBody Usuario usuario) {
        Usuario u = lista.stream().filter(usu -> usu.getId() == id).findAny().orElse(null);

        if (u != null) {
            u.setNome(usuario.getNome());
            u.setEmail(usuario.getEmail());
            u.setSenha(usuario.getSenha());
            u.setPerfil(usuario.getPerfil());
            return ResponseEntity.ok(u);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> remover(@PathVariable("id") int id) {
        Usuario usuario = lista.stream().filter(usu -> usu.getId() == id).findAny().orElse(null);

        if (usuario != null) {
            lista.removeIf(u -> u.getId() == id);
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Login login) {
        Usuario usuario = lista.stream().filter(usu -> usu.getEmail().equals(login.getLogin()) && usu.getSenha().equals(login.getSenha())).findAny().orElse(null);
        if (usuario == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        else
            return ResponseEntity.ok(usuario);
    }
}
