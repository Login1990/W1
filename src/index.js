import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}
async function fetchAndDisplayDogImage(name) {
  try {
    let response = await fetch(
      "https://dog.ceo/api/breed/" + name + "/images/random"
    );
    let json = await response.json();
    console.log(json["message"]);
    return json["message"];
  } catch (e) {
    console.log(e);
  }
}

async function fetchTheBreedSummary(name) {
  try {
    let response = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/summary/" + name
    );
    let json = await response.json();
    return json["extract"];
  } catch (e) {
    console.log(e);
  }
}

async function initializeCode() {
  let listOfBreedsToDisplay = ["Shiba", "Akita", "Borzoi", "Boxer", "Eskimo"];
  let listOfBreedsToFetch = [
    "Shiba Inu",
    /*There is no Wiki article for just Shiba*/ "Akita_(dog)",
    "Borzoi",
    "Boxer_(dog)",
    /*For who knows what reason the images of Eskimo are not similar to any type of Eskimo dog, and look more like a Syberian Huskey therefore*/

    "Siberian_Husky"
  ];
  let lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  let body = document.body;
  for (let i = 0; i < 5; i++) {
    let container = document.createElement("div");
    container.classList = "container";
    let wiki_item = document.createElement("div");
    let wiki_header = document.createElement("h1");
    wiki_header.innerText = listOfBreedsToDisplay[i];
    let wiki_content = document.createElement("div");
    let wiki_text = document.createElement("p");
    let wiki_img_container = document.createElement("div");
    let wiki_img = document.createElement("img");
    wiki_text.innerText = lorem;
    wiki_item.classList = "wiki-item";
    wiki_header.classList = "wiki-header";
    wiki_text.classList = "wiki-text";
    wiki_content.classList = "wiki-content";
    wiki_img_container.classList = "img-container";
    wiki_img.classList = "wiki-img";
    body.appendChild(container);
    container.appendChild(wiki_item);
    wiki_item.appendChild(wiki_header);
    wiki_item.appendChild(wiki_content);
    wiki_content.appendChild(wiki_text);
    wiki_content.appendChild(wiki_img_container);
    wiki_img_container.appendChild(wiki_img);

    const dogURL = await fetchAndDisplayDogImage(
      listOfBreedsToDisplay[i].toLowerCase()
    );
    const descURL = await fetchTheBreedSummary(listOfBreedsToFetch[i]);
    wiki_img.src = dogURL;
    wiki_text.innerText = descURL;
  }

  //document.getElementById("app").innerHTML = "<h1>Hello!</h1>";
}
