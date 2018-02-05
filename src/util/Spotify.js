const clientId = "90b7a2ec4de3468d864d066b0f5de171";
const secret = 'dc03328ebc284c7bad816f4cf9fd5857';
const redirectURI = "http://kostas-jamming.surge.sh/";
let accessToken = '';
let Spotify = {
    getAccessToken(){
        if(accessToken) {
            return accessToken;
        }if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){
           let accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
           let  expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(search_term){
        let accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${search_term}`, {
            
                headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => { return response.json()})
        .then(json => {
            console.log(json);
            
            if(json.tracks.items){
                let track_array = json.tracks.items.map(track =>({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri 
                }));
                if(track_array!== undefined && track_array!== null){return track_array;}
            }
        });
    },

    savePlaylist(playlistName, trackURIs){
        if (!playlistName || !trackURIs) {
            return;
          }
          let playlistId = '';
        let accessToken = this.getAccessToken();
        let headers =  {Authorization: `Bearer ${accessToken}`};
        let usersId =  '';
        return fetch('https://api.spotify.com/v1/me', {
          headers: headers
        }).then(response => {
            return response.json()
        }).then(json => {
            usersId = json.id;
        }).then(() => {
            fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => {return response.json()
            }).then(json => {
                playlistId = json.id;
            }).then(() => {
                fetch(`https://api.spotify.com/v1/users/${usersId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                }).then(response => {return response.json()})
                .then(json =>{playlistId = json.id;})
            })
        })
    }
};
export default Spotify;