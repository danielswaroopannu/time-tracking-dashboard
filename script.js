async function fetchData(timeframe) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    updateData(data, timeframe);
  } catch (error) {
    console.log("Something Went Wrong", error);
  }
}

const imageMap = {
  Work: "./images/icon-work.svg",
  Study: "./images/icon-study.svg",
  Play: "./images/icon-play.svg",
  Exercise: "./images/icon-exercise.svg",
  Social: "./images/icon-social.svg",
  "Self Care": "./images/icon-self-care.svg",
};

function updateData(data, timeframe) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  data.forEach(({ title, timeframes }) => {
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;

    const card = document.createElement("div");
    card.classList.add("card");

    let label = "";
    if (timeframe === "daily") {
      label = "Day";
    } else if (timeframe === "weekly") {
      label = "Last Week";
    } else {
      label = "Month";
    }

    card.innerHTML = `
    <div class="card-image">
        <img src="${imageMap[title]}" alt="${title} image"/>
    </div>
    <div class="content">
      <div class="title">
        <p>${title}</p>
        <img src=${"./images/icon-ellipsis.svg"} alt="Elipsis"/>
      </div>
      <h1 class="current-hours">${current}hrs</h1>
      <p class="previous-hours">${label} - ${previous} hrs</p>
    </div>
    `;
    cardsContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData("weekly");
});

const timeframeLinks = document.querySelectorAll(".timeframe-links button");
timeframeLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const setLink = link.textContent.toLowerCase();
    fetchData(setLink);
  });
});
