import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { DashboardPage } from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;