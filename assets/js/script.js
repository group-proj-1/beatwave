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
            fetch('https://api.spotify.com/v1/browse/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer  ' + data.access_token,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                });
        });
}
getToken();