"use client";

import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

import Button from "@/components/ui/Button";
import { deleteTodo, updateTodo } from "@/api";

export type TodoListItemProps = {
  id: string;
  message: string;
  complete: boolean;
  createdAt: string;
  fetchTodos: Function;
};

export default function TodoListItem({
  message,
  complete,
  createdAt,
  id,
  fetchTodos
}: TodoListItemProps) {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleOnDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteTodo(id);
      fetchTodos();
    }catch(err){
      console.log(err);
    }finally {
      setDeleteLoading(false);
    }
  }

  const handleOnTaskUpdate = async () => {
    setUpdateLoading(true);
    try {
      await updateTodo(id, {complete: !complete});
      fetchTodos();
    }catch(err){
      console.log(err);
    }finally {
      setUpdateLoading(false);
    }
  }

  return (
    <Collapsible.Root className="w-[400px]" open={open} onOpenChange={setOpen}>
      <div className="border-b-2 flex justify-between items-center w-full py-3 px-2 bg-amber-400">
        <div className="flex items-center gap-2">
          <button onClick={handleOnTaskUpdate} className="">
            {complete ? (
              <CrossCircledIcon
                height={28}
                width={28}
                className="text-amber-800"
              />
            ) : (
              <CheckCircledIcon
                height={28}
                width={28}
                className="text-amber-800"
              />
            )}
          </button>
          <p className={`text-sm ${complete ? 'line-through' : ''}`}>{message}</p>
        </div>
        <Collapsible.Trigger asChild>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              fill="#A49377"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.54 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM17.54 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92z"
              />
            </svg>
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content>
        <div className="bg-white p-2">
          <div className="text-sm">
            <strong>Completed: </strong>
            <span>{complete ? "Completed" : "Not completed"}</span>
          </div>
          <div className="text-sm mt-1">
            <strong>Created At: </strong>
            <span>{createdAt}</span>
          </div>
          <div className="mt-2">
            <Button onClick={handleOnDelete} disabled={deleteLoading} className="w-full inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              {deleteLoading ? 'wait...' : 'Delete' }
            </Button>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
