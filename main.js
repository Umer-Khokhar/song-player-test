document.addEventListener('DOMContentLoaded', () => {
  const songContainer = document.getElementById('songContainer')
  let songList = document.getElementById('songList')
  const audioPlayer = new Audio();


  loadSongs('hindi-song')
  loadSongs('english-songs')

  function loadSongs(folder) {
   
    fetch(`songs/${folder}/info.json`)
    .then(response => response.json())
    .then(data => {
      displaySongs(data, folder)
      console.log(data.img)
    })
    
  }

  function displaySongs(myData, myfolder) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <img src="/songs/${myfolder}/${myData.img}" class="coverImage">
    <h2>${myData.title}</h2>
    <p>${myData.description}</p>
    `

    card.addEventListener('click', e => {

      songList.innerHTML = ''

      for (let index = 0; index < myData.songs.length; index++) {
        const myLi = document.createElement('li');
        myLi.innerHTML = `/songs/${myfolder}/${myData.songs[index].title}`;
        songList.appendChild(myLi);


        myLi.addEventListener('click', () => {
          let songPath = `/songs/${myfolder}/${myData.songs[index].song}`;

          audioPlayer.src = songPath;
          audioPlayer.play();
        })
      }

    })

    songContainer.appendChild(card);
  }

})