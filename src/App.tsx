import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "./utils/constant";
import { HomePage } from "./pages/HomePage";
import { PublicRoute } from "./common/components/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddTask } from "./pages/AddTask";
import { AddTaskForm } from "./pages/AddTask/AddTaskForm";
function App() {
  return (
    <>
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
      <Router>
        <Routes>
          <Route
            path={PAGE_ROUTES.HomePage}
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path={PAGE_ROUTES.AddTask}
            element={
              <PublicRoute>
                <AddTaskForm />
              </PublicRoute>
            }
          />
          <Route
            path={PAGE_ROUTES.EditTask}
            element={
              <PublicRoute>
                <AddTask isEdit={true} />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
