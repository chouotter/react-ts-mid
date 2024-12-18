import { createHashRouter } from "react-router-dom";
import App from '../view/App';
import AddStudent from "../view/AddStudent";
import DeleteStudent from "../view/DeleteStudent";
import UpdateStudent from "../view/UpdateStudent";

export const router = createHashRouter([
  {
    path: "/", 
    element: <App />, 
  },
  {
    path: "/add-student",
    element: <AddStudent />, 
  },
  {
    path: "/delete-student",
    element: <DeleteStudent />,
  },
  {
    path: "/update-student",
    element: <UpdateStudent />,
  },
]);