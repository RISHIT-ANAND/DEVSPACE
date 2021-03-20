function openModal() {
  let modalTrigger = document.querySelectorAll('[data-toggle="modal"]');

  modalTrigger.forEach(function(trigger) {
    trigger.addEventListener('click', function(event) {

      // remove "#" from #modal
      const target = this.getAttribute('data-target').substr(1);

      // use dynamic target to reference given modal
      const modalWindow = document.getElementById(target);

      if(modalWindow.classList) {
        modalWindow.classList.add('show-modal');
      }

      event.preventDefault();
    });
  });
}

function closeModal() {
  let closeBtns = document.querySelectorAll('.modal-close');
  let modalOverlays = document.querySelectorAll('.modal-backdrop');

  closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function(event) {

      // target the whole modal
      const modalWindow = this.parentNode.parentNode;

      modalWindow.classList.remove('show-modal');
    });
  });

  modalOverlays.forEach(function(overlay) {
    // get the whole modal using overlay argument
    const modalWindow = overlay.parentNode;

    // close modal if click event is fired on overlay background
    overlay.addEventListener('click', function() {
      modalWindow.classList.remove('show-modal');
    });
  });
}

function fireWhenReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}

fireWhenReady(openModal);
fireWhenReady(closeModal);