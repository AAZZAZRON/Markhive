import axios from "axios"

const callGetApi = async (url) => {
    const response = await axios.get(url).catch(err=>err.response);

    return response;
}

export default callGetApi;