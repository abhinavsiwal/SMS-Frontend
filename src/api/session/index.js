export const allSessions = (userId, schoolID, token) => {
    const url = `http://35.174.4.42:5000/api/school/session/all/${schoolID}/${userId}`;
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
  
  export const addSession = (userId, token, data) => {
    const url = `http://35.174.4.42:5000/api/school/session/create/${userId}`;
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