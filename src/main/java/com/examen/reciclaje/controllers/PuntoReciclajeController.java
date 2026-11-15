package com.examen.reciclaje.controllers;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repositories.PuntoReciclajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173") 
public class PuntoReciclajeController {

    @Autowired
    private PuntoReciclajeRepository repository;

    @GetMapping
    public List<PuntoReciclaje> listarPuntos() {
        return repository.findAll();
    }

    @PostMapping
    public PuntoReciclaje guardarPunto(@RequestBody PuntoReciclaje punto) {
        return repository.save(punto);
    }
}