const whiteStarURL =
  "https://cdn-icons.flaticon.com/png/512/2956/premium/2956792.png?token=exp=1646894731~hmac=61d9e03327e1c1a247f9c1bcdaa27134";
const yellowStarURL = "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";

const stars = document.querySelector(".stars");
stars.addEventListener("mouseover", onHoverIn);
stars.addEventListener("mouseout", onHoverOut);
stars.addEventListener("click", getRating);

let isRatingSelected = false;
const rating = document.querySelector(".rating");
const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
  isRatingSelected = false;
  rating.innerText = "";
  onHoverOut();
});

function generateStar() {
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("img");
    star.style.width = "80px";
    star.setAttribute("id", `${i + 1}`);
    star.setAttribute("src", whiteStarURL);
    stars.appendChild(star);
  }
}
generateStar();

function onHoverIn(e) {
  if (e.target.id && !isRatingSelected) {
    for (let i = 0; i < e.target.id; i++) {
      Array.from(stars.childNodes)[i].setAttribute("src", yellowStarURL);
    }
  }
}

function onHoverOut() {
  if (!isRatingSelected) {
    for (let i = 0; i < stars.childNodes.length; i++) {
      Array.from(stars.childNodes)[i].setAttribute("src", whiteStarURL);
    }
  }
}

function getRating(e) {
  if (e.target.id && !isRatingSelected) {
    isRatingSelected = true;
    rating.innerText = `Selected Rating is ${e.target.id}`;
    for (let i = 0; i < e.target.id; i++) {
      Array.from(stars.childNodes)[i].setAttribute("src", yellowStarURL);
    }
  }
}
