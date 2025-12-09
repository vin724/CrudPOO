package com.example.pontoacessibilidade.repository;

import com.example.pontoacessibilidade.entity.PontoAcessibilidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PontoAcessibilidadeRepository extends JpaRepository<PontoAcessibilidade, Long> {

  List<PontoAcessibilidade> findByNomeLocal(String nomeLocal);
  
}


