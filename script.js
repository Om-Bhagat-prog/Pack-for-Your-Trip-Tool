const tripForm = document.getElementById("tripForm");
const packingResults = document.getElementById("packingResults");

const STORAGE_KEY = "savedPackingItems";

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

const activityLists = {
  sightseeing: [
    "Comfortable walking shoes",
    "Small backpack",
    "Phone charger",
    "Camera or phone",
    "Reusable water bottle",
    "Local map or saved directions"
  ],

  hiking: [
    "Trail shoes",
    "Trail snacks",
    "Small first aid kit",
    "Map or offline GPS",
    "Reusable water bottle",
    "Backpack"
  ],

  swimming: [
    "Swimsuit",
    "Towel",
    "Goggles",
    "Waterproof phone pouch",
    "Flip flops",
    "Plastic bag for wet clothes"
  ],

  business: [
    "Formal outfit",
    "Dress shoes",
    "Notebook",
    "Laptop or tablet",
    "Phone charger",
    "Travel-size lint roller"
  ],

  relaxing: [
    "Comfortable clothes",
    "Book or e-reader",
    "Headphones",
    "Travel pillow",
    "Journal",
    "Reusable water bottle"
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

  const clothingList = createClothingList(days);
  const selectedWeatherList = weatherLists[weather];
  const selectedActivityList = activityLists[activity];
  const selectedPackingList = packingLists[tripType];

  packingResults.innerHTML = `
    <p><strong>Trip Type:</strong> ${formatText(tripType)}</p>
    <p><strong>Weather:</strong> ${formatText(weather)}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Main Activity:</strong> ${formatText(activity)}</p>

    <div class = "packing-progress">
      <p id = "progressText">0 items packed</p>

      <div class = "packing-actions">
        <button type="button" id = "printListBtn" class = "secondary-button">
        Print List
      </button>
    
      <button type = "button" id = "clearSavedListBtn" class = "secondary-button">
      Clear Saved List
    </button>

    <button type = "button" id = "startOverBtn" class = "secondary-button">
      Start Over
    </button>
  </div>
  </div>

    <h3>Clothing</h3>
    <ul>
      ${createListItems(clothingList)}
    </ul>

    <h3>Weather Items</h3>
    <ul>
      ${createListItems(selectedWeatherList)}
    </ul>

    <h3>Activity Items</h3>
    <ul>
      ${createListItems(selectedActivityList)}
    </ul>

    <h3>Trip Type Items</h3>
    <ul>
      ${createListItems(selectedPackingList)}
    </ul>
  `;

  setupCheckboxSaving();
  updateProgressText();

  document
  .getElementById("printListBtn")
  .addEventListener("click", printPackingList);

  document
  .getElementById("clearSavedListBtn")
  .addEventListener("click", clearSavedList);

  document
  .getElementById("startOverBtn")
  .addEventListener("click", startOver);
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
  const savedItems = getSavedItems();

  items.forEach(function(item) {
    const itemId = createItemId(item);
    const checkedText = savedItems.includes(itemId) ? "checked" : "";

    listHTML += `
      <li class="packing-item">
        <label>
          <input 
            type="checkbox" 
            data-item-id="${itemId}" 
            ${checkedText}
          />
          <span>${item}</span>
        </label>
      </li>
    `;
  });

  return listHTML;
}

function setupCheckboxSaving() {
  const checkboxes = document.querySelectorAll(".packing-item input");

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
      saveCheckedItems();
      updateProgressText();
    });
  });
}

function saveCheckedItems() {
  const checkedBoxes = document.querySelectorAll(".packing-item input:checked");
  const checkedItemIds = [];

  checkedBoxes.forEach(function(checkbox) {
    checkedItemIds.push(checkbox.dataset.itemId);
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItemIds));
}

function getSavedItems() {
  const savedItems = localStorage.getItem(STORAGE_KEY);

  if (!savedItems) {
    return [];
  }

  return JSON.parse(savedItems);
}

function updateProgressText() {
  const progressText = document.getElementById("progressText");
  const allCheckboxes = document.querySelectorAll(".packing-item input");
  const checkedBoxes = document.querySelectorAll(".packing-item input:checked");

  progressText.textContent = `${checkedBoxes.length} of ${allCheckboxes.length} items packed`;
}

function clearSavedList() {
  localStorage.removeItem(STORAGE_KEY);

  const checkboxes = document.querySelectorAll(".packing-item input");

  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });

  updateProgressText();
}

function createItemId(item) {
  return item.toLowerCase().replaceAll(" ", "-");
}

function printPackingList() {
  window.print();
}

function startOver() {
  tripForm.reset();

  packingResults.innerHTML = `
    <p class = "empty-message">Your packing list will appear here.</p>
  `;
}

function formatText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}