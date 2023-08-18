import TableRow from "./UsersTableRow";

const TableBody = ({ allusers, dispatch }) => {
  return (
    <tbody>
      {allusers.map((userData, index) => (
        <TableRow
          key={userData.id}
          indexNo={index}
          user={userData}
          dispatch={dispatch}
        />
      ))}
    </tbody>
  );
};

export default TableBody;