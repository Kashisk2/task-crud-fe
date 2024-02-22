import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Stack,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import moment from "moment";
import styled from "@emotion/styled";
import HttpService from "../../../service/Https-services";
import { API_ROUTES, PriorityOption } from "../../../utils/constant";
import { toast } from "react-toastify";
import { EllipsisContent } from "../EllipsesContent";
import { ColumnType, TaskListType } from "../../types/TaskTypes";
import { ConfirmationDialog } from "../Dialog";

// Define the props interface for the ListTable component
interface ListTableProps {
  columns: ColumnType[];
  rows: TaskListType[];
  getAllTask: () => void;
  onClickOfEditButton: (id: string) => void;
}

// StyledTableCell component using styled from emotion
const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// StyledTableRow component using styled from emotion
const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// ListTable component
export default function ListTable(props: ListTableProps) {
  const { columns, rows, onClickOfEditButton, getAllTask } = props;

  // Function to handle delete button click
  const handleClickDelete = async (id: string) => {
    try {
      const response = await HttpService.deleteData(
        API_ROUTES.UpdateTask.replace(":id", id)
      );
      if (response.data.message) {
        toast.success(response.data.message);
        getAllTask();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // Function to render background color based on priority
  const renderBgColor = (priority: string) => {
    const findColor = PriorityOption.find((el) => el.key === priority)?.bgcolor;
    return findColor;
  };

  return (
    <TableContainer component={Paper}>
      {rows?.length > 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Table Head */}
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
          {/* Table Body */}
          <TableBody>
            {/* Sorting data by id to show latest entry first */}
            {rows
              ?.sort((a: TaskListType, b: TaskListType) =>
                a.id < b.id ? 1 : -1
              )
              .map((row: any) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Name Column */}
                  <StyledTableCell>
                    <Typography variant="body2">{row.name}</Typography>
                  </StyledTableCell>
                  {/* Description Column */}
                  <StyledTableCell>
                    <Box>
                      <EllipsisContent
                        maxWidth={250}
                        variant="body2"
                        text={row.description}
                      />
                    </Box>
                  </StyledTableCell>
                  {/* Priority Column */}
                  <StyledTableCell>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: renderBgColor(row.priority),
                        borderRadius: "100px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2">{row.priority}</Typography>
                    </Box>
                  </StyledTableCell>
                  {/* Due Date Column */}
                  <StyledTableCell>
                    {row?.due_date && (
                      <Typography variant="body2">
                        {moment(row?.due_date)
                          .format("MMM DD, YYYY")
                          .toUpperCase()}
                      </Typography>
                    )}
                  </StyledTableCell>
                  {/* Action Column */}
                  <StyledTableCell>
                    <Stack direction={"row"}>
                      {/* Edit Button */}
                      <IconButton onClick={() => onClickOfEditButton(row?.id)}>
                        <Edit />
                      </IconButton>
                      {/* Confirmation Dialog for Delete */}
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
        // If no rows present, show message
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
            No Task Found. Please Create a New Task
          </Typography>
        </Stack>
      )}
    </TableContainer>
  );
}
