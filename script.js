const tripForm = document.getElementById("tripForm");
const packingResults = document.getElementById("packingResults");

const packingLists = {
  beach: [
    "Swimsuit",
    "Sunscreen",
    "Sunglasses",
    "Beach towel",
    "Flip flops",
    "Hat",
    "Reusable water bottle"
  ],

  city: [
    "Comfortable walking shoes",
    "Phone charger",
    "Small backpack",
    "Travel wallet",
    "Casual outfits",
    "Reusable water bottle",
    "Camera or phone"
  ],

  mountain: [
    "Hiking shoes",
    "Warm jacket",
    "Water bottle",
    "Trail snacks",
    "Sunscreen",
    "First aid kit",
    "Backpack"
  ],

  camping: [
    "Tent",
    "Sleeping bag",
    "Flashlight",
    "Bug spray",
    "First aid kit",
    "Camp clothes",
    "Reusable water bottle"
  ],

  international: [
    "Passport",
    "Travel documents",
    "Phone charger",
    "Power adapter",
    "Comfortable clothes",
    "Travel wallet",
    "Copies of important documents"
  ]
};

const weatherLists = {
  hot: [
    "Lightweight clothes",
    "Sunscreen",
    "Sunglasses",
    "Hat or cap",
    "Reusable water bottle",
    "Cooling towel"
  ],

  cold: [
    "Warm jacket",
    "Sweater or hoodie",
    "Gloves",
    "Winter hat",
    "Thick socks",
    "Lip balm"
  ],

  rainy: [
    "Rain jacket",
    "Umbrella",
    "Waterproof shoes",
    "Plastic bag for wet clothes",
    "Quick-dry towel",
    "Extra socks"
  ],

  mixed: [
    "Light jacket",
    "Layered outfits",
    "Small umbrella",
    "Comfortable shoes",
    "Extra socks",
    "Weather-friendly backpack"
  ]
};

tripForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const tripType = document.getElementById("tripType").value;
  const weather = document.getElementById("weather").value;
  const days = Number(document.getElementById("days").value);
  const activity = document.getElementById("activity").value;

  if (!tripType || !weather || !days || !activity) {
    packingResults.innerHTML = `
      <p class="empty-message">Please fill out all trip details.</p>
    `;
    return;
  }

  if (days < 1 || days > 30) {
    packingResults.innerHTML = `
      <p class="empty-message">Please enter a trip length between 1 and 30 days.</p>
    `;
    return;
  }

  const selectedPackingList = packingLists[tripType];
  const selectedWeatherList = weatherLists[weather];
  const clothingList = createClothingList(days);

  const clothingItemsHTML = createListItems(clothingList);
  const weatherItemsHTML = createListItems(selectedWeatherList);
  const tripItemsHTML = createListItems(selectedPackingList);

  packingResults.innerHTML = `
    <p><strong>Trip Type:</strong> ${formatText(tripType)}</p>
    <p><strong>Weather:</strong> ${formatText(weather)}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Main Activity:</strong> ${formatText(activity)}</p>

    <h3>Clothing</h3>
    <ul>
      ${clothingItemsHTML}
    </ul>

    <h3>Weather Items</h3>
    <ul>
      ${weatherItemsHTML}
    </ul>

    <h3>Trip Type Items</h3>
    <ul>
      ${tripItemsHTML}
    </ul>
  `;
});

function createClothingList(days) {
  const pantsCount = Math.ceil(days / 2);

  return [
    `${days} shirts`,
    `${days} pairs of underwear`,
    `${days} pairs of socks`,
    `${pantsCount} pants or shorts`,
    "1 sleepwear",
    "1 extra outfit"
  ];
}

function createListItems(items) {
  let listHTML = "";

  items.forEach(function(item) {
    listHTML += `<li>${item}</li>`;
  });

  return listHTML;
}

function formatText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}