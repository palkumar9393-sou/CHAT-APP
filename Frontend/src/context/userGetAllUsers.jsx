import { useEffect, useState } from "react";
import axios from "axios";

function userGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "/api/user/getUserProfile",
          {
            withCredentials: true,
          }
        );

        console.log("Users response:", response.data);

        setAllUsers(response.data.filteredUsers);
      } catch (error) {
        console.log(
          "Error in useGetAllUsers:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default userGetAllUsers;