package com.example.musicapp.controllers;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.example.musicapp.models.Playlist;
import com.example.musicapp.models.Song;
import com.example.musicapp.repositories.MusicAppRepository;

@RestController
@RequestMapping("/api/v1/musicapp")
public class MusicAppController {

	@Autowired
	private MusicAppRepository musicAppRepository;
	
	@GetMapping
	public List<Song> list(){
		//List<Song> songs = new ArrayList<>();
		return musicAppRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void createPlaylist(@RequestBody Playlist playlist) {
		
	}
	
	
	@GetMapping("/{id}")
	public  Song getPlaylist(@PathVariable("id") long id){
		//List<Playlist> playlist = new ArrayList<>();
		return musicAppRepository.getOne(id);
	}
	
	
	
}
