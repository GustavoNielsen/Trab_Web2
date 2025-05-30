package br.com.web2.apitrabweb2.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.web2.apitrabweb2.model.Login;
import br.com.web2.apitrabweb2.model.Usuario;

public class UsuarioREST {

    public static List<Usuario> lista = new ArrayList<>();

    static {
        lista.add(new Usuario(1, "administer", "admin", "admin", "ADMIN"));
        lista.add(new Usuario(2, "funcion", "func", "func", "FUNC"));
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
        Usuario u = lista.stream().filter(usu -> usu.getLogin().equals(usuario.getLogin())).findAny().orElse(null);

        if (u != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        u = lista.stream().max(Comparator.comparing(Usuario::getId)).orElse(null);

        if (u == null)
            usuario.setId(1);
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
            u.setLogin(usuario.getLogin());
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
        Usuario usuario = lista.stream().filter(usu -> usu.getLogin().equals(login.getLogin()) && usu.getSenha().equals(login.getSenha())).findAny().orElse(null);
        if (usuario == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        else
            return ResponseEntity.ok(usuario);
    }
}
