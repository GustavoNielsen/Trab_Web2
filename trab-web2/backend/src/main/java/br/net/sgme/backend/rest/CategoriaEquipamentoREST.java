package br.net.sgme.backend.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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

import br.net.sgme.backend.model.CategoriaEquipamento;

@CrossOrigin
@RestController
public class CategoriaEquipamentoREST {

    public static List<CategoriaEquipamento> categorias = new ArrayList<>();

    // -------------- CRUD CategoriaEquipamento ------------- //
    @GetMapping("/categorias")
    public List<CategoriaEquipamento> obterTodasCategorias() {
        return categorias;
    }

    @GetMapping("/categorias/{id}")
    public ResponseEntity<CategoriaEquipamento> obterCategoriaPorId(@PathVariable("id") int id) {
        CategoriaEquipamento categoria = categorias.stream()
                .filter(cat -> cat.getIdCategoria() == id)
                .findAny()
                .orElse(null);

        if (categoria == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(categoria);
        }
    }

    @PostMapping("/categorias")
    public ResponseEntity<CategoriaEquipamento> inserir(@RequestBody CategoriaEquipamento categoria) {
        // Verifica se o nome da categoria já existe
        CategoriaEquipamento cat = categorias.stream()
                .filter(c -> c.getNome().equalsIgnoreCase(categoria.getNome()))
                .findAny()
                .orElse(null);
        if (cat != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Atribui um novo ID à categoria
        cat = categorias.stream()
                .max(Comparator.comparing(CategoriaEquipamento::getIdCategoria))
                .orElse(null);

        if (cat == null) {
            categoria.setIdCategoria(1);
        } else {
            categoria.setIdCategoria(cat.getIdCategoria() + 1);
        }

        // Adiciona a nova categoria à lista
        categorias.add(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<CategoriaEquipamento> alterar(@PathVariable("id") int id, @RequestBody CategoriaEquipamento categoria) {
        // Busca a categoria pelo ID
        CategoriaEquipamento cat = categorias.stream()
                .filter(c -> c.getIdCategoria() == id)
                .findAny()
                .orElse(null);

        if (cat != null) {
            // Atualiza os atributos da categoria
            cat.setIdFuncionario(categoria.getIdFuncionario());
            cat.setNome(categoria.getNome());
            return ResponseEntity.ok(cat);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<CategoriaEquipamento> remover(@PathVariable("id") int id) {
        CategoriaEquipamento categoria = categorias.stream()
                .filter(c -> c.getIdCategoria() == id)
                .findAny()
                .orElse(null);

        if (categoria != null) {
            categorias.removeIf(c -> c.getIdCategoria() == id);
            return ResponseEntity.ok(categoria);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // ---------------------------------------- //
    static {
        // Categorias de teste
        categorias.add(new CategoriaEquipamento(1, 101, "Impressoras"));
        categorias.add(new CategoriaEquipamento(2, 102, "Monitores"));
        categorias.add(new CategoriaEquipamento(3, 103, "Notebooks"));
    }
}
