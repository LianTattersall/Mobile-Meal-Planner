import axios from "axios";

const mealPlannerApi = axios.create({
  baseURL: "https://be-test-ol1k.onrender.com/api",
});

export const postUser = (user_id, display_name, avatar_url) => {
  return mealPlannerApi
    .post("/users", { user_id, display_name, avatar_url })
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
