import { useCallback, useEffect, useState } from "react";

import { API_ROUTES } from "../../utils/constant";
import { TaskListType } from "../../common/types/TaskTypes";
import { useParams } from "react-router-dom";
import HttpService from "../../service/Https-services";
import { AddTaskForm } from "./AddTaskForm";
export const AddTask = ({ isEdit }: { isEdit: boolean }) => {
  const [formData, setFormData] = useState<TaskListType>();

  const { id }: any = useParams();
  const getTypeById = useCallback(async () => {
    try {
      const res = await HttpService.get(
        API_ROUTES.GetTaskById.replace(":id", id)
      );
      if (res?.data?.data) {
        setFormData(res?.data?.data);
      }
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    if (id) {
      getTypeById();
    }
    return () => {};
  }, [getTypeById, id]);
  return <>{formData && isEdit && <AddTaskForm formData={formData} />}</>;
};
