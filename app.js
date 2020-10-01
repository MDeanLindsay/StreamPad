function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function onKeyDown(e) {
  const SPACEBAR = 32;
  if (e.keyCode === SPACEBAR) {
    stopAllSound();
  } else {
    playSound(e);
  }
}

function stopAllSound() {
  const allAudioElements = Array.from(document.getElementsByTagName("audio"));

  allAudioElements.forEach((audioElement) => {
    audioElement.pause();
  });
}

function playSound(e) {
  const didKeyPress = !!e.keyCode || (e.pageX === 0 && e.pageY === 0);

  console.log("e", e);
  console.log("this", this);

  const key = didKeyPress
    ? document.querySelector(`button[data-key="${e.keyCode}"]`)
    : this;

  const audio = didKeyPress
    ? document.querySelector(`audio[data-key="${e.keyCode}"]`)
    : document.querySelector(
        `audio[data-key="${this.getAttribute("data-key")}"]`
      );

  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", onKeyDown);

const soundButtons = Array.from(document.getElementsByClassName("key"));
soundButtons.forEach((soundButton) => {
  soundButton.addEventListener("click", playSound);
});

window.stopAllSound = stopAllSound;
