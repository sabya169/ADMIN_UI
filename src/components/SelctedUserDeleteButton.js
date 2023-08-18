const SelctedUserDeleteButton = ({ currentPageUsers, dispatch }) => {
  const selectedUsers = currentPageUsers
    .filter((userData) => userData.selected)
    .map((userData) => userData.id);

  const handleOnClick = () => {
    dispatch({type: 'SELECTED_USER_DATA_DELETE', payload: selectedUsers})
  }

  return (
    <button
      disabled={selectedUsers.length ? false : true}
      className="delete_all_selected_btn_users"
      onClick={handleOnClick}
    >
      <span className="material-symbols-outlined">Delete</span>
       {selectedUsers.length} Selected Users
    </button>
  );
};


export default SelctedUserDeleteButton;
