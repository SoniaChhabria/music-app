package com.example.musicapp.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="song")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@SecondaryTable(name = "playlistsongmapping", pkJoinColumns = @PrimaryKeyJoinColumn(name="songId"))
@SecondaryTable(name = "album", pkJoinColumns = @PrimaryKeyJoinColumn(name="albumId"))
public class Song {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)	
	private Long songId; 

	private String songName;
	private float duration;
	private String audioUrl;
	private String artistName;
	
	
	@Column(table="album")
	private String albumName;
	
	@Column(table="playlistsongmapping")
	private int playlistId;
	
	public int getPlaylistId() {
		return playlistId;
	}
	public void setPlaylistId(int playlistId) {
		this.playlistId = playlistId;
	}
	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	public String getAudioUrl() {
		return audioUrl;
	}
	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}
	private int albumId;

	public Long getSongId() {
		return songId;
	}
	public void setSongId(Long songId) {
		this.songId = songId;
	}
	public String getSongName() {
		return songName;
	}
	public void setSongName(String songName) {
		this.songName = songName;
	}
	public float getDuration() {
		return duration;
	}
	public void setDuration(float duration) {
		this.duration = duration;
	}
	public String getArtistName() {
		return artistName;
	}
	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}

	public int getAlbumId() {
		return albumId;
	}
	public void setAlbumId(int albumId) {
		this.albumId = albumId;
	}
	
}
