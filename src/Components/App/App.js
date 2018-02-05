import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import Spotify from '../../util/Spotify.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name:'', artist:'', album:''}],
      playlistName: '',
      playlistTracks: [{name:'', artist:'', album:''}]
      
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
 
  addTrack(track){
    if (this.state.playlistTracks.filter(index => index.id === track.id).length < 1) {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track]})
    }
  }
  removeTrack(track){
    let stateArray=this.state.playlistTracks;
    stateArray = stateArray.filter(tracks => tracks.id !== track.id);
    this.setState({ playlistTracks: stateArray})
  }
  updatePlaylistName(name){
    this.setState({playlistName: name})
  }
  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
      this.setState({
          searchResults: [],
          playListName: 'New Playlist',
          playlistTracks: []
      });
    });
  }
  search(searchTerm){
    console.log(this.state.searchResults);
    Spotify.search(searchTerm).then(searchResult => {
      this.setState({searchResults: searchResult});
    });
  }
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
  <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
     <SearchResults searchResults={this.state.searchResults}/>
      <PlayList playlistName={this.state.playlistName}playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.state.updatePlaylistName}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
