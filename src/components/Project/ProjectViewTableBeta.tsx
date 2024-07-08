import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  DragEvent,
  FormEvent,
} from "react";
import axios from "axios";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import TooltipButtonDelete from "./DeleteButton";
import ColumnAddButton from "./AddColumnButton";
import TaskPopUp from "./TaskPopup";

// Define the TaskType
type ColumnType = "backlog" | "todo" | "doing" | "done" | `column${number}`;

type TaskType = {
  task_name: string;
  projectID: string;
  task_id: number;
  project_id: number;
  description: string;
  name: string;
  persons: string[];
  status: number;
  progress: number;
  startDate: string;
  finishDate: string;
  column: ColumnType;
};

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState<TaskType[]>([]);
  const [columns, setColumns] = useState([
    {
      title: "Backlog",
      headingColor: "text-neutral-500",
      column: "backlog" as ColumnType,
    },
    {
      title: "TODO",
      headingColor: "text-yellow-200",
      column: "todo" as ColumnType,
    },
    {
      title: "In progress",
      headingColor: "text-blue-200",
      column: "doing" as ColumnType,
    },
    {
      title: "Complete",
      headingColor: "text-emerald-200",
      column: "done" as ColumnType,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  // Fetch tasks from the server
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCards(response.data);
        } else {
          console.error("Expected an array of tasks, but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addColumn = () => {
    const newColumnIndex = columns.length + 1;
    const newColumnKey = `column${newColumnIndex}` as ColumnType;
    setColumns([
      ...columns,
      {
        title: `Column ${newColumnIndex}`,
        headingColor: "text-neutral-500",
        column: newColumnKey,
      },
    ]);
  };

  const deleteColumn = (index: number) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  const handleDoubleClick = (card: TaskType) => {
    setSelectedTask(card);
    setIsOpen(true);
  };

  const updateTask = (updatedTask: TaskType) => {
    axios
      .put(`/api/tasks/${updatedTask.task_id}`, updatedTask)
      .then(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.task_id === updatedTask.task_id ? updatedTask : card
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {columns.map((col, index) => (
        <Column
          key={col.column}
          index={index}
          title={col.title}
          headingColor={col.headingColor}
          cards={cards}
          column={col.column}
          setCards={setCards}
          deleteColumn={deleteColumn}
          updateColumnTitle={(newTitle) => {
            setColumns(
              columns.map((c) =>
                c.column === col.column ? { ...c, title: newTitle } : c
              )
            );
          }}
          onCardDoubleClick={handleDoubleClick}
        />
      ))}
      <div>
        <button onClick={addColumn}>
          <ColumnAddButton />
        </button>
        <BurnBarrel setCards={setCards} />
      </div>
      {isOpen && selectedTask && (
        <TaskPopUp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          task={selectedTask}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

type ColumnProps = {
  index: number;
  title: string;
  headingColor: string;
  cards: TaskType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
  deleteColumn: (index: number) => void;
  updateColumnTitle: (newTitle: string) => void;
  onCardDoubleClick: (card: TaskType) => void;
};

const Column = ({
  index,
  title,
  headingColor,
  cards,
  column,
  setCards,
  deleteColumn,
  updateColumnTitle,
  onCardDoubleClick,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleChange = () => {
    setEditingTitle(true);
  };

  const saveTitleChange = () => {
    setEditingTitle(false);
    updateColumnTitle(newTitle);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, card: TaskType) => {
    e.dataTransfer.setData("cardId", card.task_id.toString());
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.task_id === parseInt(cardId));
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.task_id !== parseInt(cardId));

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex(
          (el) => el.task_id === parseInt(before)
        );
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);

      // Log the dropped task
      console.log("Dropped task:", cardToTransfer); // Display all task info in the console
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        {editingTitle ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={saveTitleChange}
            autoFocus
            className="text-black"
          />
        ) : (
          <h3
            className={`font-medium ${headingColor} cursor-pointer`}
            onClick={handleTitleChange}
          >
            {title}
          </h3>
        )}
        <div>
          <div className="flex space-x-2">
            <button onClick={() => deleteColumn(index)}>
              <TooltipButtonDelete />
            </button>
          </div>
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.task_id}
              {...c}
              handleDragStart={handleDragStart}
              handleDoubleClick={onCardDoubleClick}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} cards={cards} />
      </div>
    </div>
  );
};

type CardProps = TaskType & {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: TaskType) => void;
  handleDoubleClick: (card: TaskType) => void;
};

const Card = ({
  task_name,
  task_id,
  column,
  projectID,
  project_id,
  description,
  name,
  persons,
  status,
  progress,
  startDate,
  finishDate,
  handleDragStart,
  handleDoubleClick,
}: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={task_id.toString()} column={column} />
      <motion.div
        layout
        layoutId={task_id.toString()}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, {
            task_name,
            task_id,
            column,
            projectID,
            project_id,
            description,
            name,
            persons,
            status,
            progress,
            startDate,
            finishDate,
          })
        }
        onDoubleClick={() =>
          handleDoubleClick({
            task_name,
            task_id,
            column,
            projectID,
            project_id,
            description,
            name,
            persons,
            status,
            progress,
            startDate,
            finishDate,
          })
        }
        className="relative cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing group overflow-hidden"
      >
        <div className="transition duration-300 ease-in-out group-hover:blur-sm">
          <p className="text-sm text-neutral-100">{task_name}</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <p className="text-xs text-white">Drag to move</p>
          <p className="text-xs text-white">Double Click to Open</p>
        </div>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<TaskType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    axios.delete(`/api/tasks/${cardId}`).then(() => {
      setCards((pv) => pv.filter((c) => c.task_id !== parseInt(cardId)));
    });

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
  cards: TaskType[];
};

const AddCard = ({ column, setCards, cards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: TaskType = {
      task_name: text.trim(),
      projectID: "1",
      task_id: Date.now(),
      project_id: 1,
      description: "New task description",
      name: text.trim(),
      persons: [],
      status: 0,
      progress: 0,
      startDate: new Date().toISOString().split("T")[0],
      finishDate: new Date().toISOString().split("T")[0],
      column,
    };

    axios.post("/api/tasks", newCard).then((response) => {
      setCards((pv) => [...pv, response.data]);
      setAdding(false);
    });
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default CustomKanban;
