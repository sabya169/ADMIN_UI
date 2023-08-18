import TableBody from "./TableBody";
import UsersTableHeader from "./UsersTableHeader";
import '../styles/DashBoard/UserDataTable.css';

const UsersDataTable = ({ users, dispatch, currentPage, isAllUsersSelected }) => {
  return (
    <div className="table-user-container">
      <table className="main-users-table">
        <UsersTableHeader
          dispatch={dispatch}
          isAllUsersAreSelected={isAllUsersSelected}
        />
        <TableBody
          allusers={users}
          dispatch={dispatch}
        />
      </table>
    </div>
  );
};

export default UsersDataTable;