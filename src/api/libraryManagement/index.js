import { sendRequestWithJson, sendRequest } from "api/api";

export const addLibrarySection = async ( userId, formData) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/librarysection/create/${userId}`,
      formData,
      "POST"
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllLibrarySection = async (schoolId, userId) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/librarysection/all/${schoolId}/${userId}`,
      {},
      "GET"
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new err();
  }
};

export const addLibraryShelf = async (userId, formData) => {
  try {
    const { data } = await sendRequest(
      `${process.env.REACT_APP_API_URL}/api/school/libraryshelf/create/${userId}`,
      formData,
      "POST"
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new err();
  }
};

export const getAllLibraryShelf=async(schoolId,userId)=>{

}