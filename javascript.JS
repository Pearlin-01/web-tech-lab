/* EventSphere interaction layer — place this file beside your HTML file. */
document.addEventListener('DOMContentLoaded', () => {
  const loginCard = document.querySelector('.form-container > div:first-child');
  const loginEmail = loginCard.querySelector('input[type="email"]');
  const loginPassword = loginCard.querySelector('input[type="password"]');
  const loginButton = loginCard.querySelector('input[type="submit"]');
  const registerForm = document.querySelector('#registration ~ .section form');
  const registrationHeader = document.querySelector('#registration');
  const protectedSections = [...document.querySelectorAll('.section')];
  const protectedNav = [...document.querySelectorAll('nav a:not([href="#about"])')];
  const priceByPackage = {
    Silver: '₹10,000', Gold: '₹25,000', Platinum: '₹50,000',
    'Diamond': '₹80,000', 'Signature': '₹1,50,000', 'Customised': 'Custom quotation'
  };
  const eventOptions = [
    'Wedding Expo', 'Corporate Meet', 'Birthday Carnival', 'College Fest',
    'Music Concert', 'Baby Shower', 'Engagement Ceremony', 'Product Launch',
    'Anniversary Celebration', 'Workshop & Seminar'
  ];

  // Details and booking are private until the visitor signs in.
  const setLoggedIn = (loggedIn) => {
    protectedSections.forEach(section => section.hidden = !loggedIn);
    registrationHeader.hidden = !loggedIn;
    protectedNav.forEach(link => link.hidden = !loggedIn);
    document.querySelector('#about').hidden = !loggedIn;
  };
  setLoggedIn(false);

  const loginMessage = document.createElement('p');
  loginMessage.setAttribute('aria-live', 'polite');
  loginCard.append(loginMessage);
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
      loginMessage.textContent = 'Please enter your email and password to view event details.';
      return;
    }
    setLoggedIn(true);
    loginCard.innerHTML = `<h2>Welcome, ${loginEmail.value.split('@')[0]}!</h2><p>You are signed in. Explore the event details and make your booking below.</p>`;
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  });

  const eventSelect = registerForm.querySelector('#event');
  eventSelect.innerHTML = '<option value="">— Choose an Event —</option>' +
    eventOptions.map(event => `<option value="${event}">${event}</option>`).join('');
  eventSelect.required = true;

  const packageLabel = document.createElement('label');
  packageLabel.htmlFor = 'package';
  packageLabel.textContent = 'Choose Package *';
  const packageSelect = document.createElement('select');
  packageSelect.id = 'package'; packageSelect.name = 'package'; packageSelect.required = true;
  packageSelect.innerHTML = '<option value="">— Choose a Package —</option>' +
    Object.entries(priceByPackage).map(([name, price]) => `<option value="${name}">${name} — ${price}</option>`).join('');
  const priceNote = document.createElement('p');
  priceNote.style.cssText = 'margin:8px 0 0;font-size:.9rem;color:#1a4a7a;';
  priceNote.textContent = 'Select a package to view its price.';
  eventSelect.insertAdjacentElement('afterend', packageLabel);
  packageLabel.insertAdjacentElement('afterend', packageSelect);
  packageSelect.insertAdjacentElement('afterend', priceNote);
  packageSelect.addEventListener('change', () => {
    priceNote.textContent = packageSelect.value ? `Selected price: ${priceByPackage[packageSelect.value]}` : 'Select a package to view its price.';
    customPackageBox.hidden = packageSelect.value !== 'Customised';
  });

  const customPackageBox = document.createElement('div');
  customPackageBox.className = 'custom-package-box';
  customPackageBox.hidden = true;
  customPackageBox.innerHTML = `
    <h3>Customise Your Package</h3>
    <label for="guest-count">Expected Guests</label>
    <input id="guest-count" name="guest-count" type="number" min="1" placeholder="e.g. 150" />
    <label for="budget">Your Budget (₹)</label>
    <input id="budget" name="budget" type="number" min="0" placeholder="e.g. 60000" />
    <label for="custom-addons">Add-ons you would like</label>
    <textarea id="custom-addons" name="custom-addons" rows="3" placeholder="Decor, DJ, catering, photography, live band…"></textarea>`;
  priceNote.insertAdjacentElement('afterend', customPackageBox);

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!registerForm.reportValidity()) return;
    const name = registerForm.querySelector('#fname').value.trim();
    const email = registerForm.querySelector('#email').value.trim();
    const preferredDate = registerForm.querySelector('#pmonth').value || 'To be confirmed';
    const customDetails = packageSelect.value === 'Customised'
      ? `Guests: ${registerForm.querySelector('#guest-count').value || 'Not specified'} · Budget: ₹${registerForm.querySelector('#budget').value || 'Not specified'} · Add-ons: ${registerForm.querySelector('#custom-addons').value || 'None specified'}`
      : 'Standard package selected';
    const confirmation = document.createElement('section');
    confirmation.className = 'section';
    confirmation.id = 'booking-confirmation';
    confirmation.innerHTML = `
      <h2>Thank You for Registering!</h2>
      <p>Your booking request has been received. Our team will contact you shortly.</p>
      <table><tr><th>Booking Detail</th><th>Your Selection</th></tr>
      <tr><td>Guest Name</td><td>${name}</td></tr>
      <tr><td>Email</td><td>${email}</td></tr>
      <tr><td>Event</td><td>${eventSelect.value}</td></tr>
      <tr><td>Package Chosen</td><td>${packageSelect.value}</td></tr>
      <tr><td>Package Price</td><td>${priceByPackage[packageSelect.value]}</td></tr>
      <tr><td>Package Details</td><td>${customDetails}</td></tr>
      <tr><td>Preferred Month</td><td>${preferredDate}</td></tr></table>`;
    document.querySelector('#booking-confirmation')?.remove();
    registerForm.closest('.section').insertAdjacentElement('afterend', confirmation);
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
