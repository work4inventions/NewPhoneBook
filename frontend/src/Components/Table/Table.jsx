import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ data ,getData,handleUpdate}) => {
  const handleDelete = async(MobileNo) => {
    try {
     await fetch(`http://192.168.1.168:5000/deleteData/${MobileNo}`, {
        method: "DELETE",
      }).then((data) =>{getData()});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">FirstName</TableCell>
            <TableCell className="tableCell">LastName</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Mobile</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell className="tableCell">{row.id}</TableCell> */}
                <TableCell className="tableCell">{row.FirstName}</TableCell>
                <TableCell className="tableCell">{row.FirstName}</TableCell>
                <TableCell className="tableCell">{row.Email}</TableCell>
                <TableCell className="tableCell">{row.MobileNo}</TableCell>
                <TableCell className="tableCell">
                  <button
                    className={"edit"}
                    onClick={()=>{console.log(row);handleUpdate(row)}}
                  >
                    edit
                  </button>
                  <button className={"delete"}  onClick={()=>handleDelete(row.MobileNo)}>delete</button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <p className="empty">no record found</p>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
