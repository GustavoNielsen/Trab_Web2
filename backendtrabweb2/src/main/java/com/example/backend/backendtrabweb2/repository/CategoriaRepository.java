package com.example.backend.backendtrabweb2.repository;

import com.example.backend.backendtrabweb2.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    /**
     * Busca categorias ativas
     */
    List<Categoria> findByAtivoTrueOrderByNome();
    
    /**
     * Busca categoria por nome (case insensitive)
     */
    Optional<Categoria> findByNomeIgnoreCase(String nome);
    
    /**
     * Verifica se existe categoria com o nome (case insensitive) exceto pelo ID
     */
    boolean existsByNomeIgnoreCaseAndIdNot(String nome, Long id);
    
    /**
     * Verifica se existe categoria com o nome (case insensitive)
     */
    boolean existsByNomeIgnoreCase(String nome);
    
    /**
     * Busca todas as categorias ordenadas por nome
     */
    List<Categoria> findAllByOrderByNome();
    
    /**
     * Busca categorias por status ativo
     */
    List<Categoria> findByAtivoOrderByNome(Boolean ativo);
    
    /**
     * Conta quantas categorias estão ativas
     */
    long countByAtivoTrue();
    
    /**
     * Busca categorias que têm solicitações associadas
     */
    @Query("SELECT DISTINCT c FROM Categoria c " +
           "JOIN Solicitacao s ON s.categoria = c " +
           "WHERE c.ativo = true " +
           "ORDER BY c.nome")
    List<Categoria> findCategoriasComSolicitacoes();
}
