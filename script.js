const tripForm = document.getElementById("tripForm");
const packingResults = document.getElementById("packingResults");

tripForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const tripType = document.getElementById("tripType").value;
  const weather = document.getElementById("weather").value;
  const days = document.getElementById("days").value;
  const activity = document.getElementById("activity").value;

  if (!tripType || !weather || !days || !activity) {
    packingResults.innerHTML = `
      <p class="empty-message">Please fill out all trip details.</p>
    `;
    return;
  }

  packingResults.innerHTML = `
    <p><strong>Trip Type:</strong> ${tripType}</p>
    <p><strong>Weather:</strong> ${weather}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Main Activity:</strong> ${activity}</p>
    <p class="empty-message">Packing list:.</p>
  `;
});