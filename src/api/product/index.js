import { sendRequest } from "api/api";


export const createProduct = async (userId, formData) => {
    try {
      const { data } = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/school/product/create/${userId}`,
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