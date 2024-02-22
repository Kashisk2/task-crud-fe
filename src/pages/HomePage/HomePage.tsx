import { FC, useCallback, useEffect, useState } from "react";
import HttpService from "../../service/Https-services";
import { API_ROUTES, PAGE_ROUTES, TABLE_COLUMN } from "../../utils/constant";
import { TaskListType } from "../../common/types/TaskTypes";
import { Box, Button, IconButton } from "@mui/material";
import ListTable from "../../common/components/Table";
import { useNavigate } from "react-router-dom";
import { AddTask } from "@mui/icons-material";

export const HomePage: FC = () => {
  // State to store the list of tasks
  const [taskList, setTaskList] = useState<TaskListType[]>([]);
  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle click event of edit button
  const onClickOfEditButton = (id: string) => {
    // Navigate to edit task page with task id
    navigate(PAGE_ROUTES.EditTask.replace(":id", id));
  };

  // Function to fetch all tasks
  const getAllTask = useCallback(async () => {
    try {
      // Call API to get all tasks
      const res = await HttpService.get(API_ROUTES.GetAllTask);
      // If response contains data, update task list
      if (res?.data?.data) {
        setTaskList(res?.data?.data);
      }
    } catch (error) {
      // Handle error if any
      console.error("Error fetching tasks:", error);
    }
  }, []);

  // Effect hook to fetch all tasks on component mount
  useEffect(() => {
    getAllTask();
    // Cleanup function
  }, [getAllTask]);

  return (
    <Box>
      {/* Button to navigate to add task page */}
      <Box sx={{ py: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            navigate(PAGE_ROUTES.AddTask);
          }}
        >
          <IconButton>
            <AddTask fontSize="small" sx={{ color: "#fff" }} />
          </IconButton>
          Add New Task
        </Button>
      </Box>

      {/* Table component to display list of tasks */}
      <ListTable
        getAllTask={getAllTask}
        onClickOfEditButton={onClickOfEditButton}
        columns={TABLE_COLUMN}
        rows={taskList}
      />
    </Box>
  );
};
