import React, { Component } from "react";
import UserTable from "../../component/admin/UserTable";

class UserManagement extends Component {
  render() {
    return (<div>
      <h1>User Management</h1>
      <UserTable></UserTable>
    </div>);
  }
}

export default UserManagement;
