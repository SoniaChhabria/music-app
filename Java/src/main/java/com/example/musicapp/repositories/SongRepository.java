package com.example.musicapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.musicapp.models.Album;
import com.example.musicapp.models.SongAlbumMapping;

@Repository
public interface SongRepository extends JpaRepository<Album, Long> {
	
	@Query(value = "SELECT S.song_id"
			+ "	,S.album_id"
			+ "	,S.song_name"
			+ "	,S.duration"
			+ "	,S.audio_url"
			+ "	,S.artist_name"
			+ " ,A.album_name"
			+ " FROM Song AS S INNER JOIN Album AS A ON S.album_id = A.album_id",
            nativeQuery = true)
	
    List<Album> findAll();

}
