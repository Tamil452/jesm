(function () {
  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Home hero: hovering or focusing a word swaps the image beside it
  var frame = document.getElementById('heroFrame');
  if (frame) {
    var imgs = frame.querySelectorAll('img');
    var caption = document.getElementById('heroCaption');
    var capText = caption.querySelector('span:last-child');
    var defaultText = capText.textContent;
    var words = document.querySelectorAll('.word');

    function show(key, label) {
      imgs.forEach(function (img) { img.classList.toggle('is-on', img.dataset.for === key); });
      words.forEach(function (w) { w.classList.toggle('is-active', w.dataset.p === key); });
      if (key === 'all') { caption.removeAttribute('data-p'); capText.textContent = defaultText; }
      else { caption.setAttribute('data-p', key); capText.textContent = label; }
    }
    words.forEach(function (w) {
      var label = w.querySelector('.word-meta b').textContent;
      w.addEventListener('mouseenter', function () { show(w.dataset.p, label); });
      w.addEventListener('focus', function () { show(w.dataset.p, label); });
    });
    var list = document.querySelector('.words');
    list.addEventListener('mouseleave', function () { show('all'); });
    list.addEventListener('focusout', function (e) { if (!list.contains(e.relatedTarget)) show('all'); });
  }

  // Contact form: opens the visitor's email app with the details filled in
  var form = document.getElementById('contactForm');
  if (form) {
    var note = document.getElementById('cf-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var interest = form.interest.value || 'Not specified';
      if (!name || !email || !message || !form.email.checkValidity()) {
        note.textContent = 'Add your name, a valid email and a message, then send again.';
        (!name ? form.name : (!email || !form.email.checkValidity()) ? form.email : form.message).focus();
        return;
      }
      var body = 'Name: ' + name + '\nEmail: ' + email + '\nInterested in: ' + interest + '\n\n' + message;
      window.location.href = 'mailto:hello@jesm.com?subject=' +
        encodeURIComponent('Consultation request from ' + name) + '&body=' + encodeURIComponent(body);
      note.textContent = 'Your email app should open with the message ready to send.';
    });
  }
})();
