import request from "@/lib/request";

export const login = (data: { email: string, password: string}) =>
  request({
    url: "/account/signin",
    method: "POST",
    data
  });

export const register = (data: { name: string, email: string, password: string}) =>
  request({
    url: "/account/register",
    method: "POST",
    data
  });

export const getMe = () =>
  request({
    url: "/account/me",
    method: "GET",
  });

export const getTodos = () =>
  request({
    url: "/api/task",
    method: "GET",
  });

export const newTodo = (data:  { message: string }) =>
  request({
    url: "/api/task/new",
    method: "POST",
    data
  });

export const updateTodo = (id: string, data:  { complete: boolean }) =>
  request({
    url: `/api/task/${id}`,
    method: "PUT",
    data
  });

export const deleteTodo = (id: string) =>
  request({
    url: `/api/task/${id}`,
    method: "DELETE",
  });

