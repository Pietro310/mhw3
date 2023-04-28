const key_gif = 'mAvCsm3x3r5UhimJjQvAbWmHVSf8Uomb';
const gif_api_endpoint = 'http://api.giphy.com/v1/gifs/search';


function onResponse(response){
    console.log('risposta ricevuta')
    return response.json();
}

function onTokenResponse(response) {
    return response.json();
}

function getToken(json)
{
	token_data = json;
	
}


function onJson(json){
   console.log('json GIF ricevuto');
   console.log(json);
   //svuoto la libreria
   const gifs=document.querySelector('#gifs') 
   gifs.innerHTML='';
   //leggo il numero dei risultati
   const results=json.data;
   for(result of results){
    console.log(result+'questo è un result');
   }
   
   
//processo i risultati
   for(result of results){
    console.log(result);
//leggo info
    const immagine=result.images.downsized_medium.url;
    const img=document.createElement('img');
    img.src=immagine;

    gifs.appendChild(img);
   }

   
}
   
    



function search(event){
    event.preventDefault();

//leggi valore del campo di testo
    const minegif_input = document.querySelector('#minegif');
    const minegif_value = encodeURIComponent(minegif_input.value);
//richiesta
    gif_request = gif_api_endpoint + '?api_key='  + key_gif + '&q=' + minegif_value + '&limit=' + 4;
//fetch
    fetch(gif_request).then(onResponse).then(onJson);
}

function prevent(event) {
	event.preventDefault();
}


const form = document.querySelector('#gifsform');
form.addEventListener('submit', search);


const clientId = "e7ef7c9716004e6c8981820b83348cfb" ; 
const clientSec = "712fb976957849668452b8610b679cfe" ; 

function onJsonSpotify(json) {
   
    const song = document.querySelector('#song');
    song.innerHTML = '';

    const result = json.tracks.items[0] ;

    const album = document.createElement('span');
    const name_album = result.album.name;
    album.textContent = "Album: " + name_album;

    const artist = document.createElement('span');
    const name_artist = result.artists[0].name;
    artist.textContent = "Artist: " + name_artist;

    const image = document.createElement('img');
    image.src = result.album.images[0].url;

    const link = document.createElement('a');
    const url_link = result.preview_url;
    link.textContent = "Click per ascoltare";
    link.href = url_link;
   
    
    song.appendChild(image);
    song.appendChild(artist);
    song.appendChild(album);
    song.appendChild(link);   
}

function searchOnSpotify(event){
    event.preventDefault();
//Leggi valore del campo di testo
	const song_input = document.querySelector('#author');
    const song_value = encodeURIComponent(song_input.value);
//eseguo richiesta
    fetch("https://api.spotify.com/v1/search?type=track&include_external=audio&q=" + song_value,
    {
        headers:
        {
            'Authorization': 'Bearer ' + token_data.access_token
        }
    }
    ).then(onResponse).then(onJsonSpotify);
}



//richiesta token
let token_data;
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSec)
    }
}
).then(onTokenResponse).then(getToken);



const formMusic = document.querySelector('#music');
formMusic.addEventListener('submit', searchOnSpotify);