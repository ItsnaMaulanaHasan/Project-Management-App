/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/Modal";
import {
  Priority,
  Status,
  useUpdateTaskMutation,
  useGetUsersQuery,
} from "@/state/api";
import React, { useState, useEffect } from "react";
import { format, parseISO, formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: any;
};

const ModalUpdateTask = ({ isOpen, onClose, task }: Props) => {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Status>(task?.status || Status.ToDo);
  const [priority, setPriority] = useState<Priority>(
    task?.priority || Priority.Backlog,
  );
  const [tags, setTags] = useState(task?.tags || "");
  const [startDate, setStartDate] = useState(task?.startDate || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setTags(task.tags || "");
      setStartDate(
        task.startDate ? format(parseISO(task.startDate), "yyyy-MM-dd") : "",
      );
      setDueDate(
        task.dueDate ? format(parseISO(task.dueDate), "yyyy-MM-dd") : "",
      );
      setAuthorUserId(task.authorUserId?.toString() || "");
      setAssignedUserId(task.assignedUserId?.toString() || "");
    }
  }, [task]);

  const handleSubmit = async () => {
    await updateTask({
      taskId: task.id,
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate: formatISO(new Date(startDate)),
        dueDate: formatISO(new Date(dueDate)),
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(assignedUserId),
      },
    });
    onClose();
  };

  const isFormValid = () => title && authorUserId;

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Update Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className={inputStyles}
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          {Object.values(Status).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className={inputStyles}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {Object.values(Priority).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="date"
          className={inputStyles}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className={inputStyles}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className={selectStyles}
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
          disabled={isUsersLoading}
        >
          <option value="">Select Author User</option>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>
        <select
          className={selectStyles}
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
          disabled={isUsersLoading}
        >
          <option value="">Select Assigned User</option>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`w-full rounded bg-blue-500 p-2 text-white ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalUpdateTask;
