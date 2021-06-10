import axios from 'axios';

/**
 * Returns a single mercandise item based on primary_key and alerts any errors that arise - returns false if failed
 * @returns merchandise item
 */
const getMerchandise = (primary_key) => {
	return axios
		.get('http://localhost:5000/merchandise/get', {
			params: {
				primary_key,
			},
		})
		.then((res) => {
			if (res.data.status === 200) return res.data.data;
			else {
				alert(res.data.message);
				return false;
			}
		})
		.catch((err) => {
			alert('An error has occurred in fetching merch info');
			return false;
		});
};

const getAllMerchandise = () => {
	return axios
		.get('http://localhost:5000/merchandise/get_all')
		.then((res) => {
			if (res.data.status === 200) return res.data.data;
			else {
				alert(res.data.message);
				return false;
			}
		})
		.catch((err) => {
			alert('An error has occurred in getting all merchandise');
			return false;
		});
};

export { getAllMerchandise, getMerchandise };
