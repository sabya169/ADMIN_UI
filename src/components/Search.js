import { useEffect } from "react";
import "../styles/DashBoard/Search.css";

const Search = ({ allusers, search_Text, dispatch }) => {
  const handleOnSearchTextChange = (event) => {
    dispatch({ type: "SEARCHING_TEXT_UPDATION", payload: event.target.value });
  };

  const searchTextMatchingUsersData = (search_Text) => {
    if (!search_Text) return allusers;

    search_Text = search_Text.toLowerCase();

    return allusers.filter((userData) => {
      return (
        userData.name.toLowerCase().includes(search_Text) ||
        userData.email.toLowerCase().includes(search_Text) ||
        userData.role.toLowerCase().includes(search_Text)
      );
    });
  };

  useEffect(() => {
    const searchTextMatchingUsers = searchTextMatchingUsersData(search_Text);
    dispatch({
      type: "SEARCHED_USER_DATA_UPDATION",
      payload: searchTextMatchingUsers,
    });
  }, [search_Text]);

  return (
    <div className="search">
      <input
        value={search_Text}
        onChange={handleOnSearchTextChange}
        className="searching-input"
        type="text"
        placeholder="Search by name, email or role"
      />
    </div>
  );
};

export default Search;
