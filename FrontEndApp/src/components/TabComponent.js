import React, { Component } from 'react';
import '../styles/tab.css';
import SongComponent from './SongComponent';
import PlaylistComponent from './PlaylistComponent';
class TabComponent extends Component{
    constructor(props){
        super();
        this.state={
            showSongList : true,
            showPlaylist : false,
            showShuffledlist: false,
            showAddSongs: false,        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev){
        //check if Show All Song tab is clicked or Show Playlist is clicked and update flags 
        if(ev.target.id === "song-list"){            
            this.setState({
                showSongList : true,
                showPlaylist : false
            });
        } else if(ev.target.id === "playlist"){
            this.setState({
                showSongList : false,
                showPlaylist : true
            });
        }
    }



    render(){
        const songStyle = this.state.showSongList? "btn btn-outline-secondary btn_clicked":"btn"
        const playlistStyle = this.state.showPlaylist? "btn btn-outline-secondary btn_clicked":"btn btn-outline-secondary"
        return(
            this.props.showSongs?
            <div className="container">
                <button onClick={this.props.shuffleSongs} id="shuffle-song-list" type="button" className="btn btn-outline-secondary" style={{float:"right"}}>Shuffle Play</button>
                <button onClick={this.props.addSongs} id="add-songs" type="button" className="btn btn-outline-secondary" style={{float:"right"}}>Add Songs</button>
            </div>    
            :
            
            <div className="container">
                <button onClick={this.handleClick} id="song-list" type="button" className={songStyle}>All Songs</button>
                <button onClick={this.handleClick} id="playlist" type="button" className={playlistStyle}>Playlists</button>
                {this.state.showSongList? <SongComponent userEmail={this.props.userEmail} token={this.props.token}/>: ""}
                {this.state.showPlaylist? <PlaylistComponent userEmail={this.props.userEmail} token={this.props.token}/>: ""}
		    </div>
            
        )
    }
}

export default TabComponent;