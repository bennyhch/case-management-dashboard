const statusMap = [
  {
    status: "completed",
    statusLabel: "Completed",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    status: "in-progress",
    statusLabel: "In Progress",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    status: "open",
    statusLabel: "Open",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
];

const StatusPill = ({ status }) => {
  const statusLabel = statusMap.find((s) => s.status === status)?.statusLabel;
  const statusBgColor = statusMap.find((s) => s.status === status)?.bgColor;
  const statusTextColor = statusMap.find((s) => s.status === status)?.textColor;
  return (
    <span
      className={`${statusBgColor} ${statusTextColor} text-xs font-medium mr-2 p-1 rounded`}
    >
      {statusLabel}
    </span>
  );
};

interface TaskCardProps {
  title: string;
  description: string;
  status: "open" | "in-progress" | "completed"; // TODO: retype it with backend
  date: Date;
}

const TaskCard = ({ title, description, status, date }: TaskCardProps) => {
  return (
    <article className="w-full text-gray-500 shadow-2xl rounded-xl p-6 border border-gray-100 z-10 flex flex-col gap-8">
      {/* top */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-black">Task title</h3>
        <StatusPill status="open" />
      </div>

      {/* middle */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, quibusdam, voluptates, quisquam voluptatibus, quibusdam,
        voluptates, quisquam voluptatibus, quibusdam, voluptates.
      </p>

      {/* bottom */}
      <div className="flex justify-between items-center">
        <time dateTime="2025-04-25T10:00" className="text-sm">
          Apr 25, 10:00 AM
        </time>
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
