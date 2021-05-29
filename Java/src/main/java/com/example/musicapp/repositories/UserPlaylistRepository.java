package com.example.musicapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.musicapp.models.Album;
import com.example.musicapp.models.Playlist;
import com.example.musicapp.models.Song;

public interface UserPlaylistRepository extends JpaRepository<Playlist, Long> {

	List<Playlist> findByUserEmail(String userEmail);
	List<Song> findByUserEmailAndPlaylistId(String userEmail, int playlistId);
}
