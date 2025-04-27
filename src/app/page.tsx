"use client";

import TaskCard from "@/components/TaskCard";
import moment from "moment";
import { useEffect, useState } from "react";

const inputFieldClasses =
  "border-1 border-gray-600 rounded-xl p-3 text-sm focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-all";

const initialTaskState = {
  title: "",
  description: "",
  status: "OPEN",
  dueDate: new Date(),
};

export default function Home() {
  const [task, setTask] = useState(initialTaskState);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // Cleanup function to avoid memory leaks
    return () => {
      setTasks([]);
    };
  }, []);

  const submitHanlder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, status, dueDate } = task;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
          dueDate,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create task");
      }

      setTask(initialTaskState); // Reset all form fields
      fetchTasks(); // Show newly created task
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error (e.g., set loading state, show error message)
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-start items-center">
      <div className="w-full max-w-xl flex flex-col gap-6 px-4 sm:px-0">
        <header className="pt-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Case Management System
          </h1>
        </header>
        <section className="bg-white shadow-2xl rounded-xl p-6 border border-gray-100 z-10">
          <form onSubmit={submitHanlder} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                required
                type="text"
                id="title"
                placeholder="Enter task title"
                className={inputFieldClasses}
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Enter task description"
                className={inputFieldClasses}
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
                <select
                  required
                  id="status"
                  className="mt-1 block w-full border border-gray-600 rounded-xl p-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors duration-200"
                  value={task.status}
                  onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </label>
            </div>

            <div>
              <label
                htmlFor="due-date"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                value={moment(task.dueDate).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) =>
                  setTask({
                    ...task,
                    dueDate: moment(
                      e.target.value,
                      "YYYY-MM-DDTHH:mm"
                    ).toDate(),
                  })
                }
                required
                type="datetime-local"
                id="due-date"
                className="mt-1 block w-full border border-gray-600 rounded-xl p-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors duration-200"
              />
            </div>
            <div className="flex justify-between text-sm">
              <button
                // disabled={isPending}
                type="submit"
                className="bg-purple-500 rounded-2xl py-2 px-3 flex items-center gap-2 text-white cursor-pointer"
              >
                <span>Add Task</span>
              </button>
            </div>
          </form>
        </section>

        {tasks.length > 0 && (
          <section className="p-5 flex flex-col gap-5">
            <header>
              <h2 className="text-lg font-bold">My Tasks</h2>
            </header>
            <ul className="flex flex-wrap gap-5 ">
              {tasks.map(({ id, title, status, dueDate, description }) => {
                return (
                  <li key={id} className="w-full">
                    <TaskCard
                      fetchTasks={fetchTasks}
                      id={id}
                      title={title}
                      description={description}
                      status={status}
                      dueDate={dueDate}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
