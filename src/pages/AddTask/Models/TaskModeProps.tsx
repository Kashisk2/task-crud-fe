import moment from "moment";

export class TaskModel {
  constructor(taskModel?: TaskModel) {
    if (taskModel) {
      this.name = taskModel.name;
      this.description = taskModel.description;
      this.priority = taskModel.priority;
      this.due_date = moment(moment(taskModel.due_date)?.format("YYYY-MM-DD"));
      this.id = taskModel.id;
    } else {
      this.due_date = moment(moment()?.format("YYYY-MM-DD"));
    }
  }
  name?: string;
  description?: string;
  priority?: string;
  due_date?: any;
  id?: string;
}
