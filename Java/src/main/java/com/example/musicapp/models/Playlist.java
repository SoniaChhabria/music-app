package com.example.musicapp.models;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

@Entity
@IdClass(PlaylistID.class)
@Table(name="playlist")
@SecondaryTable(name = "playlistsongmapping", pkJoinColumns = {
        @PrimaryKeyJoinColumn(name="userEmail"),
        @PrimaryKeyJoinColumn(name="playlistId")})
public class Playlist {

	@Id
	//@Column(name="user_email", nullable = false)
	private String userEmail;
	@Id	
	//@Column(name="playlist_id",nullable = false)
	private int playlistId;

	private String playlistName;
	private Date createdDate;
	/*
	private int songId;
	
	@Column(table="playlistsongmapping")
	private Date createdDate;
	
	public int getSongId() {
		return songId;
	}
	public void setSongId(int songId) {
		this.songId = songId;
	}
	public Date getAddedDate() {
		return addedDate;
	}
	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}
	
    */
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public int getPlaylistId() {
		return playlistId;
	}
	public void setPlaylistId(int playlistId) {
		this.playlistId = playlistId;
	}
	public String getPlaylistName() {
		return playlistName;
	}
	public void setPlaylistName(String playlistName) {
		this.playlistName = playlistName;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	
}

class PlaylistID implements Serializable {
	String userEmail;
	int playlistId;
}
