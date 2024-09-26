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

export const deleteMeal = (user_id, date, meal) => {
  return mealPlannerApi.delete(`/users/${user_id}/calendar/${date}/${meal}`);
};

export const getListsByUserId = (user_id) => {
  return mealPlannerApi.get(`/users/${user_id}/lists`).then(({ data }) => {
    return data;
  });
};

export const getUsers = (searchTerm) => {
  return mealPlannerApi
    .get(`/users`, { params: { searchTerm } })
    .then(({ data }) => {
      return data;
    });
};

export const postList = (list_name, people) => {
  return mealPlannerApi
    .post(`/lists`, { list_name, people })
    .then(({ data }) => {
      return data;
    });
};

export const addListToUser = (user_id, list_id, list_name) => {
  return mealPlannerApi
    .post(`users/${user_id}/lists`, { list_id, list_name })
    .then(({ data }) => {
      return data;
    });
};
