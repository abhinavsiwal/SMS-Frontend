export const addDepartment = (userId, token, data) => {
  const url = `http://35.174.4.42:5000/api/department/create/${userId}`;
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

export const updateDepartment = (departmentId, userId, token, data) => {
  const url = `http://35.174.4.42:5000/api/department/edit/${departmentId}/${userId}`;
  return fetch(url, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    body: data,
  })
    .then((data) => {
      console.log("data", data);
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getDepartment = (schoolId, userId, token) => {
  const url = `http://35.174.4.42:5000/api/department/all/${schoolId}/${userId}`;
  return fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteDepartment = (departmentId, userId, token) => {
  const url = `http://35.174.4.42:5000/api/department/delete/${departmentId}/${userId}`;
  return fetch(url, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
