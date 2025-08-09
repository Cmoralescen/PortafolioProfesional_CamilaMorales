let savedLang = localStorage.getItem("lang") || "es";

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".select-language");

  setLanguage(savedLang);
  selects.forEach(sel => sel.value = savedLang);

  selects.forEach(sel => {
    sel.addEventListener("change", e => {
      const lang = e.target.value;
      setLanguage(lang);
      localStorage.setItem("lang", lang);
      selects.forEach(s => s.value = lang);
    });
  });

  document.getElementById('btnDescargarCV').addEventListener('click', function (e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'resources/CV.pdf';
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  emailjs.init('6xZLGrph_eoQJyg6j');

  const btnEnviar = document.getElementById('btnEnviar');
  const text = btnEnviar.querySelector('.text');
  const progressBar = btnEnviar.querySelector('.progress-bar');
  const checkPath = btnEnviar.querySelector('.check');
  const svgCheck = btnEnviar.querySelector('svg');
  const pathLength = checkPath.getTotalLength();

  checkPath.style.strokeDasharray = pathLength;
  checkPath.style.strokeDashoffset = pathLength;

  const initialWidth = btnEnviar.offsetWidth;

  btnEnviar.addEventListener("click", async (event) => {
  event.preventDefault();

  const currentLang = localStorage.getItem("lang") || "es";

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nombre || !correo || !telefono || !mensaje || !emailRegex.test(correo)) {
      Swal.fire({
        icon: 'error',
        title: translations[currentLang].popup_invalid_title,
        text: translations[currentLang].popup_invalid_text,
        background: '#3E3E43',
        color: '#fff',
      });
      return;
    }

    const timeline = anime.timeline({ autoplay: true });

    timeline
      .add({ targets: text, opacity: 0, duration: 300, easing: 'linear' })
      .add({ targets: btnEnviar, height: 10, width: initialWidth + 100, borderRadius: 100, duration: 1300, easing: 'easeInOutQuad' })
      .add({ targets: progressBar, width: initialWidth + 100, duration: 2000, easing: 'linear' })
      .add({ targets: btnEnviar, width: 100, height: 100, borderRadius: 100, duration: 750, easing: 'easeInOutQuad' })
      .add({
        targets: progressBar,
        width: btnEnviar.offsetWidth,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#71DFBE',
        duration: 750,
        easing: 'easeInOutQuad',
        complete: () => {
          emailjs.sendForm('service_swf958g', 'template_3bc01no', '#form-contacto')
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: translations[currentLang].popup_success_title,
                text: translations[currentLang].popup_success_text,
                background: '#3E3E43',
                color: '#fff',
              });
              document.getElementById('form-contacto').reset();
            })
            .catch((error) => {
              console.error('Error al enviar el correo:', error);
              Swal.fire({
                icon: 'error',
                title: translations[currentLang].popup_error_title,
                text: translations[currentLang].popup_error_text,
                background: '#3E3E43',
                color: '#fff',
              });
            });
        }
      })
      .add({ targets: svgCheck, opacity: 1, duration: 100, easing: 'linear' })
      .add({ targets: checkPath, strokeDashoffset: [pathLength, 0], duration: 500, easing: 'easeInOutSine' })
      .add({ targets: svgCheck, opacity: 0, duration: 100, easing: 'linear', delay: 2000 })
      .add({ targets: btnEnviar, width: 200, height: 80, borderRadius: 10, duration: 750, easing: 'easeInOutQuad' }, '-=100')
      .add({ targets: progressBar, width: 0, height: 10, borderRadius: 200, backgroundColor: '#3E3E43', duration: 750, easing: 'easeInOutQuad' }, '-=750')
      .add({ targets: text, opacity: 1, duration: 300, easing: 'easeInOutQuad' }, '-=500');
  });

  // WhatsApp botón
  const whatsappBtn = document.getElementById('whatsappBtn');
  const whatsappPopup = document.getElementById('whatsappPopup');
  const sendBtn = document.getElementById('sendWhatsapp');

  whatsappBtn.addEventListener('click', () => {
    whatsappPopup.style.display = whatsappPopup.style.display === 'flex' ? 'none' : 'flex';
  });

  sendBtn.addEventListener('click', () => {
    const message = document.getElementById('whatsappMessage').value.trim();
    const phone = '50688515497';
    if (message !== '') {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      whatsappPopup.style.display = 'none';
    }
  });
});
