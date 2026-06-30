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

tripForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const tripType = document.getElementById("tripType").value;
    const weather = document.getElementById("weather").value;
    const days = document.getElementById("days").value;
    const activity = document.getElementById("activity").value;

    if (!tripType || !weather || !days || !activity) {
        packingResults.innerHTML = `
        <p class = "empty-message">Please fill out all trip details.</p>
        `;
        return;
    }

    const selectedPackingList = packingLists[tripType];

    let packingItemsHTML = "";

    selectedPackingList.forEach(function(item) {
        packingItemsHTML += `<li>${item}</li>`;
    });

    packingResults.innerHTML = `
    <p><strong>Trip Type:</strong> ${formatText(tripType)}</p>
    <p><strong>Weather:</strong> ${formatText(weather)}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Main Activity:</strong> ${formatText(activity)}</p>

    <h3>Recommended Items</h3>
    <ul>
        ${packingItemsHTML}
    </ul>
    `;
});

function formatText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}