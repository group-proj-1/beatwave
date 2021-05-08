function getRandom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function getToken() {
    const clientId = '7b1ddde2b4bd4ee182d6a36abe2a35cd';
    const clientSecret = '7774875a0e4c46feb89f46acd70dc278';
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
        .then(response => response.json())
        .then(data => {
            let category = "party";
            fetch(`https://api.spotify.com/v1/browse/categories/${category}/playlists?limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer  ' + data.access_token,
                },
            })
                .then(response => response.json())
                .then(data => {
                    let player = document.getElementById("songVariable");
                    console.log(data.playlists);

                    let randomPlaylist = getRandom(data.playlists.items);
                    let randomPlaylistId = randomPlaylist.id;
                    console.log(randomPlaylistId);
                    // get that playlist ID and push 10 songs into the playlist with fetch (data.tracks.id) use forEach
                    // the playlist id is a variable

                    player.src = `https://open.spotify.com/embed/playlist/${randomPlaylistId}`
                    console.log(data);
                });
            console.log(data);
        });
}
getToken();


// fetch('https://api.spotify.com/v1/users/{user_id}/playlists', {
//     method: 'POST',

// }


// select genre
// get x number of tracks
// POST method to make playlist

