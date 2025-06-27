package com.example.backend.backendtrabweb2.repository;

import com.example.backend.backendtrabweb2.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    /**
     * Busca cliente por CPF
     */
    Optional<Cliente> findByCpf(String cpf);
    
    /**
     * Busca cliente por email
     */
    Optional<Cliente> findByEmail(String email);
    
    /**
     * Verifica se existe cliente com CPF
     */
    boolean existsByCpf(String cpf);
    
    /**
     * Verifica se existe cliente com email
     */
    boolean existsByEmail(String email);
    
    /**
     * Verifica se existe cliente com CPF exceto pelo ID
     */
    boolean existsByCpfAndIdNot(String cpf, Long id);
    
    /**
     * Verifica se existe cliente com email exceto pelo ID
     */
    boolean existsByEmailAndIdNot(String email, Long id);
    
    /**
     * Busca clientes ativos ordenados por nome
     */
    List<Cliente> findByAtivoTrueOrderByNome();
    
    /**
     * Busca todos os clientes ordenados por nome
     */
    List<Cliente> findAllByOrderByNome();
    
    /**
     * Busca clientes por nome contendo (case insensitive)
     */
    @Query("SELECT c FROM Cliente c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%')) ORDER BY c.nome")
    List<Cliente> findByNomeContainingIgnoreCase(@Param("nome") String nome);
    
    /**
     * Busca cliente para login (email e ativo)
     */
    @Query("SELECT c FROM Cliente c WHERE c.email = :email AND c.ativo = true")
    Optional<Cliente> findByEmailAndAtivoTrue(@Param("email") String email);
    
    /**
     * Conta quantos clientes estão ativos
     */
    long countByAtivoTrue();
}
