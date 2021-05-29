package com.example.musicapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.musicapp.models.Album;
import com.example.musicapp.models.Song;
import com.example.musicapp.models.SongAlbumMapping;
import com.example.musicapp.repositories.SongRepository;
import com.example.musicapp.services.SongService;

@CrossOrigin(origins = "http://localhost:3000")
/*@CrossOrigin(origins = "https://music-webapp-sc.herokuapp.com")*/
@RestController
@RequestMapping("/api/v1/song")
public class SongController {
	
	@Autowired
	SongRepository songRepository;
    
	
	@GetMapping
	public List<Album> list(){
		return songRepository.findAll();
	}
	

}
