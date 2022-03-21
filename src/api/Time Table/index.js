export const createTimeTable = (userId, schoolID, token) => {
  const url = `${process.env.REACT_APP_API_URL}/api/school/timetable/create/:id`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
