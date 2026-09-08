document.querySelector('#quote-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const status = this.querySelector('.form-status');
  status.textContent = 'Thanks! We’ll get back to you shortly with your quote.';
  this.reset();
});
