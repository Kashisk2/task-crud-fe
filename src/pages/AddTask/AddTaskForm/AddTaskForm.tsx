import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TaskModel } from "../Models/TaskModeProps";
import { TaskListType } from "../../../common/types/TaskTypes";
import { useFormik } from "formik";
import {
  API_ROUTES,
  PAGE_ROUTES,
  PriorityOption,
} from "../../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import HttpService from "../../../service/Https-services";
import { toast } from "react-toastify";
import moment from "moment";
import { Style } from "./AppTaskForm.style";

interface AddTaskFormProps {
  formData?: TaskListType;
}

export const AddTaskForm = (props: AddTaskFormProps) => {
  // Get id from URL params
  const { id }: any = useParams();
  // Hook for navigation
  const navigate = useNavigate();

  // Function to validate form fields
  const validate = (values: any) => {
    let errors: any = {};
    if (!values.name) errors.name = "This field is required";
    if (!values.description) {
      errors.description = "This field is required";
    } else {
      if (values.description.length > 250) {
        errors.description = "Description should be 250 characters";
      }
    }
    if (!values.priority) errors.priority = "This field is required";
    if (!values.due_date) {
      errors.due_date = "This field is required";
    } else {
      const date = moment(values.due_date).isBefore(moment().add("-1", "days"));
      if (date) {
        errors.due_date = "Please enter a valid date";
      }
    }
    return errors;
  };

  // Formik hook for form handling
  const formik = useFormik({
    // Initial values from formData prop or TaskModel
    initialValues: new TaskModel(props.formData),
    // Validation function
    validate: validate,
    // Do not validate on change, only on submit
    validateOnChange: false,
    // Submit function
    onSubmit: async () => {
      try {
        if (id) {
          // If id exists, update task
          const data = {
            name: formik.values.name,
            description: formik.values.description,
            priority: formik.values.priority,
            due_date: moment(formik.values.due_date).format(
              "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            ),
          };
          const response = await HttpService.patch(
            API_ROUTES.UpdateTask.replace(":id", id),
            data
          );
          if (response.data.message) {
            // Show success message and navigate to homepage
            toast.success(response.data.message);
            formik.resetForm();
            navigate(PAGE_ROUTES.HomePage);
          }
        } else {
          // If no id, create new task
          const data = {
            name: formik.values.name,
            description: formik.values.description,
            priority: formik.values.priority,
            due_date: moment(formik.values.due_date).format(
              "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            ),
          };
          const response = await HttpService.post(API_ROUTES.CreateTask, data);
          if (response.data.message) {
            // Show success message and navigate to homepage
            toast.success(response.data.message);
            formik.resetForm();
            navigate(PAGE_ROUTES.HomePage);
          }
        }
      } catch (error: any) {
        // Handle error
        console.error(error);
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Task Name Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              defaultValue={formik.values.name}
              value={formik.values.name}
              helperText={formik.errors.name}
              error={formik.errors.name ? true : false}
              onChange={(e: ChangeEvent) => {
                formik.handleChange(e);
                formik.errors.name = "";
              }}
              name="name"
              id="name"
              label="Task Name *"
              variant="outlined"
            />
          </Grid>
          {/* Priority Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority *</InputLabel>
              <Select
                error={formik.errors.priority ? true : false}
                onChange={(e: SelectChangeEvent) => {
                  formik.handleChange(e);
                  formik.errors.priority = "";
                }}
                labelId="demo-simple-select-label"
                label="Priority *"
                defaultValue={formik.values.priority}
                value={formik.values.priority}
                name="priority"
                id="priority"
              >
                {/* Priority Options */}
                {PriorityOption.map(
                  (el: { key: string; value: string; bgcolor: string }) => (
                    <MenuItem sx={{ bgcolor: el.bgcolor }} value={el.value}>
                      {el.key}
                    </MenuItem>
                  )
                )}
              </Select>
              <FormHelperText error>{formik.errors.priority}</FormHelperText>
            </FormControl>
          </Grid>
          {/* Description Field */}
          <Grid item xs={12} sm={12}>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                multiline
                helperText={formik.errors.description}
                rows={4}
                error={formik.errors.description ? true : false}
                onChange={(e: ChangeEvent) => {
                  formik.handleChange(e);
                  formik.errors.description = "";
                }}
                inputProps={{ maxLength: 250 }}
                defaultValue={formik.values.description}
                value={formik.values.description}
                name="description"
                id="description"
                label="Description *"
                variant="outlined"
              />
              {/* Character count */}
              <Typography variant="body2" sx={Style.MaxLengthStyle}>
                {`${
                  formik.values?.description?.length
                    ? formik.values?.description?.length
                    : 0
                }/250`}
              </Typography>
            </Box>
          </Grid>
          {/* Due Date Field */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  defaultValue={moment(
                    moment(formik.values.due_date?.format("YYYY-MM-DD"))
                  )}
                  slotProps={{
                    textField: {
                      helperText: formik.errors.due_date?.toString(),
                      error: formik.errors.due_date ? true : false,
                    },
                  }}
                  value={moment(formik.values.due_date?.format("YYYY-MM-DD"))}
                  onChange={(newValue) => {
                    formik.setFieldValue("due_date", newValue);
                    formik.errors.due_date = "";
                  }}
                  name="due_date"
                  disablePast
                  sx={{ width: 1 }}
                  label="Due Date *"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ py: 1 }}
          gap={1}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(PAGE_ROUTES.HomePage)}
            type="button"
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
