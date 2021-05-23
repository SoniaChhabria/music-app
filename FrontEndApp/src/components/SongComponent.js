import React, { Component } from 'react';
import '../styles/song.css';
import Moment from 'moment';

import TabComponent from './TabComponent';
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
        // get list of songs
        console.log(" In Song Component!")
        console.log(this.props.userEmail, this.props.token)
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
            console.log(response)
            if(this.props.showAddedlist){
                console.log("Clicked add songs")
                this.getSongsNotInPlaylist(response)
            }
            else{
                if(this.props.showShuffledSongs){
                    console.log(" In shuffle ")
                    console.log(response)
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
                console.log("Clicked add songs")
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
        const {name, value} = event.target
        console.log(value)
        var filteredSongs = this.state.songs.filter(s => s.songName.toLowerCase().includes(value.toLowerCase()));
        if(filteredSongs){
            this.setState({
                filteredSongs: filteredSongs,
                searchText: value
            })
        }
        console.log(this.state.songs.filter(s => s.songName.includes(value)))
    }
    addSongsInPlaylist(playlistId, userEmail, songId){
        console.log(playlistId,userEmail,songId)
        var date = new Date();
        console.log(date.getDate);
        console.log(Moment(date).format("YYYY-MM-DD"))
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
            console.log("This")
            console.log(response)
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
                        /> 
                <button type="submit" onClick={this.searchSongs}><i className="fa fa-search"></i></button>
                </div>
                :""
               }
                <table className = "table table-striped">
                    {this.state.filteredSongs.length >0?
                    <thead>
                        <tr>
                            <th> Song Details</th>
                            <th> Duration</th>
                            {this.props.showAddedlist? <th>Add to Playlist</th>:""}
                        </tr>
                    </thead>
                    :""}
                    <tbody>
                    {this.state.filteredSongs.map(
                        song =>
                        <tr key={song.songId}> 
                            <td>                     
                            {song.songName}
                            <br/>
                            {song.artistName}
                            <br/>
                            {song.albumName}
                            </td>
                            <td>
                                {song.duration}
                            </td>
                            {this.props.showAddedlist?
                            <td>
                            {<a onClick={ () => this.addSongsInPlaylist(this.props.playlistId, this.props.userEmail, song.songId)}>Add</a>}
                        </td>
                        :""}
                        </tr>

                    )}
                    </tbody>
                </table> 
            </div>
            


        )
           

    }
}

export default SongComponent