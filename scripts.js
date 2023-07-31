const player = document.querySelector('.player'),
		playBtn = document.querySelector('.play')
		prevBtn = document.querySelector('.prev')
		nextBtn = document.querySelector('.next')
		audio = document.querySelector('.audio')
		progressContainer = document.querySelector('.progress__container')
		progress = document.querySelector('.progress')
		title = document.querySelector('.songname')
		cover = document.querySelector('.cover__img')
		imgSrc = document.querySelector('.img__src')
		songname = document.querySelector('.coverr')
// назви пісень
const songs = ['Wish You Were Here', 'Miley Cyrus Malibu', 'Mary on a cross']
//пісня по замовчуванню
let songIndex = 0
// init

function loadSong(song) {
	// title.innerHTML = song
	audio.src = `mp3 files/${song}.mp3`
	cover.src = `imgs/cover${songIndex + 1}.svg`
	songname.src = `imgs/coverr${songIndex + 1}.svg`
}
loadSong(songs[songIndex])
// за замовчуванням клас актіве відсутній
cover.classList.remove('active')
//play
function playSong() {
	player.classList.add('play')
	cover.classList.add('active')
	imgSrc.src = 'imgs/pause.svg'
	audio.play()
}
//pause
function pauseSong() {
	player.classList.remove('play')
	cover.classList.remove('active')
	imgSrc.src = 'imgs/play.svg'
	audio.pause()
}

playBtn.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play')
	if (isPlaying) {
		pauseSong()
	} else {
		playSong()
	}
})

// next song
function nextSong () {
	songIndex++

	if (songIndex > songs.length -1) {
		songIndex = 0
	}

	loadSong(songs[songIndex])
	playSong()
}
nextBtn.addEventListener('click', nextSong)

//prev song
function prevSong() {
	songIndex--

	if(songIndex < 0) {
		songIndex = songs.length -1
	}

	loadSong(songs[songIndex])
	playSong()
}
prevBtn.addEventListener('click', prevSong)

//progress bar
function updateProgress(e) {
	const {duration, currentTime} = e.srcElement
	const progressPercent = (currentTime / duration) * 100
	progress.style.width = `${progressPercent}%`

}
audio.addEventListener('timeupdate', updateProgress)

//progress bar click 
function setProgress(e) {
	const clickX = e.offsetX
	const width = this.clientWidth
	const duration = audio.duration
	audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// autoplay
audio.addEventListener('ended', nextSong)