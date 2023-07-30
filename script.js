let btn = document.querySelector(".btn");
let searchValue = document.querySelector("#search");
let result = document.querySelector(".result");
let viewer = document.querySelector(".viewer");

btn.addEventListener("click", food);

// main callBack function to retrieve food images and name
async function food() {
  try {
    let valueToSearch = searchValue.value;
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueToSearch}`
    );
    let data = await response.json();
    // SearchShower();
    CardShower(data.meals);
    searchValue.value = "";
  } catch (err) {
    console.log(err);
  }
}

//details of the meal in cards
function CardShower(val) {
  viewer.innerHTML = "";
  let div1 = document.createElement("div");
  div1.classList.add("found");
  div1.innerHTML = "Your Search Result:";
  viewer.append(div1);
  if (val) {
    val.forEach((el) => {
      let div = document.createElement("div");
      div.classList.add("col-lg-6");
      // div.classList.add("col-lg-12");
      div.innerHTML = `
      <div class="card text-center" style="width: 30rem">
      <img
      src=${el.strMealThumb}
      class="card-img-top"
      alt="Fried chicken image"
      />
      <div class="card-body">
      <h5 class="card-title">${el.strMeal}</h5>
      <a href=""  id= ${el.idMeal} class="btn secondPage btn-outline-secondary common">Get recipe</a>
      </div>
      </div>
      `;
      viewer.append(div);
      div.classList.remove("found");
    });
  } else {
    let div = document.createElement("div");
    div.innerHTML = "Sorry,We didn't find any meal";
    viewer.append(div);
    div.classList.add("notfound");
  }
  const dinner = document.querySelectorAll(".common");
  for (const el of dinner) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      let mealItem = e.target.id;
      recipeDetail(mealItem);
    });
  }
}

// viewer.addEventListener("click", recipeDetail);

// instructions and video link of the recipe meal
let meal = document.querySelector(".mealDetails");
async function recipeDetail(mealItem) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`
    );
    let data = await response.json();
    let dataMeal = data.meals[0];
    let div = document.createElement("div");
    // div.classList.add("showRecipe");
    meal.innerHTML = "";
    meal.classList.remove("hidden");
    div.innerHTML = ` <button type="button" class="btn btn-light recipeClose">
    <i class="fa-solid fa-xmark"></i>
    </button>
    <h2 class="recipeTitle">${dataMeal.strMeal}</h2>
    <h3 class="recipeCategory">${dataMeal.strCategory}</h3>
    <div class="recipeDescription">
      <h3>Instruction:</h3>
      <p>${dataMeal.strInstructions}</p>
      </div>
      <div>
      <img
      class="recipeImg"
      src="${dataMeal.strMealThumb}"
      alt=""
      />
      </div>
      <div class="recipeLink">
      <a href="${dataMeal.strYoutube}" target="_blank">Watch video</a>
      </div>`;
    meal.append(div);
    let closeBtn = document.querySelector(".recipeClose");
    closeBtn.addEventListener("click", () => {
      // div.classList.remove("showRecipe");
      meal.classList.add("hidden");
    });
  } catch (err) {
    console.log(err);
  }
}