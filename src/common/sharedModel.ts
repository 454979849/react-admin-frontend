import React from "react";

export interface RouteModel {
  path: string;
  component: React.ElementType;
  routes?: RouteModel[];
}

export interface RoutePropsModel {
  routes?: RouteModel[];
}