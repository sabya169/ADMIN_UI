import PaginationListData from "./PaginationListData";
import PaginationActionElement from "./PaginationActionElement";
import "../styles/DashBoard/Paginate.css";

const Paginate = ({ currentPageNo, totalPageNo, dispatch }) => {
  const handleItemInPagination = (event, selectedPage) => {
    event.preventDefault();
    if (selectedPage < 1 || selectedPage > totalPageNo) return;
    dispatch({ type: "CURRENT_PAGE_UPDATION", payload: selectedPage });
  };

  return (
    <ul className="pagination">
      <PaginationActionElement
        handleItemInPagination={handleItemInPagination}
        totalPageNo={totalPageNo}
        instantPage={currentPageNo}
      >
        <PaginationListData
          handleItemInPagination={handleItemInPagination}
          totalPageNo={totalPageNo}
          instantPage={currentPageNo}
        />
      </PaginationActionElement>
    </ul>
  );
};

export default Paginate;
