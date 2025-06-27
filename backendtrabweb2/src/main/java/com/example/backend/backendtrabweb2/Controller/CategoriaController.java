package com.example.backend.backendtrabweb2.Controller;

import com.example.backend.backendtrabweb2.model.Categoria;
import com.example.backend.backendtrabweb2.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    /**
     * RF017 - CRUD de Categoria: Criar categoria
     */
    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Categoria categoria) {
        try {
            Categoria categoriaCriada = categoriaService.criar(categoria);
            return ResponseEntity
                    .created(URI.create("/api/categorias/" + categoriaCriada.getId()))
                    .body(categoriaCriada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro interno do servidor: " + e.getMessage()));
        }
    }

    /**
     * RF017 - CRUD de Categoria: Listar todas as categorias
     */
    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodas() {
        List<Categoria> categorias = categoriaService.listarTodas();
        return ResponseEntity.ok(categorias);
    }

    /**
     * RF017 - CRUD de Categoria: Listar apenas categorias ativas
     */
    @GetMapping("/ativas")
    public ResponseEntity<List<Categoria>> listarAtivas() {
        List<Categoria> categorias = categoriaService.listarAtivas();
        return ResponseEntity.ok(categorias);
    }

    /**
     * RF017 - CRUD de Categoria: Buscar categoria por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Categoria categoria = categoriaService.buscarPorId(id);
            return ResponseEntity.ok(categoria);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * RF017 - CRUD de Categoria: Atualizar categoria
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody Categoria categoria) {
        try {
            Categoria categoriaAtualizada = categoriaService.atualizar(id, categoria);
            return ResponseEntity.ok(categoriaAtualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro interno do servidor: " + e.getMessage()));
        }
    }

    /**
     * RF017 - CRUD de Categoria: Remover categoria (desativação lógica)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        try {
            categoriaService.remover(id);
            return ResponseEntity.ok(Map.of("mensagem", "Categoria removida com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro interno do servidor: " + e.getMessage()));
        }
    }

    /**
     * RF017 - CRUD de Categoria: Ativar categoria
     */
    @PatchMapping("/{id}/ativar")
    public ResponseEntity<?> ativar(@PathVariable Long id) {
        try {
            Categoria categoria = categoriaService.ativar(id);
            return ResponseEntity.ok(categoria);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro interno do servidor: " + e.getMessage()));
        }
    }

    /**
     * Listar categorias por status
     */
    @GetMapping("/status/{ativo}")
    public ResponseEntity<List<Categoria>> listarPorStatus(@PathVariable Boolean ativo) {
        List<Categoria> categorias = categoriaService.listarPorStatus(ativo);
        return ResponseEntity.ok(categorias);
    }

    /**
     * Listar categorias que têm solicitações
     */
    @GetMapping("/com-solicitacoes")
    public ResponseEntity<List<Categoria>> listarCategoriasComSolicitacoes() {
        List<Categoria> categorias = categoriaService.listarCategoriasComSolicitacoes();
        return ResponseEntity.ok(categorias);
    }

    /**
     * Verificar se nome já existe
     */
    @GetMapping("/verificar-nome/{nome}")
    public ResponseEntity<Map<String, Boolean>> verificarNome(@PathVariable String nome) {
        boolean existe = categoriaService.nomeJaExiste(nome);
        return ResponseEntity.ok(Map.of("existe", existe));
    }

    /**
     * Contar categorias ativas
     */
    @GetMapping("/contar/ativas")
    public ResponseEntity<Map<String, Long>> contarAtivas() {
        long count = categoriaService.contarAtivas();
        return ResponseEntity.ok(Map.of("total", count));
    }
}
