import { sendRequest } from "api/api";
import { sendRequestWithJson } from "api/api";

export const addStudent = (userId, token, data = {}) => {

  const url = `http://35.174.4.42:5000/api/school/student/create/${userId}`;
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

export const allStudents = (schoolId,userId, token, data = {}) => {
  const url = `http://35.174.4.42:5000/api/school/student/all/${schoolId}/${userId}`;
  return fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteStudent = async(studentId,id)=>{
  try {
    const data = await sendRequestWithJson(
      `${process.env.REACT_APP_API_URL}/api/school/student/delete/${studentId}/${id}`,
      {},
      "DELETE"
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const updateStudent = async(studentId,id,data={})=>{
  try {
    const data = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/student/edit/${studentId}/${id}`,data,"PUT"
    )

    console.log(data);;
  } catch (err) {
    console.log(err);
    throw err;
  }
}