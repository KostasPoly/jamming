import React from 'react';
import './PlayList.css'
import TrackList from '../TrackList/TrackList';
class Playlist extends React.Component{
  constructor(){
    super();
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }
render(){
  return (
<div className="Playlist">
  <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
  );
}
}
export default Playlist;