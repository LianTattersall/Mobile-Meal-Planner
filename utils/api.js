import axios from "axios";

const mealPlannerApi = axios.create({
  baseURL: "https://be-test-ol1k.onrender.com/api",
});

export const postUser = (user_id, display_name, avatar_url, email) => {
  return mealPlannerApi
    .post("/users", { user_id, display_name, avatar_url, email })
    .then((data) => {
      return data;
    });
};

export const postUserToCalendar = (user_id) => {
  return mealPlannerApi
    .post(`/users/${user_id}/calendar`, {})
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMealsForUserByDate = (user_id, date) => {
  return mealPlannerApi
    .get(`/users/${user_id}/calendar/${date}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMealToCalendar = (
  user_id,
  date,
  meal,
  recipie_id,
  my_recipie,
  recipie_name
) => {
  const postInfo = {};
  postInfo[meal.toLowerCase()] = { recipie_id, my_recipie, recipie_name };
  return mealPlannerApi
    .post(`/users/${user_id}/calendar/${date}`, postInfo)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
