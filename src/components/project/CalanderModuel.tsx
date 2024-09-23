import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { FiArrowLeft, FiArrowRight, FiEdit } from "react-icons/fi";
import { DateObj, useDayzed } from "dayzed";

const FlipCalendar = ({
  selectedDate,
  onDateSelected,
}: {
  selectedDate: Date;
  onDateSelected: (selectedDate: Date) => void;
}) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true); // Set the initial visibility to true

  const handleSelectDate = (selectedDateObj: { date: Date }) => {
    onDateSelected(selectedDateObj.date);
    setIndex((pv) => pv + 1);
    // Do not close the date picker automatically here.
  };

  return (
    <div className="relative flex flex-col items-center text-indigo-950">
      {/* Calendar display that shows the selected date */}
      <CalendarDisplay
        index={index}
        date={selectedDate}
        visible={visible}
        setVisible={setVisible}
      />
      {/* The date picker will always be initially visible */}
      <AnimatePresence>
        {visible && (
          <DatePicker
            selected={selectedDate}
            onDateSelected={handleSelectDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CalendarDisplay = ({
  index,
  date,
  visible,
  setVisible,
}: {
  index: number;
  date: Date;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <div className="w-fit overflow-hidden rounded-xl border-2 border-indigo-500 bg-indigo-500">
      <div className="flex items-center justify-between px-1.5 py-0.5">
        <span className="text-center uppercase text-white">
          {format(date, "LLLL")}
        </span>
        <button
          onClick={() => setVisible(!visible)} // Toggle visibility
          className="text-white transition-colors hover:text-indigo-200"
        >
          {visible ? <FiArrowLeft /> : <FiEdit />}{" "}
          {/* Edit to open, ArrowLeft to close */}
        </button>
      </div>
      <div className="relative z-0 h-36 w-52 shrink-0">
        <AnimatePresence mode="sync">
          <motion.div
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
              zIndex: -index,
              backfaceVisibility: "hidden",
            }}
            key={index}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
            initial={{ rotateX: "0deg" }}
            animate={{ rotateX: "0deg" }}
            exit={{ rotateX: "-180deg" }}
            className="absolute inset-0"
          >
            <div className="grid h-full w-full place-content-center rounded-lg bg-white text-6xl">
              {format(date, "do")}
            </div>
          </motion.div>
          <motion.div
            style={{
              clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              zIndex: index,
              backfaceVisibility: "hidden",
            }}
            key={(index + 1) * 2}
            initial={{ rotateX: "180deg" }}
            animate={{ rotateX: "0deg" }}
            exit={{ rotateX: "0deg" }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <div className="relative grid h-full w-full place-content-center rounded-lg bg-white text-6xl">
              {format(date, "do")}
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs">
                {format(date, "yyyy")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const DatePicker = ({
  selected,
  onDateSelected,
}: {
  selected: Date;
  onDateSelected: (selectedDateObj: DateObj) => void;
}) => {
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDayzed({
    selected,
    onDateSelected,
  });

  const calendar = calendars[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="-right-4 top-0 mt-4 w-fit rounded-lg border border-indigo-500 bg-white p-3 md:absolute md:mt-0 md:translate-x-full"
    >
      <div className="mb-2 flex items-center justify-between">
        <button {...getBackProps({ calendars })}>
          <FiArrowLeft />
        </button>
        <span>
          {MONTH_NAMES[calendar.month]} {calendar.year}
        </span>
        <button {...getForwardProps({ calendars })}>
          <FiArrowRight />
        </button>
      </div>
      <div key={`${calendar.month}${calendar.year}`} className="w-52">
        <div className="mb-2 flex">
          {WEEKDAY_NAMES.map((weekday) => (
            <div
              key={`${calendar.month}${calendar.year}${weekday}`}
              className="block w-[calc(100%_/_7)] text-center text-xs"
            >
              {weekday}
            </div>
          ))}
        </div>
        {calendar.weeks.map((week, weekIndex) =>
          week.map((dateObj, index) => {
            let key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
            if (!dateObj) {
              return (
                <div key={key} className="inline-block w-[calc(100%_/_7)]" />
              );
            }
            let { date, selected } = dateObj;
            return (
              <button
                className={`inline-block w-[calc(100%_/_7)] rounded text-sm transition-colors ${
                  selected ? "bg-indigo-500 text-white" : "bg-transparent"
                }`}
                key={key}
                {...getDateProps({ dateObj })}
              >
                {date.getDate()}
              </button>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default FlipCalendar;
