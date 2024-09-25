import axios from "axios";

const mealsApi = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
});

exports.getMealsByCategory = (category) => {
  return mealsApi
    .get("/filter.php", { params: { c: category } })
    .then(({ data }) => {
      return data;
    });
};

function addMealsToArr(meals, results) {
  if (meals) {
    meals.forEach((meal) => {
      results.push({
        strMealThumb: meal.strMealThumb,
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
      });
    });
  }
}

exports.getMealsBySearchQuery = (searchQuery) => {
  const s = searchQuery.replace(" ", "_");
  const results = [];
  return mealsApi
    .get("/search.php", { params: { s } })
    .then(({ data }) => {
      addMealsToArr(data.meals, results);
      return mealsApi.get("filter.php", { params: { i: s } });
    })
    .then(({ data }) => {
      addMealsToArr(data.meals, results);
      return mealsApi.get("filter.php", { params: { c: s } });
    })
    .then(({ data }) => {
      addMealsToArr(data.meals, results);
      return mealsApi.get("filter.php", { params: { a: s } });
    })
    .then(({ data }) => {
      addMealsToArr(data.meals, results);
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRecipieById = (recipie_id) => {
  return mealsApi
    .get("/lookup.php", { params: { i: recipie_id } })
    .then(({ data }) => {
      return data;
    });
};
