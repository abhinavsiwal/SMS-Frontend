export const allSections = (userId, schoolID, token) => {
  const url = `http://35.174.4.42:5000/api/school/section/all/${schoolID}/${userId}`;
  return fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const addSection = (userId, token, data) => {
  const url = `http://35.174.4.42:5000/api/school/section/create/${userId}`;
  return fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
    body: data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const addClassToSection = (userId, classId, token, data) => {
  const url = `http://35.174.4.42:5000/api/school/class/section/edit/${classId}/${userId}`;
  return fetch(url, {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
    body: data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
