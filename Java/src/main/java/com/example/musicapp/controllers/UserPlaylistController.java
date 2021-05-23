package com.example.musicapp.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.musicapp.models.Album;
import com.example.musicapp.models.Playlist;
import com.example.musicapp.models.PlaylistSongMapping;
import com.example.musicapp.models.Song;
import com.example.musicapp.repositories.UserPlaylistRepository;
import com.example.musicapp.repositories.UserPlaylistSongRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/userplaylist")
public class UserPlaylistController {
	
	@Autowired
	UserPlaylistRepository userPlaylistRepository;
	
	@Autowired
	UserPlaylistSongRepository userPlaylistSongRepository;
	
	@GetMapping("/{userEmail}")
	public List<Playlist> getPlaylist(@PathVariable("userEmail") String userEmail){
		//returns user playlist
		return userPlaylistRepository.findByUserEmail(userEmail);
	}
	
	@GetMapping("/getSongs/{userEmail}")
	public List<PlaylistSongMapping> getSongsPlaylist(@PathVariable("userEmail") String userEmail){
		//returns user playlist
		return userPlaylistSongRepository.findByUserEmail(userEmail);
	}
	
	@PostMapping(path="/createPlaylist")
	@ResponseStatus(HttpStatus.OK)
	public void createPlaylist(@RequestBody Playlist playlist) {
		//creates a playlist
		userPlaylistRepository.save(playlist);
	}
	
	@PostMapping(path="/addSongsInPlaylist")
	@ResponseStatus(HttpStatus.OK)
	public void addSongsInPlaylist(@RequestBody PlaylistSongMapping playlistSongDetails) {
		// adds song in a playlist
		System.out.println(playlistSongDetails.getUserEmail());
		userPlaylistSongRepository.save(playlistSongDetails);
	}
	/*
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void createPlaylist(@RequestBody Playlist playlist) {
		//creates a playlist
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void addSongsInPlaylist(@RequestBody PlaylistSongMapping playlistSongDetails) {
		// adds song in a playlist
	}
	*/
	
	@GetMapping("/{userEmail}/{playlistId}")
	public List<HashMap<String,String>> getSongsInPlaylist(@PathVariable("playlistId") int playlistId, @PathVariable("userEmail") String userEmail){
		// get songs in playlist

		List<Object[]> result = userPlaylistSongRepository.findByUserEmailAndPlaylistId(userEmail,playlistId);
		List<HashMap<String,String>> hashMaps = new ArrayList<HashMap<String,String>>();
	       if(result != null && !result.isEmpty()){
	          
	          for (Object[] object : result) {
	        	  HashMap<String,String> map = new HashMap<String,String>();
	        	  map.put("songId" , object[0].toString());
	        	  map.put("albumId" , object[1].toString());
	        	  map.put("songName" , object[2].toString());
	        	  map.put("duration" , object[3].toString());
	        	  map.put("audioUrl" , object[4].toString());
	        	  map.put("artistName" , object[5].toString());
	        	  map.put("albumName" , object[6].toString());
	        	  map.put("playlistId" , object[7].toString());
	        	  hashMaps.add(map); 
	        	  
	          }

	       }
	       return hashMaps;

	}

}
