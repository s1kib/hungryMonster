const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');
const singleMealContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

const mealsElement = document.getElementById('meals');

const getMeals = async (searchValue) => {
  const apiUrl = ` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  const result = await fetch(apiUrl);
  const data = await result.json();
  const meals = data.meals;
  return meals;
};

// Event Listeners
searchBtn.addEventListener('click', async function (e) {
  e.preventDefault();

  mealsElement.innerHTML = '';

  const meals = await getMeals(searchInput.value);



//   display meals on the DOM
  meals.forEach((meal) => {
    const html = `
        <div data-mealId=${meal.idMeal} class="card">
            <img src=${meal.strMealThumb}></img>
            <h3 class=""title>${meal.strMeal}</h3>
        </div>
      `;

    mealsElement.insertAdjacentHTML('beforeend', html);
  });

  const allCardsElement = document.querySelectorAll('.card');

  allCardsElement.forEach((meal) => {
    meal.addEventListener('click', async function (e) {
      singleMealContent.innerHTML = '';
      const cardWrapper = e.target.closest('.card');

      const id = cardWrapper.dataset.mealid;
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(apiUrl);
      const singleMeal = await result.json();
      const meal = singleMeal.meals[0];

      const html = `
          <div>
            <img src=${meal.strMealThumb}></img>
              <h3 class="item-title">${meal.strMeal}</h3>
              <ul>
                <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
                <li>${meal.strMeasure8} ${meal.strIngredient8}</li>
                <li>${meal.strMeasure9} ${meal.strIngredient9}</li>
                <li>${meal.strMeasure10} ${meal.strIngredient10}</li>


                </ul>
          </div>
        `;
      singleMealContent.insertAdjacentHTML('beforeend', html);
    });
  });
});
