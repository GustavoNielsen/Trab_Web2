package trab.exemple.com.crud.rest;

import trab.exemple.com.crud.model.*;
import trab.exemple.repository.PessoaRepository;
import trab.exemple.repository.UsuarioRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.cdi.JpaRepositoryExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController

public class UsuarioREST {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PessoaRepository pessoaRepository;

    public static List<Usuario> lista = new ArrayList<>();
    public static List<Pessoa> pessoas = new ArrayList<>();

    static { // Verificar esse método
        lista.add(
                new Usuario(1, "administr", "admin", "admin", "ADMIN"));
        lista.add(
                new Usuario(2, "gerent", "gerente", "gerente", "GERENTE"));
        lista.add(
                new Usuario(3, "funcion", "func", "func", "FUNC"));
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> obterTodosUsuarios() {
        List<Usuario> lista = usuarioRepository.findAll();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable("id") int id) {
        Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
        if (op.isPresent()) {
            return ResponseEntity.ok(op.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> inserir(@RequestBody Usuario usuario) {
        Optional<Usuario> op = usuarioRepository.findByLogin(usuario.getLogin());
        if (op.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
        } else {
            usuario.setId(-1); // para garantir que irá inserir
            Usuario novoUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        }
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> alterar(@PathVariable("id") int id,
            @RequestBody Usuario usuario) {

        Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
        if (op.isPresent()) {
            usuario.setId(id);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> remover(@PathVariable("id") int id) {

        Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
        if (op.isPresent()) {
            usuarioRepository.delete(op.get());
            return ResponseEntity.ok(op.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Login login) {
        Optional<Usuario> op = usuarioRepository.findByLoginAndSenha(
                login.getLogin(), login.getSenha());
        if (op.isPresent()) {
            return ResponseEntity.ok(op.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/pessoas")
    public ResponseEntity<List<Pessoa>> obterTodasPessoas() {
        List<Pessoa> listaa = pessoaRepository.findAll();
        return ResponseEntity.ok(listaa);
    }

    @GetMapping("/pessoas/{id}")
    public ResponseEntity<Pessoa> obterPessoaPorId(@PathVariable("id") int id) {
        Optional<Pessoa> op = pessoaRepository.findById(Integer.valueOf(id));
        if (op.isPresent()) {
            return ResponseEntity.ok(op.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/pessoas")
    public ResponseEntity<Pessoa> inserirPessoa(@RequestBody Pessoa pessoa) {
        Optional<Pessoa> op = pessoaRepository.findByName(pessoa.getName());
        if (op.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
        } else {
            pessoa.setId(-1); // para garantir que irá inserir
            pessoaRepository.save(pessoa);
            return ResponseEntity.status(HttpStatus.CREATED).body(pessoa);
        }
    }

    @PutMapping("/pessoas/id)")
    public ResponseEntity<Pessoa> alterar(@PathVariable("id") int id,
            @RequestBody Pessoa pessoa) {
        Optional<Pessoa> op = pessoaRepository.findById(Integer.valueOf(id));
        if (op.isPresent()) {
            pessoa.setId(id);
            pessoaRepository.save(pessoa);
            return ResponseEntity.ok(pessoa);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/pessoas/{id}")
    public ResponseEntity<Pessoa> removerPessoa(@PathVariable("id") int id) {
        Optional<Pessoa> op = pessoaRepository.findById(Integer.valueOf(id));
        if (op.isPresent()) {
            pessoaRepository.delete(op.get());
            return ResponseEntity.ok(op.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
