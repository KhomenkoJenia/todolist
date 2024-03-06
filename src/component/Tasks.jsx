import NewTask from "./NewTask";

export default function Tasks({ onDelete, onAdd, tasks, myId }) {
  const filterTask = tasks.filter((task) => task.projectId === myId);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 my-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {filterTask.map((task) => (
            <li
              className="flex justify-between my-2 mx-2 border-2 p-8 "
              key={task.id}
            >
              <span>{task.text}</span>
              <button
                onClick={() => {
                  onDelete(task.id);
                }}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
