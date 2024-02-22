import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ColumnType, TaskListType } from "../../types/TaskTypes";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { AddTask, Edit } from "@mui/icons-material";
import moment from "moment";
import { tableCellClasses } from "@mui/material/TableCell";

import { ConfirmationDialog } from "../Dialog";
import styled from "@emotion/styled";
import HttpService from "../../../service/Https-services";
import { API_ROUTES } from "../../../utils/constant";
import { toast } from "react-toastify";
interface ListTableProps {
  columns: ColumnType[];
  rows: TaskListType[];
  handleNavigation: () => void;
  getAllTask: () => void;
  onClickOfEditButton: (id: string) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListTable(props: ListTableProps) {
  const { columns, rows, handleNavigation, onClickOfEditButton, getAllTask } =
    props;
  const handleClickDelete = async (id: string) => {
    try {
      const response = await HttpService.deleteData(
        API_ROUTES.UpdateTask.replace(":id", id)
      );
      if (response.data.message) {
        toast.success(response.data.message);
        getAllTask();
      }
    } catch (error: any) {}
  };
  return (
    <TableContainer component={Paper}>
      {rows?.length > 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {columns?.map((column: ColumnType, index: number) => (
                <StyledTableCell sx={{ color: "#fff" }} key={index}>
                  {column.name}
                </StyledTableCell>
              ))}
              <StyledTableCell> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.sort((a: TaskListType, b: TaskListType) =>
                a.id < b.id ? 1 : -1
              )

              .map((row: any) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>
                    <Typography variant="body2">{row.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">{row.description}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">{row.priority}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    {row?.due_date && (
                      <Typography variant="body2">
                        {moment(row?.due_date)
                          .format("MMM DD, YYYY hh:mm a")
                          .toUpperCase()}
                      </Typography>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction={"row"} gap={1}>
                      <IconButton onClick={() => onClickOfEditButton(row?.id)}>
                        <Edit />
                      </IconButton>
                      <ConfirmationDialog
                        handleClickDelete={() => handleClickDelete(row?.id)}
                      />
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <Stack
          sx={{
            minHeight: "200px",
            justifyContent: "center",
            alignItems: "center",
            width: 1,
            gap: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h3">
            No Task Found Please Create New Task
          </Typography>
          <Button size="small" variant="contained" onClick={handleNavigation}>
            <IconButton>
              <AddTask fontSize="small" sx={{ color: "#fff" }} />
            </IconButton>
            Add New Task
          </Button>
        </Stack>
      )}
    </TableContainer>
  );
}
