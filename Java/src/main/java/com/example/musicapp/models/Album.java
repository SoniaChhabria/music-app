package com.example.musicapp.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

@Entity
@Table(name="album")
@SecondaryTable(name = "song", pkJoinColumns = @PrimaryKeyJoinColumn(name = "albumId", referencedColumnName="albumId"))
public class Album {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(table="album")
	private int albumId;
	
	@Column(table="album")
	private String albumName;
	
	@Column(table="song")
	private Long songId; 
	
	@Column(table="song")
	private String songName;
	
	@Column(table="song")
	private float duration;
	
	@Column(table="song")
	private String artistName;
	
	@Column(table="song")
	private String audioUrl;

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
	public String getAudioUrl() {
		return audioUrl;
	}
	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}
	public int getAlbumId() {
		return albumId;
	}
	public void setAlbumId(int albumId) {
		this.albumId = albumId;
	}
	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	
	
}
