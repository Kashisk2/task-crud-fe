import dayjs from "dayjs";
import moment from "moment";

export class TaskModel {
  constructor(taskModel?: TaskModel) {
    console.log(taskModel?.name);
    if (taskModel) {
      this.name = taskModel.name;
      this.description = taskModel.description;
      this.priority = taskModel.priority;
      this.due_date = dayjs(moment(taskModel.due_date).format("YYYY-MM-DD"));
      this.id = taskModel.id;
    }
  }
  name?: string;
  description?: string;
  priority?: string;
  due_date?: any;
  id?: string;
}
