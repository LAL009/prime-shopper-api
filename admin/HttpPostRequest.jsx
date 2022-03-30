
import axios from 'axios';


export const baseUrl = 'http://localhost:8080/'

const API_URL = `${baseUrl}api/v1`;

const HttpPostRequest = async (path, data = {}) => {

    const headers = { 'Authorization': 'UnAuthorized' };

    return new Promise((resolve, reject) => {

        axios.post(`${API_URL}${path}`, data, { headers: headers })
            .then(function (response) {

                try {

                    if (response.data.code !== 200) {
                        throw new Error(response.data.data);
                    }

                    resolve(response.data.data);

                } catch (error) {
                    throw new Error(error.message);
                }

            })
            .catch(function (error) {
                reject(error.message);
            });

    })

}

export default HttpPostRequest;
