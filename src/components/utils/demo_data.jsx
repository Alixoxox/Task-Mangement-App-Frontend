  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  export const CreateUser = async ({name, email, password}) => {
    if (!name || !email || !password) {
      return { message: "All fields are required" };
    }
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };
  export const LoginUser = async ({email, password}) => {
    if (!email || !password) {
      return { message: "All fields are required" };
    }
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

export const UpdateUser = async ({name, email,password}) => {
    if (!name && !password) {
      return { message: "At least one field is required" };
    }
    const token=localStorage.getItem('user');
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/update/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ name,email, password }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  }
export const fetchTasks = async () => {
    const token=localStorage.getItem('user');
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/get/notes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  };

  export const createTask = async ({title, description, status, priority, dueDate}) => {

    const token=localStorage.getItem('user');
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/create/note`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ title, description, status, priority, dueDate }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  }
  export const updateTaskByid = async (taskData) => {
    const token = localStorage.getItem('user');
    
    // Explicitly create the payload with the 'id' key the backend wants
    const payload = {
        ...taskData,
        id: taskData._id || taskData.id // Map _id to id
    };

    try {
      const res = await fetch(`${BASE_URL}/api/users/update/note`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload), // Send the payload
        }
      );
      return await res.json();
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
}
  export const deleteTaskById = async (id) => {
    const token=localStorage.getItem('user');
    try {
      const res = await fetch(
        `${BASE_URL}/api/users/delete/note/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong" };
    }
  }

  export const checkServer = async () => {
    try {
      await fetch(`${BASE_URL}/api/users/checkServer`);
      return ;
    } catch (error) {
      return "error";
    }
  }
  