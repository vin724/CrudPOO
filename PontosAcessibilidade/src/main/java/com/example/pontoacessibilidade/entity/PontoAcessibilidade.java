package com.example.pontoacessibilidade.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pontoacessibilidade")
public class PontoAcessibilidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeLocal;
    private String endereco;
    private String tipoLocal;

    private boolean temRampa;
    private boolean temBanheiroAdaptado;
    private boolean temVagaPCD;
    private boolean possuiObstaculos;

    private String acessibilidadeGeral;
    private String descricao;

    @Transient
    private Integer indiceAcessibilidade;
}
