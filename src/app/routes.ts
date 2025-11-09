import type { RouteObject } from "react-router";
import type { ComponentType } from "react";
import { RegistrationForm } from "../components/RegistrationForm";
import { AuthForm } from "../components/AuthForm";
import { Profile } from "../components/Profile";

export interface AppRouteObject extends Omit<RouteObject, "element"> {
  element: ComponentType;
  protected?: boolean;
}

export const routes: AppRouteObject[] = [
  {
    path: "/registration",
    element: RegistrationForm,
    protected: false,
  },
  {
    path: "/authorization",
    element: AuthForm,
    protected: false,
  },
  {
    path: "/profile",
    element: Profile,
    protected: true,
  },
];