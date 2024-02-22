export const PAGE_ROUTES = {
  HomePage: "/",
  AddTask: "/add-task",
  EditTask: "/edit-task/:id",
  Any: "*",
};

export const API_ROUTES = {
  GetAllTask: "/task/list",
  GetTaskById: "/task/:id",
  CreateTask: "/task",
  UpdateTask: "/task/:id",
  DeleteTask: "/task/:id",
};

export const TABLE_COLUMN = [
  {
    key: "name",
    name: "Task Name",
  },
  {
    key: "description",
    name: "Description",
  },
  {
    key: "priority",
    name: "Priority",
  },
  {
    key: "due_date",
    name: "Due Date",
    type: "date",
  },
];
export const PriorityOption = [
  {
    key: "High",
    value: "High",
    bgcolor: "#FFE6E2",
  },
  {
    key: "Medium",
    value: "Medium",
    bgcolor: "#FEF3C7",
  },
  {
    key: "Low",
    value: "Low",
    bgcolor: "#EBEBEB",
  },
];
