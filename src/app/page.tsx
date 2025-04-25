"use client";

import TaskCard from "@/components/TaskCard";

const inputFieldClasses =
  "border-1 border-gray-600 rounded-xl p-3 text-sm focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-all";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-start items-center">
      <div className="w-full max-w-xl flex flex-col gap-6 px-4 sm:px-0">
        <header className="pt-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Case Management System
          </h1>
        </header>
        <section className="bg-white shadow-2xl rounded-xl p-6 border border-gray-100 z-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter task title"
                className={inputFieldClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Enter task description"
                className={inputFieldClasses}
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
                <select
                  id="status"
                  className="mt-1 block w-full border border-gray-600 rounded-xl p-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors duration-200"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
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
                type="date"
                id="due-date"
                className="mt-1 block w-full border border-gray-600 rounded-xl p-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors duration-200"
              />
            </div>
            <div className="flex justify-between text-sm">
              <button
                // disabled={isPending}
                type="submit"
                className="bg-purple-500 rounded-2xl py-2 px-3 flex items-center gap-2 text-white"
              >
                {/* <MdLock /> */}
                <span>Add Task</span>
              </button>
              <button
                type="reset"
                className="border-purple-500 rounded-2xl py-2 px-3 flex items-center gap-2 text-purple-500 border-1"
              >
                <span>Clear</span>
              </button>
            </div>
          </form>
        </section>
        {/* Some condition to render the section */}
        <section className="p-5 flex flex-col gap-5">
          <header>
            <h2 className="text-lg font-bold">My Tasks</h2>
          </header>
          <ul className="flex flex-wrap gap-5 ">
            {/* {tasks.map((task) => ( */}
            <li key={1}>
              <TaskCard />
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
