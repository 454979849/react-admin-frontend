import React from "react";

// 路由配置项约束
export interface RouteModel {
  index?: boolean;  //‘/’的重定向
  title?: string; // 路由标题(菜单栏使用)
  path: string; //  路由路径  
  component: React.ElementType;  // 路由组件
  routes?: RouteModel[];  // 子路由数组
  icon?: React.ReactElement;  // 路由的icon(菜单栏使用)
}

// 子路由props基接口约束
export interface RoutePropsModel {
  routes: RouteModel[];
}

// table的操作动作按钮约束
export interface ActionBtnModel {
  text?: string;  // 文本
  onClick?: Function; // 点击事件
  content?: React.ReactElement; // 按钮对象
}