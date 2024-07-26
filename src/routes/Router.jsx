import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Home from "../components/Home";
import Layout from "./Layout";
import Login from "../components/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, //path: "/",
                element: <Home />,
            },
            {
                path: "articles",
                element: (
                    <ProtectedRoute>
                        <ArticleForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
