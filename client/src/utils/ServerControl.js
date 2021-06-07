import axios from "axios";

/**
 * Returns all blog posts and alerts any errors that arise - returns false if failed
 * @returns All blog posts : array
 */
const getAllBlogPosts = () => {
  return axios
    .get("http://localhost:5000/blog_posts/get_all")
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

/**
 * Returns a single blog post based on primary_key and alerts any errors that arise - returns false if failed
 * @returns All blog posts : array
 */
 const getBlogPost = (primary_key) => {
  return axios
    .get("http://localhost:5000/blog_posts/get", {
      params: {
        primary_key
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

const getUsers = (user) => {
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

export {
  getAllBlogPosts,
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
