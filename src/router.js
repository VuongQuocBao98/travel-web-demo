import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import NotFoundPge from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const routers = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/login",
    exact: true,
    main: () => <LoginPage />,
  },
  {
    path: "/profile/:username",
    exact: true,
    main: () => <ProfilePage />,
  },
  {
    path: "/:posts",
    exact: true,
    main: () => <PostsPage />,
  },
  {
    path: "/:post/:id",
    exact: true,
    main: () => <PostDetailPage />,
  },
  {
    path: "",
    exact: true,
    main: () => <NotFoundPge />,
  },
];

export default routers;
