import axios from "axios";

const getTeacher = (primary_key, user) => {
    return axios
        .get("http://localhost:5000/teachers/get", {
        params: {
            primary_key,
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

const getAllTeachers = (user) => {
    return axios
        .get("http://localhost:5000/teachers/get_all", {
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

const addTeacher = (data, user) => {
    return axios
        .post("http://localhost:5000/teachers/add", {
        ...user,
        primary_key: data.employee_id,
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

const editTeacher = (primary_key, data, user) => {
    return axios
        .put("http://localhost:5000/teachers/edit", {
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

const deleteTeacher = (primary_key, user) => {
    return axios
        .delete("http://localhost:5000/teachers/remove", {
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

export {getTeacher, getAllTeachers, addTeacher, editTeacher, deleteTeacher}