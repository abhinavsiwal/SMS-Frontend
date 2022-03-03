import { sendRequest } from "api/api";

export const addStaff = (userId, token, data = {}) => {
  const url = `http://35.174.4.42:5000/api/school/staff/create/${userId}`;
  return fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    body: data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const allStaffs = async (userId) => {
  try {
    const data = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/staff/all/${userId}`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addAttendance = () => {
  const url = `https://jsonplaceholder.typicode.com/todos/1`;
  return fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log("data", data);
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
