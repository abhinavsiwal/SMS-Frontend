import {sendRequest} from '../api'

export const canteenAdd=async(userId,formData)=>{
try {
    const {data} = await sendRequest(`${process.env.REACT_APP_API_URL}/school/canteen/create/${userId}`,formData,"POST");
    console.log(data);
    return data;
} catch (err) {
    console.log(err);
    throw new err
}
}

export const addMenu=async(userId,formData)=>{
    try {
        const {data} = await sendRequest(`${process.env.REACT_APP_API_URL}/school/canteen/menu/add/${userId}`,formData)
    } catch (err) {
        console.log(err);
        throw err
    }
}