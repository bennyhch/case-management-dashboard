const TaskCard = () => {
  return (
    <article>
      {/* top */}
      <div>
        <h3>Task title</h3>
        <span>status</span>
      </div>

      {/* middle */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, quibusdam, voluptates, quisquam voluptatibus, quibusdam,
        voluptates, quisquam voluptatibus, quibusdam, voluptates.
      </p>

      {/* bottom */}
      <div>
        <time dateTime="2025-04-25T10:00">Apr 25, 10:00 AM</time>
        <div className="flex gap-2">
          <button aria-label="Edit task" className="hover:text-gray-700">
            ✏️
          </button>
          <button aria-label="Delete task" className="hover:text-red-600">
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
