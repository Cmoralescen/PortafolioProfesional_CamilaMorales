function updateCountdown() {
  const endDate = new Date("2025-08-08T18:00:00");
  const now = new Date();
  const diff = endDate - now;

  const countdown = document.getElementById("countdown");
  countdown.innerHTML = "";

  if (diff <= 0) {
    countdown.innerHTML = "<div>¡Ya está disponible!</div>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

countdown.innerHTML = `
  <div><strong style="font-size: 2rem;">${days}</strong><br>días</div>
  <div><strong style="font-size: 2rem;">${hours}</strong><br>horas</div>
  <div><strong style="font-size: 2rem;">${minutes}</strong><br >minutos</div>
`;

}

setInterval(updateCountdown, 1000);
updateCountdown();
