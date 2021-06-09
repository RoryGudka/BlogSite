import axios from "axios";

const getTeacher = (primary_key, user) => {
  return axios
    .get("http://localhost:3001/teachers/get", {
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
    });
};

const getAllTeachers = (user) => {
  return axios
    .get("http://localhost:3001/teachers/get_all", {
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
    });
};

const addTeacher = (data, user) => {
  return axios
    .post("http://localhost:3001/teachers/add", {
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
    });
};

const editTeacher = (primary_key, data, user) => {
  return axios
    .put("http://localhost:3001/teachers/edit", {
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
    });
};

const deleteTeacher = (primary_key, user) => {
  return axios
    .delete("http://localhost:3001/teachers/remove", {
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
    });
};

const getUsers = (user) => {
  return axios
    .get("http://localhost:3001/users/get", {
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
    });
};

const addUser = (data, user) => {
  return axios
    .post("http://localhost:3001/users/add", {
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
    });
};

const editUser = (primary_key, data, user) => {
  return axios
    .put("http://localhost:3001/users/edit", {
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
    });
};

const deleteUser = (primary_key, user) => {
  return axios
    .delete("http://localhost:3001/users/remove", {
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
    });
};

export {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getTeacher,
  getAllTeachers,
  addTeacher,
  editTeacher,
  deleteTeacher,
};
