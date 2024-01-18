const accessKey = "8EQd7XMrrkS1Vnlf0r0ReBzadBSMDA0VNHwDCPu7prU";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreEl = document.querySelector("#show-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${inputData}`;

  const response = await fetch(url);
  const results = await response.json();

  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  results?.results?.map((result) => {
    const imageWarper = document.createElement("div");
    imageWarper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.target = "_blank";
    imageLink.appendChild(image);  // Append the image to the imageLink
    imageLink.textContent = result.alt_description;

    imageWarper.appendChild(image);
    imageWarper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWarper);  // Append the imageWarper to searchResultsEl
  });

  page++;

  if (page < 1) {
    showMoreEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreEl.addEventListener("click", () => {
  searchImages();
});
