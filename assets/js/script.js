let playlistOptions = {
    Rain: "hiphop",
    Snow: "sleep",
    Mist: "country",
    Smoke: "mood",
    Haze: "latin",
    Dust: "toplists",
    Fog: "rock",
    Sand: "aapi_heritage_month",
    Dust: "rnb",
    Ash: "edm_dance",
    Squall: "indie_alt",
    Tornado: "chill",
    Clear: "party",
    Clouds: "sleep",
}

let button = document.querySelector('.button')
let inputValue = document.querySelector('.inputValue')
let cityName = document.querySelector('.cityName');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');

function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=imperial&appid=2acf688360ef2e4ae9e0ba6153c2285f')
        .then(response => response.json())
        .then(data => {
            let nameValue = data['name'];
            let tempValue = data['main']['temp'];
            let descValue = data['weather'][0]['main'];

            cityName.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
            console.log(descValue);
            getPlaylist();
            function getPlaylist() {
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
                        let weatherCondition = descValue;
                        let category = playlistOptions[weatherCondition] || "party";
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
                                console.log(category);
                                console.log(randomPlaylist);
                                console.log(randomPlaylistId);
                                player.src = `https://open.spotify.com/embed/playlist/${randomPlaylistId}`
                                console.log(data);
                            });
                        console.log(data);
                    });
            }
        });
}

function getRandom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

button.addEventListener('click', getWeather)
