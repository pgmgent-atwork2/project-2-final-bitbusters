import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { Home, NotFound, Steps } from "./pages/Index";
import Root from "./layouts/Root";
import { ROUTES } from "./routes/routes";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<NotFound />}>
            <Route path={ROUTES.home.path} element={<Home />} />
            <Route path={ROUTES.steps.path} element={<Steps />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
