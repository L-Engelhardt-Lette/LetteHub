import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { FiHardDrive, FiPlus, FiTrash2 } from "react-icons/fi";
import FlipCalendar from "./CalanderModuel";

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8 rounded-lg w-full max-w-3xl shadow-xl cursor-default relative overflow-hidden"
          >
            <FiHardDrive className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="grid grid-cols-3 gap-4">
              {/* Header */}
              <div className="col-span-3 inline-flex items-center gap-4">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center">
                  <FiHardDrive />
                </div>
                <div>
                  <h3 className="text-3xl font-bold ">One more thing!</h3>
                  <p className="text-sm">Everything can be changed later</p>
                </div>
              </div>

              {/* Left Side: Project Title and Description */}
              <div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Project Title</h4>
                  <input
                    className="w-full rounded-md p-2 text-black border border-gray-300"
                    type="text"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Project Description</h4>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter project description..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Right Side: Date Pickers (Start and End Date) */}

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Start Date</h4>
                  <div className="grid place-content-center md:flex-row">
                    <FlipCalendar />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">End Date</h4>
                  <div className="grid place-content-center md:flex-row">
                    <FlipCalendar />
                  </div>
                </div>
              </div>
              <div></div>
              {/* Action Buttons */}
              <div className="col-span-3 grid grid-cols-3 gap-4 pt-10">
                <div className="flex gap-4 col-start-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="col-start-2 flex items-center justify-center bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded border border-red-500"
                  >
                    <FiTrash2 className="w-5 h-5 mr-2" />
                    Delete
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    <FiPlus className="w-5 h-5 mr-2" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
