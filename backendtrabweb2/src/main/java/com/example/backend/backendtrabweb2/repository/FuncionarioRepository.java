package com.example.backend.backendtrabweb2.repository;

import com.example.backend.backendtrabweb2.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
    /**
     * Busca funcionário por email
     */
    Optional<Funcionario> findByEmail(String email);
    
    /**
     * Verifica se existe funcionário com email
     */
    boolean existsByEmail(String email);
    
    /**
     * Verifica se existe funcionário com email exceto pelo ID
     */
    boolean existsByEmailAndIdNot(String email, Long id);
    
    /**
     * Busca funcionários ativos ordenados por nome
     */
    List<Funcionario> findByAtivoTrueOrderByNome();
    
    /**
     * Busca todos os funcionários ordenados por nome
     */
    List<Funcionario> findAllByOrderByNome();
    
    /**
     * Busca funcionários por nome contendo (case insensitive)
     */
    @Query("SELECT f FROM Funcionario f WHERE LOWER(f.nome) LIKE LOWER(CONCAT('%', :nome, '%')) ORDER BY f.nome")
    List<Funcionario> findByNomeContainingIgnoreCase(@Param("nome") String nome);
    
    /**
     * Busca funcionário para login (email e ativo)
     */
    @Query("SELECT f FROM Funcionario f WHERE f.email = :email AND f.ativo = true")
    Optional<Funcionario> findByEmailAndAtivoTrue(@Param("email") String email);
    
    /**
     * Conta quantos funcionários estão ativos
     */
    long countByAtivoTrue();
    
    /**
     * Busca funcionários disponíveis para redirecionamento (ativos, exceto o próprio)
     */
    @Query("SELECT f FROM Funcionario f WHERE f.ativo = true AND f.id != :funcionarioId ORDER BY f.nome")
    List<Funcionario> findFuncionariosParaRedirecionamento(@Param("funcionarioId") Long funcionarioId);
}
