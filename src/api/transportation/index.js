import {sendRequest} from '../api';

export const routeAdd = async(userId,formData)=>{
    const url = `${process.env.REACT_APP_API_URL}/api/school/transportation/create/${userId}`
    try {
        const {data} = await sendRequest(url,formData,"POST");
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const routesAll=async(userId,schoolId)=>{
    const url = `${process.env.REACT_APP_API_URL}/api/school/transportation/all/${schoolId}/${userId}`
    try {
        const {data} = await sendRequest(url);
            console.log(data);
            return data;
    } catch (err) {
        console.log(err);
        throw new err;
    }
}

