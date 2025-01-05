import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, fetchTodo } from "../features/taskSlice";
import EditTask from "./EditTask";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (loading) {
    return (
      <motion.p
        className="text-center text-indigo-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Tasks loading...
      </motion.p>
    );
  }

  if (error) {
    return (
      <motion.p
        className="text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        There is an error: {error}
      </motion.p>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-5">Tasks</h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
                <p className="mt-1 text-sm font-semibold">
                  Status: <span className="italic underline">{task.status}</span>
                </p>
              </div>
              <div className="flex space-x-2">
                <EditTask task={task} />
                <motion.button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </motion.button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TaskList;
