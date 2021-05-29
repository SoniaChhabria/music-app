package com.example.musicapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.musicapp.models.Album;
import com.example.musicapp.models.SongAlbumMapping;
import com.example.musicapp.repositories.SongRepository;

@Service
public class SongService {

	@Autowired
    private SongRepository songRepository;
    public List<Album> getAll() {
    return songRepository.findAll();
    }
}
