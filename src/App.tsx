import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "./utils/constant";
import { HomePage } from "./pages/HomePage";
import { PublicRoute } from "./common/components/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddTask } from "./pages/AddTask";
import { AddTaskForm } from "./pages/AddTask/AddTaskForm";
import { NotFoundPage } from "./pages/NotFound";
function App() {
  return (
    <>
      {/* Added ToastContainer for toast message for error and message */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Declare all routes here  */}
      <Router>
        <Routes>
          {/* Route for HomePage */}
          <Route
            path={PAGE_ROUTES.HomePage}
            element={
              // Use PublicRoute component to handle authentication
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          {/* Route for AddTaskForm */}
          <Route
            path={PAGE_ROUTES.AddTask}
            element={
              <PublicRoute>
                <AddTaskForm />
              </PublicRoute>
            }
          />
          {/* Route for EditTask */}
          <Route
            path={PAGE_ROUTES.EditTask}
            element={
              <PublicRoute>
                {/* Pass isEdit prop to AddTask component */}
                <AddTask isEdit={true} />
              </PublicRoute>
            }
          />
          {/* Route for any other undefined paths */}
          <Route path={PAGE_ROUTES.Any} element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
