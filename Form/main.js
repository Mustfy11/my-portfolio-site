// Hamburger menü aç/kapat
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// AOS animasyonları tetikle
window.addEventListener("load", () => {
    document.querySelectorAll("[data-aos]").forEach(el => {
        el.classList.add("aos-animate");
    });
});

// ✅ Form gönderme (Google Form'a AJAX ile)
const form = document.getElementById("myForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Google sayfasına yönlendirmeyi engelle

    const data = new FormData(form);

    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuQmz7nePAtEo_xfR6s1DVme5hQ59LIjC88ddZpIZnpuNWvA/formResponse", {
      method: "POST",
      body: data,
      mode: "no-cors"
    }).then(() => {
      form.reset(); // formu temizle
      document.getElementById("successMsg").style.display = "block"; // mesajı göster
    }).catch(err => {
      alert("❌ Bir hata oluştu, lütfen tekrar deneyin.");
      console.error(err);
    });
  });
}
