import { sendRequestWithJson } from "api/api";
import { sendRequest } from "api/api";

export const getAttendence = async (schoolId, id) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/attendance/all/${schoolId}/${id}`
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export const postAttendance = async (userId,bodyData) => {
  try {
    const  {data}  = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/attendance/create/${userId}`,bodyData,"POST"
    );
    console.log(data);
  } catch (err) {
      console.log(err);
      throw err;
  }
};
