import { userData_API, user_per_page } from "../config/config.js";
import { useReducer, useEffect, useRef } from "react";
import { initial_State_Element, usersReducer } from "../reducers/usersReducer";
import Loading from "./Loading";
import Search from "./Search";
import UsersDataTable from "./UsersDataTable";
import axios from "axios";
import Paginate from "./Paginate";
import SelctedUserDeleteButton from "./SelctedUserDeleteButton";
import GetError from "./GetError";
import UserEditDialog from "./UserEditDialog";
import "../styles/DashBoard/MainDashBoard.css";

const MainDashboard = () => {
  const [state, dispatch] = useReducer(usersReducer, initial_State_Element);
  const totalPageNo = Math.ceil(state.users.length / user_per_page);
  const inputNameRef = useRef(null);

  useEffect(() => {
    if (state.isUserEditDialogOpen) {
      inputNameRef.current.focus();
    }
  }, [state.isUserEditDialogOpen]);

  const getUsersData = async () => {
    dispatch({ type: "REQUEST_INITIATED" });
    try {
      const response = await axios.get(userData_API);
      const allUsers = response.data;
      dispatch({ type: "REQUESTING_USER_DATA_SUCCESS", payload: allUsers });
    } catch (error) {
      dispatch({ type: "REQUESTING_USER_DATA_FAILUER", payload: error });
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const elementsOfUI = (
    <>
      <Search
        allusers={state._allUsersData}
        search_Text={state.searchText}
        dispatch={dispatch}
      />
      {state.users.length ? (
        <>
          <UsersDataTable
            users={state.currentPageUsers}
            dispatch={dispatch}
            currentPage={state.currentPage}
            isAllUsersSelected={state.isAllUsersSelected}
          />
          {state.isUserEditDialogOpen && (
            <UserEditDialog
              user={state.currentUserBeingEdited}
              dispatch={dispatch}
              ref={inputNameRef}
            />
          )}
          <Paginate
            currentPageNo={state.currentPage}
            totalPageNo={totalPageNo}
            dispatch={dispatch}
          />
          <SelctedUserDeleteButton
            currentPageUsers={state.currentPageUsers}
            dispatch={dispatch}
          />{" "}
        </>
      ) : (
        <div>
          <h2 className="not_found_message">No users found!</h2>
        </div>
      )}
    </>
  );

  return (
    <div className="Main_dashboard">
      {state.isLoadingUsers ? (
        <Loading />
      ) : state.error.code ? (
        <GetError error_msg={state.error} />
      ) : (
        elementsOfUI
      )}
    </div>
  );
};

export default MainDashboard;
