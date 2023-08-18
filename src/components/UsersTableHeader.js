const UsersTableHeader = ({ isAllUsersAreSelected, dispatch }) => {

  const TableHeaderColumnsData = ['Name', 'Email', 'Role', 'Actions'];

  const handleOnAllUserSelectToggle = (event) => {
    dispatch({type: 'CURRENT_PAGE_USERS_SELECT_TOGGLER', payload: event.target.checked})
  }

  
 

  return (
    <thead className="user-table-row-header">
      <tr>
        <th className="user-table-row-item">
          <input
            checked={isAllUsersAreSelected}
            aria-label='select-all-users'
            type="checkbox"
            onChange={handleOnAllUserSelectToggle}
          />
        </th>
        
        {
          TableHeaderColumnsData.map((userTableHeaderColumn, index) => (
            <th key={index} className="user-table-row-item">{userTableHeaderColumn}</th>
          ))
        }
      </tr>
    </thead>
  );
}

export default UsersTableHeader;