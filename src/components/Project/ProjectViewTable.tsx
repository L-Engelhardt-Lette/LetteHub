import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { SketchPicker } from "react-color";
import ColorChangeButton from "./ColorChangeButton";
import TooltipButtonDelete from "./DeleteButton";
import ColumnAddButton from "./AddColumnButton";
import TaskPopUp from "./TaskPopup";

// Define the TaskType
type ColumnType = "backlog" | "todo" | "doing" | "done";

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

const generateUniqueId = (existingIds: Set<string>): string => {
  let id;
  do {
    id = Math.random().toString();
  } while (existingIds.has(id));
  return id;
};

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState<TaskType[]>(DEFAULT_CARDS);
  const [columns, setColumns] = useState([
    { title: "Backlog", headingColor: "text-neutral-500", column: "backlog" },
    { title: "TODO", headingColor: "text-yellow-200", column: "todo" },
    { title: "In progress", headingColor: "text-blue-200", column: "doing" },
    { title: "Complete", headingColor: "text-emerald-200", column: "done" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const addColumn = () => {
    const newColumnIndex = columns.length + 1;
    setColumns([
      ...columns,
      {
        title: `Column ${newColumnIndex}`,
        headingColor: "text-neutral-500",
        column: `column${newColumnIndex}` as ColumnType,
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
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.task_id === updatedTask.task_id ? updatedTask : card
      )
    );
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
          updateColumnColor={(newColor) => {
            setColumns(
              columns.map((c) =>
                c.column === col.column ? { ...c, headingColor: newColor } : c
              )
            );
          }}
          onCardDoubleClick={handleDoubleClick} // Pass double-click handler
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
  updateColumnColor: (newColor: string) => void;
  onCardDoubleClick: (card: TaskType) => void; // Add double-click handler prop
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
  updateColumnColor,
  onCardDoubleClick, // Add double-click handler prop
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleTitleChange = () => {
    setEditingTitle(true);
  };

  const saveTitleChange = () => {
    setEditingTitle(false);
    updateColumnTitle(newTitle);
  };

  const handleColorChange = (color: { hex: string }) => {
    updateColumnColor(color.hex);
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
    // Ensure type is correct
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
    // Ensure type is correct
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    // Ensure type is correct
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
            className="text-black" // Add this line to change text color to black
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
            <ColorChangeButton />
            <button onClick={() => deleteColumn(index)}>
              <TooltipButtonDelete />
            </button>
          </div>
          {showColorPicker && (
            <SketchPicker
              color={headingColor}
              onChangeComplete={handleColorChange}
            />
          )}
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
              handleDoubleClick={onCardDoubleClick} // Pass double-click handler
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} cards={cards} /> // Pass
        cards prop
      </div>
    </div>
  );
};

type CardProps = TaskType & {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: TaskType) => void;
  handleDoubleClick: (card: TaskType) => void; // Modify double-click handler
};

const Card = ({
  task_name,
  task_id,
  column,
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
        onDragStart={(e) => handleDragStart(e, { task_name, task_id, column })}
        onDoubleClick={(a) => handleDoubleClick({ task_name, task_id, column })}
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

    setCards((pv) => pv.filter((c) => c.task_id !== parseInt(cardId)));

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
  cards: TaskType[]; // Add cards prop
};

const AddCard = ({ column, setCards, cards }: AddCardProps) => {
  // Add cards to props
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const existingIds = new Set(cards.map((card) => card.task_id.toString()));
    const newCard: TaskType = {
      task_name: text.trim(),
      projectID: "1",
      task_id: parseInt(generateUniqueId(existingIds)),
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

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
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

const DEFAULT_CARDS: TaskType[] = [
  // BACKLOG
  {
    task_name: "Look into render bug in dashboard",
    projectID: "1",
    task_id: 1,
    project_id: 1,
    description: "Fix rendering bug",
    name: "Render Bug",
    persons: ["Alice"],
    status: 0,
    progress: 0,
    startDate: "2024-07-01",
    finishDate: "2024-07-07",
    column: "backlog",
  },
  {
    task_name: "SOX compliance checklist",
    projectID: "2",
    task_id: 2,
    project_id: 2,
    description: "Complete SOX compliance",
    name: "SOX Compliance",
    persons: ["Bob"],
    status: 0,
    progress: 0,
    startDate: "2024-07-02",
    finishDate: "2024-07-10",
    column: "backlog",
  },
  {
    task_name: "[SPIKE] Migrate to Azure",
    projectID: "3",
    task_id: 3,
    project_id: 3,
    description: "Investigate Azure migration",
    name: "Azure Migration",
    persons: ["Alice", "Bob"],
    status: 0,
    progress: 0,
    startDate: "2024-07-03",
    finishDate: "2024-07-15",
    column: "backlog",
  },
  {
    task_name: "Document Notifications service",
    projectID: "4",
    task_id: 4,
    project_id: 4,
    description: "Write documentation for Notifications",
    name: "Notifications Docs",
    persons: ["Alice"],
    status: 0,
    progress: 0,
    startDate: "2024-07-04",
    finishDate: "2024-07-20",
    column: "backlog",
  },
  // TODO
  {
    task_name: "Research DB options for new microservice",
    projectID: "5",
    task_id: 5,
    project_id: 5,
    description: "Research database options",
    name: "DB Research",
    persons: ["Bob"],
    status: 0,
    progress: 0,
    startDate: "2024-07-05",
    finishDate: "2024-07-25",
    column: "todo",
  },
  {
    task_name: "Postmortem for outage",
    projectID: "6",
    task_id: 6,
    project_id: 6,
    description: "Conduct postmortem for outage",
    name: "Outage Postmortem",
    persons: ["Alice", "Bob"],
    status: 0,
    progress: 0,
    startDate: "2024-07-06",
    finishDate: "2024-07-30",
    column: "todo",
  },
  {
    task_name: "Sync with product on Q3 roadmap",
    projectID: "7",
    task_id: 7,
    project_id: 7,
    description: "Align with product team",
    name: "Q3 Roadmap",
    persons: ["Alice"],
    status: 0,
    progress: 0,
    startDate: "2024-07-07",
    finishDate: "2024-08-05",
    column: "todo",
  },
  // DOING
  {
    task_name: "Refactor context providers to use Zustand",
    projectID: "8",
    task_id: 8,
    project_id: 8,
    description: "Refactor providers",
    name: "Zustand Refactor",
    persons: ["Bob"],
    status: 0,
    progress: 0,
    startDate: "2024-07-08",
    finishDate: "2024-08-10",
    column: "doing",
  },
  {
    task_name: "Add logging to daily CRON",
    projectID: "9",
    task_id: 9,
    project_id: 9,
    description: "Add logging",
    name: "CRON Logging",
    persons: ["Alice"],
    status: 0,
    progress: 0,
    startDate: "2024-07-09",
    finishDate: "2024-08-15",
    column: "doing",
  },
  // DONE
  {
    task_name: "Set up DD dashboards for Lambda listener",
    projectID: "10",
    task_id: 10,
    project_id: 10,
    description: "Set up dashboards",
    name: "DD Dashboards",
    persons: ["Alice", "Bob"],
    status: 0,
    progress: 0,
    startDate: "2024-07-10",
    finishDate: "2024-08-20",
    column: "done",
  },
];

export default CustomKanban;
