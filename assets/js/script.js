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

// category ids:
// toplists
// hiphop
// pop
// country
// rock
// latin
// mood
// aapi_heritage_month
// rnb
// workout
// edm_dance
// indie_alt
// sleep
// chill
// inspiration
// equal
// focus
// decades
// party
// kids_family

function getRandom(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

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
            let weatherCondition = getWeather();
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
                    // get that playlist ID and push 10 songs into the playlist with fetch (data.tracks.id) use forEach
                    // the playlist id is a variable

                    player.src = `https://open.spotify.com/embed/playlist/${randomPlaylistId}`
                    console.log(data);
                });
            console.log(data);
        });
}
getPlaylist();


function getWeather() {
    let city = [];
    let weather = "";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=513558c8e04c7ce19dc87e69d4a6c2ab`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.weather[0].main);
        weather = data.weather[0].main;
      });

    return weather
}

getWeather();

//////////////////////////////////////////  input city name here function /////////////////////////////////////////

let button = document.querySelector('.button')
let inputValue = document.querySelector('.inputValue')
let cityName = document.querySelector('.cityName')
let desc = document.querySelector('.desc')
let temp = document.querySelector('.temp')

button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=imperial&appid=2acf688360ef2e4ae9e0ba6153c2285f')
        .then(response => response.json())
        .then(data => {
            let nameValue = data['name'];
            let tempValue = data['main']['temp'];
            let descValue = data['weather'][0]['description'];

            cityName.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
        })


})
