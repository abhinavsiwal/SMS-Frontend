import {sendRequestWithJson} from 'api/api'

export const signIn = async(username, password) => {
  const url = `${process.env.REACT_APP_API_URL}/api/school/signin`;
  try {
    const {data} = await sendRequestWithJson(url,{SID:username,password},"POST");
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
