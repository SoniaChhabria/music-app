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
            showAddSongs: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev){
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
        // else if(ev.target.id === "shuffle-song-list"){
        //     this.setState({
        //         showSongList : true,
        //         showPlaylist : false,
        //         showShuffledlist: true
        //     });
        // }
        // else if(ev.target.id === "add-songs"){
        //     this.props.updateShowSongFlag();
        //     this.setState({
        //         showSongList : true,
        //         showPlaylist : false,
        //         showAddSongs: true
        //     });
        // }
    }



    render(){
        return(
            this.props.showSongs?
            <div className="container">
                <button onClick={this.props.shuffleSongs} id="shuffle-song-list" type="button" className="btn btn-outline-secondary" style={{float:"right"}}>Shuffle Play</button>
                <button onClick={this.props.addSongs} id="add-songs" type="button" className="btn btn-outline-secondary" style={{float:"right"}}>Add Songs</button>
                {/* {this.state.showShuffledlist? <SongComponent showShuffledlist={this.state.showShuffledlist}/>: ""} */}
                {/* <SongComponent showAddedlist={false} playlistId={this.props.playlistId} userEmail={this.props.userEmail}/> */}
                {/* {this.state.showPlaylist? <PlaylistComponent/>: ""} */}
            </div>    
            :
            
            <div className="container">
                <button onClick={this.handleClick} id="song-list" type="button" className="btn btn-outline-secondary">All Songs</button>
                <button onClick={this.handleClick} id="playlist" type="button" className="btn btn-outline-secondary">Playlists</button>
                {this.state.showSongList? <SongComponent userEmail={this.props.userEmail} token={this.props.token}/>: ""}
                {this.state.showPlaylist? <PlaylistComponent userEmail={this.props.userEmail} token={this.props.token}/>: ""}
		    </div>
            
        )
    }
}

export default TabComponent;