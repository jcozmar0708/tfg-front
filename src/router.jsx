import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GroupsList from "./pages/GroupsList";
import CreateGroup from "./pages/CreateGroup";
import EditProfile from "./pages/EditProfile";
import AddUsersToGroup from "./pages/AddUsersToGroup";
import ErrorPage from "./pages/ErrorPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/groups" element={<GroupsList />} />
      <Route path="/groups/create-group" element={<CreateGroup />} />
      <Route
        path="/groups/:groupUUID/add-users"
        element={<AddUsersToGroup />}
      />

      <Route path="/edit-profile" element={<EditProfile />} />

      <Route path="/error" element={<ErrorPage />} />

      <Route path="*" element={<Navigate to={"/error"} />} />
    </Routes>
  );
};

export default AppRouter;
