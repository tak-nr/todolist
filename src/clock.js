const clock = document.querySelector(".clock");

function setTime() {
  const time = new Date();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  clock.innerText = `⏰ ${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

setTime();
setInterval(setTime, 1000);
