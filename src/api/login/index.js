import axios from "axios";

const adminLogin = (username, password) => {
  // let axiosConfig = {
  // 	headers: {
  // 		'Content-Type': 'application/json;charset=UTF-8',
  // 	}
  // };
  // try {
  // 	const res = axios.post('http://35.174.4.42:5000/api/school/signin', axiosConfig, {
  // 		email: username,
  // 		password: password
  // 	});
  // 	return res;
  // }
  // catch (err) {
  // 	throw err;
  // }
  const user = { email: username, password: password };
  console.log(user);
  return fetch(`${process.env.REACT_APP_API_URL}/api/school/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(user),
  })
    .then((Response) => {
      //   console.log(Response.json());
      return Response.json();
    })
    .catch((err) => console.log(err));
};

const staffLogin = async (username, password) => {
  try {
    const {data} = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/school/staff/signin`,
      {
        SID: username,
        password: password,
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const studentLogin = async (username, password) => {
  try {
    const {data} =await axios.post(`${process.env.REACT_APP_API_URL}/api/school/student/signin`, {
      SID: username,
      password: password,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { adminLogin, staffLogin, studentLogin };
