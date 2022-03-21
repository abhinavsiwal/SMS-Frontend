export const createTimeTable = (userId, token, data) => {
  const url = `${process.env.REACT_APP_API_URL}/api/school/timetable/create/${userId}`;
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
