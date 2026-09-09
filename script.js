const SITE_CONFIG = Object.freeze({
  phoneDisplay: "+63 923 687 5399",
  phoneHref: "tel:+639236875399",
  facebookUrl: "https://www.facebook.com/profile.php?id=61594454391555",
  bookingUrl: "",
  serviceArea: "San Simon, nearby Pampanga communities, and neighboring Bulacan areas",
  chatWidgetId: "2ec1156c-ab6b-11f1-b504-0297f0b15a01"
});

document.querySelectorAll("[data-phone-link]").forEach((link) => { link.href = SITE_CONFIG.phoneHref; });
document.querySelectorAll("[data-phone-display]").forEach((element) => { element.textContent = SITE_CONFIG.phoneDisplay; });
document.querySelectorAll("[data-facebook-link]").forEach((link) => { link.href = SITE_CONFIG.facebookUrl; });

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  };
  menuToggle.addEventListener("click", () => {
    const opening = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(opening));
    navigation.classList.toggle("open", opening);
    document.body.classList.toggle("menu-open", opening);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const isWasher = link.dataset.service.toLowerCase().includes("washing");
    const isRepair = link.dataset.service.toLowerCase().includes("repair");
    const appliance = document.querySelector('[name="appliance"]');
    const service = document.querySelector('[name="service"]');
    if (appliance) appliance.value = isWasher ? "Washing machine" : "Air conditioner";
    if (service) service.value = isRepair ? "Repair / diagnosis" : "Cleaning";
  });
});

const quoteForm = document.querySelector("#quote-form");
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = quoteForm.querySelector(".form-status");
    const requiredFields = [...quoteForm.querySelectorAll("[required]")];
    const invalidFields = requiredFields.filter((field) => !field.checkValidity());
    requiredFields.forEach((field) => field.setAttribute("aria-invalid", String(!field.checkValidity())));
    if (invalidFields.length) {
      status.textContent = "Please complete the required fields before sending your request.";
      status.classList.add("error");
      invalidFields[0].focus();
      return;
    }
    status.classList.remove("error");
    status.textContent = "Thank you. Your details are ready—please call or message us while online booking is being finalized.";
    if (SITE_CONFIG.bookingUrl) {
      window.location.assign(SITE_CONFIG.bookingUrl);
    } else {
      quoteForm.reset();
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
