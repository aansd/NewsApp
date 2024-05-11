const container = document.querySelector(".row");
const optionsContainer = document.querySelector(".options-container");
const options = ["general", "entertainment", "science", "sports", "technology"];
const country = "us";
const apiKey = "2feb68e0827d4c099faa20924c745054";

let requestURL;

const generalUI = (articles) => {
  container.innerHTML = "";
  for (let item of articles) {
    let cardRow = document.createElement("div");
    cardRow.classList.add("card", "mx-3", "mb-3","col-lg-3", "col-sm-12");
    cardRow.innerHTML = `
        <img src="${item.urlToImage}" class="card-img-top" alt="">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-text">${item.publishedAt}</p>
        <a href="${item.url}" target="_blank" class="btn btn-primary">Go somewhere</a>
        </div>
        `;

    container.appendChild(cardRow);
  }
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="btn btn-primary mx-2 my-4 option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event, '${i}')">${i}</button>`;
  }
};

const searchInput = document.querySelector(".form-control");
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.trim(); 
  if (searchValue !== "") {
    requestURL = `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${apiKey}`;
  } 

  getNews();
});

const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("data uvailable");
    return false;
  }
  let data = await response.json();
  generalUI(data.articles);
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
  init();
};
