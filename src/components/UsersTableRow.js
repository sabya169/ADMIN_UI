import UserEditDialog from "./UserEditDialog";

const TableRow = ({ user, dispatch, indexNo }) => {

  

  const handleRowSelect = (userIdNo) => {
    dispatch({ type: "USER_DATA_SELECT_TOGGLER", payload: userIdNo });
  };

  const handleDelete = (userIdNo) => {
    dispatch({ type: "SELECTED_USER_DATA_DELETE", payload: userIdNo });
  };

  const handleEdit = (userData) => {
    dispatch({ type: "USER_DATA_EDIT_DIALOG_OPEN", payload: userData });
  };

  const row_ClassName = `users-table__row ${
    user.selected ? "user-table-row-selected" : ""
  }`;

  return (
    <>
      <tr className={row_ClassName}>
        <td className="user-table-row-item">
          <input
            checked={user.selected}
            aria-label={`select-user-${indexNo + 1}`}
            type="checkbox"
            onChange={() => handleRowSelect(user.id)}
          />
        </td>
        <td className="user-table-row-item">{user.name}</td>
        <td className="user-table-row-item">{user.email}</td>
        <td className="user-table-row-item">{user.role}</td>
        <td className="user-table-row-item">
          <span className="users-table-row-item-action-container">
            <button
              className="user-table-row-action-btn user-table-row-action-btn-edit"
              onClick={() => handleEdit(user)}
            >
              <span className="material-symbols-outlined">edit</span>
              {/* edit */}
            </button>
            <button
              className="user-table-row-action-btn user-table-row-action-btn-delete"
              onClick={() => handleDelete(user.id)}
            >
              <span className="material-symbols-outlined">delete</span>
              {/* delete */}
            </button>
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
