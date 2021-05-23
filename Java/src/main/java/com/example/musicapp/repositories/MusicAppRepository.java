package com.example.musicapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.musicapp.models.Song;

public interface MusicAppRepository extends JpaRepository<Song, Long> {

}
