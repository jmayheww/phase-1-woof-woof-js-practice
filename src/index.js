document.addEventListener("DOMContentLoaded", () => {
  //Dom Selectors

  const bar = document.querySelector("#dog-bar");
  const dogDetails = document.querySelector("#dog-info");
  const filterBtn = document.querySelector("#good-dog-filter");

  // retrive json data
  getDogs().then(renderDogData);

  // Register Listeners
  filterBtn.addEventListener("click", toggleFilter);

  // Fetches

  function getDogs() {
    return fetch("http://localhost:3000/pups")
      .then((resp) => resp.json())

  }

  function getOneDog(id) {
    return fetch("http://localhost:3000/pups/" + `${id}`).then((resp) =>
      resp.json()
    );
  }

  //Functions

  function showOneDog(dogObj) {
    dogDetails.innerHTML = "";
    const img = document.createElement("img");
    const h2 = document.createElement("h2");

    img.src = dogObj.image;
    h2.textContent = dogObj.name;

    const dogDiv = document.createElement("div");
    dogDiv.append(img, h2);
    dogDetails.append(dogDiv);

    const pupBtn = document.createElement("button");
    pupBtn.textContent = ((dogObj.isGoodDog) ? "Good Dog" : "Bad Dog");
    pupBtn.addEventListener("click", () => togglePupButton(pupBtn));
    dogDetails.append(dogDiv, pupBtn);
  }

  function renderDogData(dogData, filter = false ) {
    bar.innerHTML = "";
    if (filter) {
      dogData.filter(dogObj => dogObj.isGoodDog).forEach(addOneDogToBar)

    }else {

      dogData.forEach(addOneDogToBar);
    }
  }

  function addOneDogToBar(dogObj) {
    const dogSpan = document.createElement("span");
    dogSpan.innerText = dogObj.name;
    dogSpan.dataset.id = dogObj.id;
    dogSpan.addEventListener("click", handleSpanClick);
    bar.append(dogSpan);
  }

  // Event Handlers

  function togglePupButton(pupBtn) {

  pupBtn.textContent = pupBtn.textContent.includes("Good") ? "Bad Dog" : "Good Dog";
  }

  function toggleFilter() {
    if (filterBtn.innerText.includes("OFF")) {
      filterBtn.innerText = "Filter good dogs : ON"
      //renderAllInBar(goodDogArr)
      getDogs().then(dogData => renderDogData(dogData, true));
    }else {
      filterBtn.innerText = "Filter good dogs: OFF"
      // renderallinbar(alldogArr)
      getDogs().then(renderDogData);
    }
  }



  function handleSpanClick(event) {
    console.log(event.target);
    const id = event.target.dataset.id;
    getOneDog(id).then(showOneDog);
  }


});

// }
// function handleDogData(dog) {
//     let span = document.createElement("span");
//     let img = document.createElement("img");
//     let h2 = document.createElement("h2");
//     let button = document.createElement("button");

//     const dogBar = document.getElementById("dog-bar");
//     const dogInfo = document.getElementById("dog-info");

//     span.textContent = dog.name;
//     img.src = dog.image;
//     h2 = dog.name;

//     appendEl(span, dogBar);
//     appendEl(img, dogInfo);
// }

// function appendEl(el, parentEl) {
//     parentEl.append(el);
// }
