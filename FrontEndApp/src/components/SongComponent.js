import React, { Component } from 'react';
import '../styles/song.css';
import Moment from 'moment';
import { baseURL } from '../config';

class SongComponent extends Component{

    constructor(props){
        super();
        this.state={
            songs:[],
            searchText:"",
            filteredSongs:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.addSongsInPlaylist = this.addSongsInPlaylist.bind(this);
        this.getSongsNotInPlaylist = this.getSongsNotInPlaylist.bind(this);
    }


    componentDidMount(){
        // get list of songs or list of songs in user's playlist
        var url=""
        if(this.props.userEmail != null && this.props.playlistId != null ){
            url = baseURL+"api/v1/userplaylist/"+this.props.userEmail+"/"+this.props.playlistId
        }
        else{
            url = baseURL+"api/v1/song"
        }
        // let headers = new Headers();

        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // headers.append('Authorization', 'Bearer ' + this.props.token);
        // headers.append('Origin','http://localhost:3000');
        fetch(url, {
                "method": "GET",
                 "headers":{
                     'Authorization': 'Bearer ' + this.props.token
                //     //'Access-Control-Allow-Origin': "http://localhost:3000"
                 }
                }
        )
        .then(response => response.json())
        .then(response => {
            if(this.props.showAddedlist){
                // get songs that are not in playlist for user to add 
                this.getSongsNotInPlaylist(response)
            }
            else{
                if(this.props.showShuffledSongs){
                    // shuffle list of songs 
                    response = response.sort(function (a, b) {return Math.random() - 0.5;});
                    this.setState({
                        songs: response,
                        filteredSongs: response
                    })
                }
                else{  
                this.setState({
                    songs: response,
                    filteredSongs: response
                })
                }
            }

            

        })
        .catch(err => { console.log(err); 
        });
    }

    getSongsNotInPlaylist(response){
        fetch(baseURL+"api/v1/song", {
                    "method": "GET"
            })
            .then(songs => songs.json())
            .then(songs => {
                if(response.length >0){
                var resIds = response.map(res => res.songId)
                response = songs.filter(i => !resIds.includes(i.songId.toString()))
                this.setState({
                    songs: response,
                    filteredSongs: response
                })
                }
            else{
                this.setState({
                songs: songs,
                filteredSongs: songs
                })
            }
        })

    }

    handleChange(event){
        //for words typed by user, filter the list of songs and generate serach results
        const {value} = event.target
        var filteredSongs = this.state.songs.filter(s => s.songName.toLowerCase().includes(value.toLowerCase()));
        if(filteredSongs){
            this.setState({
                filteredSongs: filteredSongs,
                searchText: value
            })
        }
    }
    addSongsInPlaylist(playlistId, userEmail, songId){
        //call POST api to save songs in user playlist
        var date = new Date();
        var data = {
            "userEmail": userEmail, "playlistId" : playlistId, songId: songId ,"createdDate": Moment(date).format("YYYY-MM-DD")
        }
        fetch(baseURL+"api/v1/userplaylist/addSongsInPlaylist", {
            "method": "POST",
            body:JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }

        })
        .then( () => {fetch(baseURL+"api/v1/userplaylist/"+userEmail+"/"+playlistId, {
                "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            this.getSongsNotInPlaylist(response)
        })
    
        })        
        .catch(err => { console.log(err);})

        
    }

    
    render(){

        return(
           <div>
               {!this.props.showSongs?

               <div>
                <input 
                        name="search" 
                        type="text" 
                        value={this.state.searchText} 
                        onChange={this.handleChange}
                        placeholder="Search.."
                        className="search-box"
                        /> 
                </div>
                :""
               }
                <table className = "table">
                    <tbody>
                    {this.state.filteredSongs.map(
                        song =>
                        <div className="card" style={{margin:"30px", backgroundColor: "#efefef", padding:"30px"}}>
                            <div className="card-body">
                            <div style={{float:"left", marginTop: "-9px"}}>{song.songName}</div>
                            <br/>
                            <div style={{float:"left", marginTop: "-9px"}}>{song.artistName}</div>
                            <br/>
                            <div style={{float:"left", marginTop: "-9px"}}>{song.albumName}</div>
                            {this.props.showAddedlist?
                            <a style={{display:"inline", float:"right", marginTop: "-9px", marginLeft: "70px" , cursor: "pointer"}} onClick={ () => this.addSongsInPlaylist(this.props.playlistId, this.props.userEmail, song.songId)}>
                            Add
                            </a>
                            :""
                            }
                            <div style={{display:"inline", float:"right", marginTop: "-9px"}}>{song.duration}</div>
                            
                            </div>
                        </div>
                        
                    )}
                    </tbody>
                </table> 
            </div>
            


        )
           

    }
}

export default SongComponent