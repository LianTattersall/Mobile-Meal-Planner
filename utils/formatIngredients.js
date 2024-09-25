export function formatIngredients(recipie) {
  let cont = true;
  let i = 1;
  const ingredients = [];
  while (cont) {
    const key = "strIngredient" + String(i);
    const key2 = "strMeasure" + String(i);
    if (recipie[key]) {
      ingredients.push(recipie[key2] + " " + recipie[key]);
      i++;
    } else {
      cont = false;
    }
  }
  return ingredients;
}
