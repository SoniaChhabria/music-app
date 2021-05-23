package com.example.musicapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.musicapp.models.Album;
import com.example.musicapp.models.Playlist;
import com.example.musicapp.models.PlaylistSongMapping;
import com.example.musicapp.models.Song;

public interface UserPlaylistSongRepository extends JpaRepository<PlaylistSongMapping, Long> {

	List<PlaylistSongMapping> findByUserEmail(String userEmail);
	//List<PlaylistSongMapping> findByUserEmailAndPlaylistId(String userEmail, int playlistId);
	@Query(value = "SELECT S.song_id"
			+ "	,S.album_id"
			+ "	,S.song_name"
			+ "	,S.duration"
			+ "	,S.audio_url"
			+ "	,S.artist_name"
			+ " ,A.album_name"
			+ " ,PS.playlist_id"
			+ " FROM Song AS S INNER JOIN Album AS A ON S.album_id = A.album_id"
			+ "	INNER JOIN PlaylistSongMapping AS PS ON S.song_id = PS.song_id"
			+ " INNER JOIN Playlist AS P ON PS.playlist_id = P.playlist_id AND PS.user_email = P.user_email"
			+ " WHERE PS.user_email =:userEmail AND PS.playlist_id =:playlistId",
            nativeQuery = true)
	
	List<Object[]> findByUserEmailAndPlaylistId(@Param("userEmail") String userEmail,@Param("playlistId")int playlistId);
}
