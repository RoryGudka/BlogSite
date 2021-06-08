import axios from "axios";

const getAllMerchandise = () => {
    return axios
        .get("http://localhost:5000/merchandise/get_all")
        .then((res) => {
        if (res.data.status === 200) return res.data.data;
        else {
            alert(res.data.message);
            return false;
        }
        })
        .catch((err) => {
        alert("An error has occurred");
        return false;
    });
};

export {getAllMerchandise};