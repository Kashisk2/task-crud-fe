import { FC, useCallback, useEffect, useState } from "react";
import HttpService from "../../service/Https-services";
import { API_ROUTES, PAGE_ROUTES, TABLE_COLUMN } from "../../utils/constant";
import { TaskListType } from "../../common/types/TaskTypes";
import { Box, Button, IconButton } from "@mui/material";
import ListTable from "../../common/components/Table";
import { useNavigate } from "react-router-dom";
import { AddTask } from "@mui/icons-material";

export const HomePage: FC = () => {
  const [taskList, setTaskList] = useState<TaskListType[]>([]);
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(PAGE_ROUTES.AddTask);
  };
  const onClickOfEditButton = (id: string) => {
    navigate(PAGE_ROUTES.EditTask.replace(":id", id));
  };
  const getAllTask = useCallback(async () => {
    try {
      const res = await HttpService.get(API_ROUTES.GetAllTask);
      if (res?.data?.data) {
        setTaskList(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    getAllTask();
    return () => {};
  }, [getAllTask]);

  return (
    <Box>
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

      <ListTable
        getAllTask={getAllTask}
        handleNavigation={handleNavigation}
        onClickOfEditButton={onClickOfEditButton}
        columns={TABLE_COLUMN}
        rows={taskList}
      />
    </Box>
  );
};
