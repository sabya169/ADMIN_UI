const PaginationActionElement = ({
  handleItemInPagination,
  children,
  totalPageNo,
  instantPage,
}) => {
  const startingPageNo = 1;
  const lastPageNo = totalPageNo;

  const className_Of_Action_Item =
    "pagination-item pagination-list-item-icon";
  const disabled_ClassName_Of_Action_item = "pagination-list-item-disabled";

  const className_Of_Prev_Page = `${className_Of_Action_Item} ${
    instantPage <= 1 ? disabled_ClassName_Of_Action_item : ""
  }`;
  const className_Of_Next_Page = `${className_Of_Action_Item} ${
    instantPage >= totalPageNo ? disabled_ClassName_Of_Action_item : ""
  }`;

  return (
    <>
      <li className={className_Of_Prev_Page}>
        <a href="#" onClick={(e) => handleItemInPagination(e, startingPageNo)}>
          <span className="material-symbols-outlined">
            start
          </span>
        </a>
      </li>
      <li className={className_Of_Prev_Page}>
        <a
          href="#"
          onClick={(e) => handleItemInPagination(e, instantPage - 1)}
        >
          <span className="material-symbols-outlined">prev</span>
        </a>
      </li>
      {children}
      <li className={className_Of_Next_Page}>
        <a
          href="#"
          onClick={(e) => handleItemInPagination(e, instantPage + 1)}
        >
          <span className="material-symbols-outlined">next</span>
        </a>
      </li>
      <li className={className_Of_Next_Page}>
        <a href="#" onClick={(e) => handleItemInPagination(e, lastPageNo)}>
          <span className="material-symbols-outlined">
            end
          </span>
        </a>
      </li>
    </>
  );
};

export default PaginationActionElement;
