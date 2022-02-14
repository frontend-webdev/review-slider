let reviews;
let sliderIndex = 0;

function loadStars(star) {
  const calcStars = [];
  
  for (let i = 0; i < Math.floor(star); i++) {
    calcStars.push(`<img src="images/full-star.svg">`);
    // console.log(calcStars);
  }

  if (star === 5) {
    return calcStars.map((item) => item).join("");
  }

  if (Number.isInteger(star)) {
    for (let i = 0; i < 5 - star; i++) {
      calcStars.push(`<img src="images/empty-star.svg">`);
      // console.log(calcStars);
    }
  } else {
    calcStars.push(`<img src="images/half-star.svg">`);

    for (let i = 0; i < 4 - Math.floor(star); i++) {
      calcStars.push(`<img src="images/empty-star.svg">`);
      // console.log(calcStars);
    }
  }

  return calcStars.map((item) => item).join("");
}

function loadReviews(review) {
  return `
  <div class="review__info-inner">
    <div class="review__headshot">
      <img src="${review.headshot}" alt="${review.name}">
    </div>
    <p class="review__name"><strong>${review.name}</strong></p>
    <p class="review__location">${review.location}</p>
    <div class="review__stars">
      ${loadStars(review.stars)}
    </div>
    <p class="review__desc">${review.description}</p>
  </div>
  `
}

async function fetchData() {
  await fetch("../reviews.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      reviews = data;
      document.querySelector(".review__info").innerHTML = data.map(loadReviews).join("")
    })
}

fetchData();

document.querySelector("#arrow-right").addEventListener("click", moveSlider);
document.querySelector("#arrow-left").addEventListener("click", moveSlider);

function moveSlider(event) {
  console.log(event);
  if (event.currentTarget.id.includes("right")) {
    console.log(event.currentTarget.id);
    console.log(event.target.id);

    sliderIndex === reviews.length - 1 ? (sliderIndex = 0) : sliderIndex++
  } else {
    sliderIndex === 0 ? (sliderIndex = reviews.length - 1) : sliderIndex--
  }
  document.querySelector(".review__info").style.transform = 
  `translate(${-100 * sliderIndex}%)`;
}