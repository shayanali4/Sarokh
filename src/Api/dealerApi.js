import axios from 'axios';

export async function dealerDashboardApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/dashboard/${user.id}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });

}