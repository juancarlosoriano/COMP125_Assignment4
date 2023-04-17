// Author: Juan Carlo Soriano
// Student Number: 301262744

const PRODUCTS_JSON_URL = "./products.json";

const cards = [];
let productsDOM;
let isLoading = true;
let progressTotalLength = 0;
let loadedLength = 0;
let modal;
let modalBox;
let progressBar;

window.onload = () => {
  productsDOM = document.getElementById("products");

  // Create Modal
  modal = document.createElement("div");
  modal.className = "modal";
  const main = document.getElementById("main");
  main.append(modal);

  // Modal components
  modalBox = document.createElement("div");
  modalBox.className = "modal-box";
  modal.append(modalBox);

  // Progress bar
  progressBar = document.createElement("div");
  progressBar.className = "modal-progress";
  progressBar.style.width = "0%";
  modalBox.append(progressBar);

  loadJSON(PRODUCTS_JSON_URL);
};

const loadJSON = (url) => {
  console.log("Loading products...");
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
      let json = JSON.parse(xhttp.responseText);
      // json.forEach((x) => {
      //   console.log("Loading card...");
      //   createCard(x);
      // });
      progressTotalLength = json.length;
      loadArray(json);
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
};

const loadArray = (arr) => {
  if (arr.length > 0) {
    createCard(arr[0]);
    loadedLength++;
    updateProgressBar();
    setTimeout(() => {
      loadArray(arr.slice(1));
    }, 1000);
  } else {
    modal.hidden = true;

    let main = document.getElementById("main");
    main.className = "container";
  }
};

const updateProgressBar = () => {
  console.log((loadedLength / progressTotalLength) * 100);
  progressBar.style.width = (loadedLength / progressTotalLength) * 100 + "%";
};

const createCard = (obj) => {
  const id = loadedLength;

  // Create card div
  const div = document.createElement("div");
  div.className = "card";

  // Create img
  const img = document.createElement("img");
  img.className = "card-img";
  img.src = obj.src;
  img.alt = obj.alt;
  div.append(img);

  // Create title
  const h2 = document.createElement("h2");
  h2.className = "card-title";
  h2.innerHTML = obj.title;
  div.append(h2);

  // Create price
  const price = document.createElement("p");
  price.className = "card-price";
  price.id = id;
  price.innerHTML = "Price: $ -";
  div.append(price);

  // Create description
  const p = document.createElement("p");
  p.className = "card-description";
  p.innerHTML = obj.description;
  div.append(p);

  if (obj.hasOwnProperty("actionLabel")) {
    // Create button
    const btn = document.createElement("button");
    btn.className = "card-btn";
    btn.innerHTML = obj["actionLabel"];

    // Add event listener
    btn.addEventListener("click", (e) => {
      fetchData(obj["actionURL"], id);
    });

    div.append(btn);
  }

  productsDOM.append(div);
};

// Fetch data using fetch API and update the card price
async function fetchData(url, id) {
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();

  const price = document.getElementById(id);
  price.innerHTML = "Price: $" + json.price;
}
