const PaginationListData = ({
  totalPageNo,
  handleItemInPagination,
  instantPage,
}) => {
  const paginationListData = [...new Array(totalPageNo)].map((_, index) => {
    const className = `pagination-item ${
      instantPage === index + 1 ? "pagination-list-item-active" : ""
    }`;

    return (
      <li
        key={index}
        onClick={(e) => handleItemInPagination(e, index + 1)}
        className={className}
      >
        <a href="#">{index + 1}</a>
      </li>
    );
  });

  return paginationListData;
};

export default PaginationListData;
