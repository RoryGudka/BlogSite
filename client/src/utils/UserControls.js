import axios from "axios";

const login = (username, password) => {
    return axios
        .post("http://localhost:5000/login", {
        username,
        password
        })
        .then((res) => {
        if (res.data.status === 200) return res.data.data;
        else {
            alert(res.data.message);
            return false;
        }
        })
        .catch((err) => {
        alert("There was an error");
        return false;
    });
}
  
const signup = (username, password, name, email) => {
    return axios
        .post("http://localhost:5000/signup", {
            username,
            password,
            name,
            email
        })
        .then((res) => {
            if (res.data.status === 200) return res.data.data;
            else {
            alert(res.data.message);
            return false;
            }
        })
        .catch((err) => {
        alert("There was an error");
        return false;
    });
}

const getAllUsers = (user) => {
    return axios
        .get("http://localhost:5000/users/get", {
        params: {
            ...user,
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
        alert("An error has occurred");
        return false;
    });
};
  
const addUser = (data, user) => {
    return axios
        .post("http://localhost:5000/users/add", {
        ...user,
        primary_key: data.name,
        data,
        })
        .then((res) => {
        if (res.data.status === 200) return true;
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
  
const editUser = (primary_key, data, user) => {
    return axios
        .put("http://localhost:5000/users/edit", {
        ...user,
        data,
        primary_key,
        })
        .then((res) => {
        if (res.data.status === 200) return true;
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
  
const deleteUser = (primary_key, user) => {
    return axios
        .delete("http://localhost:5000/users/remove", {
        params: {
            ...user,
            primary_key,
        },
        })
        .then((res) => {
        if (res.data.status === 200) return true;
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

export {login, signup, getAllUsers, addUser, editUser, deleteUser}