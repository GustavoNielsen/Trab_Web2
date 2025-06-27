package com.example.backend.backendtrabweb2.service;

import com.example.backend.backendtrabweb2.model.Categoria;
import com.example.backend.backendtrabweb2.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    /**
     * Cria uma nova categoria
     */
    public Categoria criar(Categoria categoria) {
        validarCategoria(categoria);
        validarNomeUnico(categoria.getNome(), null);
        return categoriaRepository.save(categoria);
    }

    /**
     * Atualiza uma categoria existente
     */
    public Categoria atualizar(Long id, Categoria categoria) {
        validarCategoria(categoria);
        validarNomeUnico(categoria.getNome(), id);
        
        Categoria categoriaExistente = buscarPorId(id);
        categoriaExistente.setNome(categoria.getNome());
        
        return categoriaRepository.save(categoriaExistente);
    }

    /**
     * Remove uma categoria (desativação lógica)
     */
    public void remover(Long id) {
        Categoria categoria = buscarPorId(id);
        categoria.setAtivo(false);
        categoriaRepository.save(categoria);
    }

    /**
     * Ativa uma categoria
     */
    public Categoria ativar(Long id) {
        Categoria categoria = buscarPorId(id);
        categoria.setAtivo(true);
        return categoriaRepository.save(categoria);
    }

    /**
     * Busca categoria por ID
     */
    @Transactional(readOnly = true)
    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com ID: " + id));
    }

    /**
     * Busca categoria por nome
     */
    @Transactional(readOnly = true)
    public Optional<Categoria> buscarPorNome(String nome) {
        return categoriaRepository.findByNomeIgnoreCase(nome);
    }

    /**
     * Lista todas as categorias
     */
    @Transactional(readOnly = true)
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAllByOrderByNome();
    }

    /**
     * Lista apenas categorias ativas
     */
    @Transactional(readOnly = true)
    public List<Categoria> listarAtivas() {
        return categoriaRepository.findByAtivoTrueOrderByNome();
    }

    /**
     * Lista categorias por status
     */
    @Transactional(readOnly = true)
    public List<Categoria> listarPorStatus(Boolean ativo) {
        return categoriaRepository.findByAtivoOrderByNome(ativo);
    }

    /**
     * Lista categorias que têm solicitações
     */
    @Transactional(readOnly = true)
    public List<Categoria> listarCategoriasComSolicitacoes() {
        return categoriaRepository.findCategoriasComSolicitacoes();
    }

    /**
     * Conta categorias ativas
     */
    @Transactional(readOnly = true)
    public long contarAtivas() {
        return categoriaRepository.countByAtivoTrue();
    }

    /**
     * Verifica se categoria existe
     */
    @Transactional(readOnly = true)
    public boolean existe(Long id) {
        return categoriaRepository.existsById(id);
    }

    /**
     * Verifica se nome já existe
     */
    @Transactional(readOnly = true)
    public boolean nomeJaExiste(String nome) {
        return categoriaRepository.existsByNomeIgnoreCase(nome);
    }

    /**
     * Valida dados da categoria
     */
    private void validarCategoria(Categoria categoria) {
        if (categoria == null) {
            throw new IllegalArgumentException("Categoria não pode ser nula");
        }
        if (categoria.getNome() == null || categoria.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Nome da categoria é obrigatório");
        }
        if (categoria.getNome().length() > 100) {
            throw new IllegalArgumentException("Nome da categoria deve ter no máximo 100 caracteres");
        }
    }

    /**
     * Valida se o nome é único
     */
    private void validarNomeUnico(String nome, Long id) {
        if (id == null) {
            // Criação - verificar se nome já existe
            if (categoriaRepository.existsByNomeIgnoreCase(nome)) {
                throw new IllegalArgumentException("Já existe uma categoria com o nome: " + nome);
            }
        } else {
            // Atualização - verificar se nome já existe em outra categoria
            if (categoriaRepository.existsByNomeIgnoreCaseAndIdNot(nome, id)) {
                throw new IllegalArgumentException("Já existe uma categoria com o nome: " + nome);
            }
        }
    }
}
