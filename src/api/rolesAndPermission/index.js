import { sendRequest } from "api/api";

export const addRole = async(userId,formData)=>{
    try {
        const data = await sendRequest(`${process.env.REACT_APP_API_URL}/api/school/role/create/${userId}`,formData,"POST")
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
} 