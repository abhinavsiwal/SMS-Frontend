import { sendRequest } from "../api";

export const canteenAdd = async (userId, formData) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/canteen/create/${userId}`,
      formData,
      "POST"
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new err;
  }
};

export const allCanteens = async (userId,schoolId) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/canteen/all/${schoolId}/${userId}`
    );
    console.log(data);
    return data;
  } catch (err) {
      console.log(err);
      throw new err;
  }
};

export const menuAdd = async (userId, formData) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/canteen/menu/add/${userId}`,
      formData,
      "POST"
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
