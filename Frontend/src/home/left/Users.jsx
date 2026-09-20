import React from "react";
import User from "./User";
import userGetAllUsers from "../../context/userGetAllUsers";

const Users = () => {
  const [allUsers,loading] = userGetAllUsers()
  console.log(allUsers);
  
  return (
    <div className=" py-2 flex-1 overflow-y-auto" style={{maxHeight:"calc(84vh - 1vh)"}} >
       {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
    </div>

  );
};

export default Users;
