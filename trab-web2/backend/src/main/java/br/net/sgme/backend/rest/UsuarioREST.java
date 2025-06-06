package br.net.sgme.backend.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.net.sgme.backend.model.Login;
import br.net.sgme.backend.model.Usuario;
import br.net.sgme.backend.repository.UsuarioRepository;

@CrossOrigin
@RestController
public class UsuarioREST {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public static List<Usuario> usuarios = new ArrayList<>();

    // -------------- Crud Usuario ------------- //
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
        // Verifica se o e-mail já existe
/*        Usuario u = usuarios.stream().filter(
                usu -> usu.getEmail().equals(usuario.getEmail())).findAny().orElse(null);
        if (u != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Atribui um novo ID ao usuário
        u = usuarios.stream().max(Comparator.comparing(Usuario::getId)).orElse(null);
        if (u == null) {
            usuario.setId(1);
        } else {
            usuario.setId(u.getId() + 1);
        }

        // Adiciona o novo usuário à lista
        usuarios.add(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);  */
        Optional<Usuario> op = usuarioRepository.findByLogin(usuario.getEmail());
        if (op.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
        }
        else {
            usuario.setId(-1);
            usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        }
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> alterar(@PathVariable("id") int id, @RequestBody Usuario usuario) {
        // Busca o usuário pelo id
        Usuario u = usuarios.stream().filter(usu -> usu.getId() == id).findAny().orElse(null);

        if (u != null) {
            // Atualiza os atributos do usuário
            u.setCpf(usuario.getCpf());
            u.setNome(usuario.getNome());
            u.setEmail(usuario.getEmail());
            u.setTelefone(usuario.getTelefone());
            u.setEndereco(usuario.getEndereco());
            u.setCep(usuario.getCep());
            u.setNumero(usuario.getNumero());
            u.setBairro(usuario.getBairro());
            u.setCidade(usuario.getCidade());
            u.setEstado(usuario.getEstado());
            u.setSenha(usuario.getSenha());
            u.setPerfil(usuario.getPerfil());
            return ResponseEntity.ok(u);
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
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Login login) {
        Usuario usuario = usuarios.stream()
                .filter(usu -> usu.getEmail().equals(login.getEmail())
                && usu.getSenha().equals(login.getSenha()))
                .findAny().orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            return ResponseEntity.ok(usuario);
        }
    }

    // ---------------------------------------- //
    static {
        // Usuarios de teste com os novos atributos
        usuarios.add(
                new Usuario(1, "00000000000", "Administrador", "adm",
                        "00000000000", "00000-000", "Rua 0", 0,
                        "Bairro 0", "Cidade 0", "Estado 0", "adm", 3));
        usuarios.add(
                new Usuario(2, "12345678911", "Joaozinho", "joaozin@gmail.com",
                        "41910102021", "83420-000", "Rua sem nome", 1,
                        "Uberaba", "Cidade X", "Estado X", "1234", 1));
    }
}


//PostMapping(/login) e PutMapping(/usuarios/{id}) inalterados, precisa testar antes