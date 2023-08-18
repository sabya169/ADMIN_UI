import { user_per_page } from "../config/config";

const getCurrentPageUsersData = (all_users, currentPage, isAllUsersSelected) => {
  const starting_index_no = currentPage * user_per_page - user_per_page;
  const ending_index_no = currentPage * user_per_page;
  return all_users
    .slice(starting_index_no, ending_index_no)
    .map((userData) => ({ ...userData, selected: isAllUsersSelected }));
};

const usersSelectToggler = (all_users, targetUserId) => {
  return all_users.map((userData) => {
    if (userData.id === targetUserId) return { ...userData, selected: !userData.selected };
    else return userData;
  });
};

const usersDataDelete = (users, target_Users_Data, allUsers = users) => {
  if (!Array.isArray(target_Users_Data)) target_Users_Data = [target_Users_Data];

  const updatedUsersData = users.filter((userData) => !target_Users_Data.includes(userData.id));
  
  if (!updatedUsersData.length) {
    const remainingUsersData = allUsers.filter(
      (userData) => !target_Users_Data.includes(userData.id)
    );
    return remainingUsersData.length ? remainingUsersData : [];
  }

  return updatedUsersData;
};

const allCurrentPageUserDataSelectToggler = (all_users, isSelect) => {
  if (isSelect) {
    return all_users.map((userData) => ({ ...userData, selected: true }));
  } else {
    return all_users.map((userData) => ({ ...userData, selected: false }));
  }
};

const currentPageUpdateOnDelete = (
  users_Data,
  current_Page_No,
  target_Users_Data,
  allUsers_Data
) => {
  const updatedUsersData = usersDataDelete(users_Data, target_Users_Data, allUsers_Data);
  if (
    updatedUsersData.length <=
    current_Page_No * user_per_page - user_per_page
  ) {
    return current_Page_No - 1;
  }
  return current_Page_No;
};

const currentPageAndUsersDataUpdateOnDelete = (
  users_Data,
  currentPageNo,
  target_Users_Data,
  allUsers_Data,
  is_AllUsers_Selected
) => {
  const updated_Page_No = currentPageUpdateOnDelete(
    users_Data,
    currentPageNo,
    target_Users_Data,
    allUsers_Data
  );
  const filtered_Users_Data = usersDataDelete(users_Data, target_Users_Data, allUsers_Data);
  const updatedCurrentPageUsers = getCurrentPageUsersData(
    filtered_Users_Data,
    updated_Page_No,
    is_AllUsers_Selected
  );

  return {
    currentPageNo: updated_Page_No,
    currentPageUsers: updatedCurrentPageUsers,
  };
};

const getUsersUpdatedData = (All_users, updated_User_Data) => {
  return All_users.map((userData) => {
    if (userData.id === updated_User_Data.id) return { ...userData, ...updated_User_Data };
    return userData;
  });
};

const getCurrentPageUsersUpdatedData = (
  All_users,
  updated_User_Data,
  currentPage,
  is_AllUsers_Selected
) => {
  const updated_Users_Data = getUsersUpdatedData(All_users, updated_User_Data);
  return getCurrentPageUsersData(updated_Users_Data, currentPage, is_AllUsers_Selected);
};

export {
  getCurrentPageUsersData,
  usersSelectToggler,
  usersDataDelete,
  allCurrentPageUserDataSelectToggler,
  currentPageUpdateOnDelete,
  currentPageAndUsersDataUpdateOnDelete,
  getUsersUpdatedData,
  getCurrentPageUsersUpdatedData,
};
