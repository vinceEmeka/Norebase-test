const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".previousBtn");
const tableBody = document.getElementById("tableRows");

let startingIndex = 0;
let endingIndex = 10; // display only ten (10) items per page
let data = []; // Store the fetched data globally

// Fetch data from API and render the first page
fetch("https://api.coinlore.net/api/tickers/")
 .then(response => response.json())
 .then(res => {
  data = res.data;
  displayTable();
  updateButtonStates();
 })
 .catch(error => console.error("Error fetching data:", error));

// Function to populate the UI 
function displayTable() {
 let rows = "";
 data.slice(startingIndex, endingIndex).forEach(coin => {
  rows += `<tr>
               <td data-label="💰️ Coin Name">${coin.name}</td>
               <td data-label="📄 Code">${coin.symbol}</td>
               <td data-label="🤑 Price">$${coin.price_usd}</td>
               <td data-label="📉 Total Supply">${coin.tsupply} ${coin.symbol}</td>
             </tr>`;
 });
 tableBody.innerHTML = rows;
}

// Update button states based on the current page

function updateButtonStates() {
 prevBtn.disabled = startingIndex === 0;
 nextBtn.disabled = endingIndex >= data.length;
 if (startingIndex === 0) {
  prevBtn.classList.remove("visible"); // Hide but keep space
 } else {
  prevBtn.classList.add("visible"); // Show when not on the first page
 }

 nextBtn.style.visibility = endingIndex >= data.length ? "hidden" : "visible";
 // Hide/show Next button as needed

}

// Event listeners for next and previous buttons

nextBtn.addEventListener("click", () => {
 if (endingIndex < data.length) {
  startingIndex += 10;
  endingIndex += 10;
  displayTable();
  updateButtonStates();
 }
});

prevBtn.addEventListener("click", () => {
 if (startingIndex > 0) {
  startingIndex -= 10;
  endingIndex -= 10;
  displayTable();
  updateButtonStates();
 }
});
