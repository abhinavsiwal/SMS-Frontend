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

export const allStaffs = (userId, token, data = {}) => {
  const url = `http://35.174.4.42:5000/api/school/staff/all/${userId}`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
