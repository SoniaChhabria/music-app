import React, { Component } from 'react';
import '../styles/playlist.css';
import ModalComponent from './ModalComponent';
import Moment from 'moment';
import SongComponent from './SongComponent';
import TabComponent from './TabComponent';
import {baseURL} from '../config.js'
class PlaylistComponent extends Component{
    constructor(){
        super();
        this.state={
            show:false,
            playlistName:"",
            userPlaylist:[],
            showSongs: false,
            showPlaylist: true,
            userSongsInPlaylist:[],
            playlistId:"",
            showAddedlist: false,
            showShuffledSongs: false
        }
        this.handleSave = this.handleSave.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPlaylist = this.getPlaylist.bind(this);
        this.getSongsInPlaylist = this.getSongsInPlaylist.bind(this);
        this.addSongs = this.addSongs.bind(this);
        this.shuffleSongs = this.shuffleSongs.bind(this);
    }
    showModal(){
        this.setState({ 
            show: true
        });
    }
    hideModal = () => {
        this.setState({ show: false });
      };
    componentDidMount(){
        this.getPlaylist(this.props.userEmail)

    }
    getPlaylist(userEmail){
        //get playlist's created for logged-in user 
        fetch(baseURL+"api/v1/userplaylist/"+userEmail, {
        "method": "GET"
    })
  .then(response => response.json())
  .then(response => {
    this.setState({
        userPlaylist: response,
        playlistName:"",
        show: false
    })
  })
  .catch(err => { console.log(err); 
  });

    }
    handleSave() {
        //create a new playlist for logged-in user
        var date = new Date();
        var data = {
            "userEmail": this.props.userEmail, "playlistId" : this.state.userPlaylist.length + 1, "playlistName": this.state.playlistName, "createdDate": Moment(date).format("YYYY-MM-DD")
        }
        fetch(baseURL+"api/v1/userplaylist/createPlaylist", {
            "method": "POST",
            body:JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }

        })
      .then( () => {
        this.getPlaylist(this.props.userEmail)
      }

      )
      .catch(err => { console.log(err); 
      }); 
        
    }

    getSongsInPlaylist(playlistId, userEmail){

        this.setState({
            playlistId: playlistId,
            userEmail: userEmail,
            showSongs: true,
            showPlaylist: false
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        }) 
    }

    addSongs(){
        //set flags to add songs in playlist
        this.setState({
            showSongs: false,
            showAddedlist: true,
            showPlaylist: false
        })
    }

    shuffleSongs(){
        //set flags to shuffle songs 
        this.setState({
            showSongs:true,
            showShuffledSongs: true
        })
    }

    render(){

        const createPlaylist = this.state.show? "btn btn-outline-secondary create-playlist btn_clicked":"btn btn-outline-secondary create-playlist";
        return(
            <div>
            {this.state.showPlaylist?
            <div>

                {this.state.userPlaylist.map(playlist =>
                    <div className="card card-pointer" style={{margin:"30px", backgroundColor: "#efefef", padding:"30px"}} onClick={ () => this.getSongsInPlaylist(playlist.playlistId, this.props.userEmail)} key={"playlist_"+playlist.playlistId}>
                            <div className="card-body">
                            <div style={{display:"inline", float:"left", marginTop: "-9px"}}>{playlist.playlistName}</div>
                            <div style={{display:"inline", float:"right", marginTop: "-9px"}}>{playlist.createdDate}</div>
                            </div>
                    </div>
                )}


            <button onClick={this.showModal} type="button" className={createPlaylist}>Create Playlist</button>
            <ModalComponent show={this.state.show} handleClose={this.hideModal} handleSave={this.handleSave}>
                <div>
                <h1>Create a new Playlist</h1> 
                <hr/>
                Name: <input 
                        name="playlistName" 
                        type="text" 
                        value={this.state.playlistName} 
                        onChange={this.handleChange}
                        placeholder="MyMusic"
                        className="create-playlist-box"
                        /> 
                <br/>
                <br/>                  
                </div>
                </ModalComponent>
            </div>
            :""
                }

            {
            this.state.showSongs && this.state.showShuffledSongs?
            <div>
                <SongComponent userEmail={this.props.userEmail} playlistId={this.state.playlistId} showSongs={this.state.showSongs} showShuffledSongs={this.state.showShuffledSongs}/>            
            </div>
            :!this.state.showSongs && this.state.showAddedlist?
            <SongComponent userEmail={this.props.userEmail} playlistId={this.state.playlistId} showSongs={this.state.showSongs} showAddedlist={this.state.showAddedlist} />
            :
            this.state.showSongs?
            <div>
                <TabComponent showSongs={this.state.showSongs} playlistId={this.state.playlistId} userEmail={this.props.userEmail} addSongs={this.addSongs} shuffleSongs={this.shuffleSongs}/>
                <SongComponent userEmail={this.props.userEmail} playlistId={this.state.playlistId} showSongs={this.state.showSongs}/>
            </div>
            :""
    }
            </div>

        )
    }
       
}

export default PlaylistComponent;
