const bgMusic = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const seekSlider = document.getElementById("seekSlider");
const volumeSlider = document.getElementById("volumeSlider");
const trackTitle = document.getElementById("trackTitle");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicPlayer = document.getElementById("musicPlayer");

const pathDepth = window.location.pathname.split('/').filter(Boolean).length;

let prefix = '';
for(let i = 1; i < pathDepth; i++) {
  prefix += '../';
}

const tracks = [
  { title: "Honkai Star Rail- Login BGM", src: prefix + "music/HSR_Login_BGM.mp3" },
  { title: "Herta Space Station - Flow Experience", src: prefix + "music/Flow_Experience.mp3" },
  { title: "Herta Space Station - Space Walk", src: prefix + "music/Space_Walk.mp3" },
  { title: "Jarilo-VI - Embers", src: prefix + "music/Embers.mp3" },
  { title: "Jarilo-VI - Streets Abuzz", src: prefix + "music/Streets_Abuzz.mp3" },
  { title: "Xianzhou Luofu - Erstwhile Resonance", src: prefix + "music/Erstwhile_Resonance.mp3" },
  { title: "Xianzhou Luofu - Serene Stroll", src: prefix + "music/Serene_Stroll.mp3" },
  { title: "Penacony - Had I Not Seen The Sun", src: prefix + "music/Had_I_Not_Seen_The_Sun.mp3" },
  { title: "Penacony - Realitätsprinzip", src: prefix + "music/Realitätsprinzip.mp3" },
  { title: "Amphoreus - Anthem of Eras", src: prefix + "music/Anthem_Of_Eras.mp3" },
  { title: "Amphoreus - Wandering Rhymes", src: prefix + "music/Wandering_Rhymes.mp3" },
];

let currentTrack = 0;
let isPaused = false;

function loadPlayerState() {
  const savedIndex = localStorage.getItem("currentTrackIndex");
  const savedTime = localStorage.getItem("currentTime");
  const savedVolume = localStorage.getItem("volume");
  const savedPaused = localStorage.getItem("isPaused");

  if (savedIndex !== null) currentTrack = parseInt(savedIndex);
  if (savedVolume !== null) bgMusic.volume = volumeSlider.value = parseFloat(savedVolume);
  if (savedPaused !== null) isPaused = savedPaused === "true";

  loadTrack(currentTrack, () => {
    if (savedTime !== null) bgMusic.currentTime = parseFloat(savedTime);
    if (!isPaused) bgMusic.play();
    updatePlayButton();
  });
}

function savePlayerState() {
  localStorage.setItem("currentTrackIndex", currentTrack);
  localStorage.setItem("currentTime", bgMusic.currentTime);
  localStorage.setItem("volume", bgMusic.volume);
  localStorage.setItem("isPaused", bgMusic.paused);
}

function updatePlayButton() {
  playPauseBtn.textContent = bgMusic.paused ? "⏯" : "⏸";
}

function loadTrack(index, callback = null) {
  bgMusic.src = tracks[index].src;
  trackTitle.textContent = tracks[index].title;
  bgMusic.load();
  bgMusic.onloadedmetadata = () => {
    if (callback) callback();
  };
}

playPauseBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
  updatePlayButton();
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack, () => bgMusic.play());
});

bgMusic.addEventListener("timeupdate", () => {
  seekSlider.value = (bgMusic.currentTime / bgMusic.duration) * 100;
  savePlayerState();
});

seekSlider.addEventListener("input", () => {
  bgMusic.currentTime = (seekSlider.value / 100) * bgMusic.duration;
});

volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value;
  savePlayerState();
});

document.body.addEventListener("click", () => {
  if (!isPaused && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });

musicToggleBtn.addEventListener("click", () => {
  const isOpen = musicPlayer.style.display === "block";
  musicPlayer.style.display = isOpen ? "none" : "block";
});

loadPlayerState();
