import { Status } from "@/generated/prisma";
import moment from "moment";
import { useState } from "react";

const statusMap: Record<
  Status,
  {
    label: string;
    bgColor: string;
    textColor: string;
  }
> = {
  [Status.COMPLETED]: {
    label: "Completed",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  [Status.IN_PROGRESS]: {
    label: "In Progress",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  [Status.OPEN]: {
    label: "Open",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
};

const StatusPill = ({ status }: { status: Status }) => {
  const { label, bgColor, textColor } = statusMap[status];
  return (
    <span
      className={`${bgColor} ${textColor} text-xs font-medium mr-2 p-1 rounded`}
    >
      {label}
    </span>
  );
};

interface TaskCardProps {
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
  id: string;
  fetchTasks: () => void;
}

const TaskCard = ({
  title,
  description,
  status,
  dueDate,
  id,
  fetchTasks,
}: TaskCardProps) => {
  const momentDueDate = moment(dueDate);
  const formattedDueDate = momentDueDate.format("MMMM Do YYYY, h:mm A");
  const isoDate = momentDueDate.toISOString();

  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const updateStatusHandler = async (newStatus: Status) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setCurrentStatus(newStatus);
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchTasks();
    } else {
      console.error("Failed to delete task");
    }
  };

  return (
    <article className=" text-gray-500 shadow-2xl rounded-xl p-6 border border-gray-100 z-10 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        {isEditing ? (
          <select
            value={currentStatus}
            onChange={(e) => updateStatusHandler(e.target.value as Status)}
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {statusMap[status].label}
              </option>
            ))}
          </select>
        ) : (
          <StatusPill status={status} />
        )}
      </div>

      <p className="overflow-hidden text-ellipsis">{description}</p>

      <div className="flex justify-between items-center">
        <time dateTime={isoDate} className="text-sm">
          {formattedDueDate}
        </time>
        <div className="flex gap-2">
          <button
            aria-label="Edit task"
            className="hover:text-gray-700 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            ✏️
          </button>
          <button
            onClick={deleteHandler}
            aria-label="Delete task"
            className="hover:text-red-600 cursor-pointer"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
