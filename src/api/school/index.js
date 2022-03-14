import { sendRequest } from "api/api";

export const schoolProfile = async (schoolId,userId) => {
  try {
    const data = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/doc/details/view/${schoolId}/${userId}`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
