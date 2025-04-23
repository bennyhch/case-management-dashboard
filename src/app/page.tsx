export default function Home() {
  return (
    <main>
      <header>
        <h1>Case Management System</h1>
      </header>
      <section>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Enter task title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Enter task description"
            />
          </div>
          <div>
            <label htmlFor="status">
              Status
              <select id="status">
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="due-date">Due Date</label>
            <input type="date" id="due-date" />
          </div>
          <div className="flex justify-between text-sm">
            <button
              // disabled={isPending}
              type="submit"
              // className={`bg-neonPurple border-neonPurple rounded-2xl py-2 px-3 flex items-center gap-2 ${
              //   isPending && "opacity-50 cursor-not-allowed"
              // }`}
            >
              {/* <MdLock /> */}
              <span>Add Task</span>
            </button>
            <button
              type="reset"
              className="bg-inputBlack rounded-2xl p-2 flex items-center gap-2"
            >
              <span>Clear</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
