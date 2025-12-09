package com.example.pontoacessibilidade.controller;

import com.example.pontoacessibilidade.entity.PontoAcessibilidade;
import com.example.pontoacessibilidade.service.PontoAcessibilidadeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/pontos-acessibilidade")
@CrossOrigin(origins = "*")
public class PontoAcessibilidadeController {

    @Autowired
    PontoAcessibilidadeService service;

    @GetMapping
    public List<PontoAcessibilidade> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<?> buscarPorNome(@PathVariable String nome) {
        List<PontoAcessibilidade> lista = service.buscarPorNome(nome);

    if (lista.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            PontoAcessibilidade p = service.buscarPorId(id);
            return ResponseEntity.ok(p);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody PontoAcessibilidade ponto) {
        try {
            PontoAcessibilidade salvo = service.criar(ponto);
            return ResponseEntity.created(URI.create("/pontos-acessibilidade/" + salvo.getId())).body(salvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody PontoAcessibilidade ponto) {
        try {
            PontoAcessibilidade salvo = service.atualizar(id, ponto);
            return ResponseEntity.ok(salvo);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
