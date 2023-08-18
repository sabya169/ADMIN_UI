import * as utils from "../utils/utils";
const Starting_Page = 1;

const initial_State_Element = {
  _allUsersData: [],
  users: [],
  currentPageUsers: [],
  currentUserBeingEdited: {},
  searchText: "",
  isLoadingUsers: false,
  isAllUsersSelected: false,
  isUserEditDialogOpen: false,
  currentPage: 1,
  error: {},
};

const usersReducer = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST_INITIATED": {
      return {
        ...state,
        isLoadingUsers: true,
      };
    }
    case "REQUESTING_USER_DATA_SUCCESS": {
      return {
        ...state,
        isLoadingUsers: false,
        users: payload,
        _allUsersData: payload,
        currentPageUsers: utils.getCurrentPageUsersData(
          payload,
          state.currentPage,
          state.isAllUsersSelected
        ),
      };
    }
    case "REQUESTING_USER_DATA_FAILUER": {
      return {
        ...state,
        isLoadingUsers: false,
        error: payload,
      };
    }
    case "CURRENT_PAGE_UPDATION": {
      return {
        ...state,
        currentPage: payload,
        currentPageUsers: utils.getCurrentPageUsersData(
          state.users,
          payload,
          state.isAllUsersSelected
        ),
      };
    }
    case "SEARCHING_TEXT_UPDATION": {
      return {
        ...state,
        searchText: payload,
      };
    }
    case "SEARCHED_USER_DATA_UPDATION": {
      return {
        ...state,
        users: payload,
        currentPageUsers: utils.getCurrentPageUsersData(
          payload,
          Starting_Page,
          state.isAllUsersSelected
        ),
        currentPage: Starting_Page,
      };
    }
    case "USER_DATA_SELECT_TOGGLER": {
      return {
        ...state,
        currentPageUsers: utils.usersSelectToggler(
          state.currentPageUsers,
          payload
        ),
        isAllUsersSelected: false,
      };
    }
    case "CURRENT_PAGE_USERS_SELECT_TOGGLER": {
      return {
        ...state,
        isAllUsersSelected: payload,
        currentPageUsers: utils.allCurrentPageUserDataSelectToggler(
          state.currentPageUsers,
          payload
        ),
      };
    }
    case "SELECTED_USER_DATA_DELETE": {
      return {
        ...state,
        ...utils.currentPageAndUsersDataUpdateOnDelete(
          state.users,
          state.currentPage,
          payload,
          state._allUsersData,
          false
        ),
        searchText: "",
        _allUsersData: utils.usersDataDelete(state._allUsersData, payload),
        users: utils.usersDataDelete(state.users, payload, state._allUsersData),
        isAllUsersSelected: false,
      };
    }
    case "EDITED_USER_DATA_UPDATE": {
      return {
        ...state,
        _allUsersData: utils.getUsersUpdatedData(state._allUsersData, payload),
        users: utils.getUsersUpdatedData(state.users, payload),
        currentPageUsers: utils.getCurrentPageUsersUpdatedData(
          state.users,
          payload,
          state.currentPage,
          state.isAllUsersSelected
        ),
        isUserEditDialogOpen: false,
      };
    }
    case "USER_DATA_EDIT_DIALOG_OPEN": {
      return {
        ...state,
        isUserEditDialogOpen: true,
        currentUserBeingEdited: payload,
      };
    }
    case "USER_DATA_EDIT_DIALOG_CLOSE": {
      return {
        ...state,
        isUserEditDialogOpen: false,
      };
    }
    default: {
      throw new Error(`Invalid action type ${type}`);
    }
  }
};

export { initial_State_Element, usersReducer };
