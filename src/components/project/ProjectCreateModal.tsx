import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { FiHardDrive, FiPlus, FiTrash2 } from "react-icons/fi";
import FlipCalendar from "./CalanderModuel";
import { useFormik } from "formik";
import * as Yup from "yup";

// Yup schema for validation
const validationSchema = Yup.object({
  title: Yup.string().required("Project title is required"),
  description: Yup.string()
    .min(10, "Description should be at least 10 characters long")
    .required("Project description is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date can't be before start date"),
});

// Key used for storing form data in localStorage
const LOCAL_STORAGE_KEY = "projectFormData";

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // Formik form setup with default values
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: new Date(), // Use today's date
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // One week from today
    },
    validationSchema,
    onSubmit: (values) => {
      // Save form data to localStorage when the "Add" button is clicked
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
      setIsOpen(false); // Close the modal after saving
    },
  });

  // Load saved form data from localStorage when the modal opens
  useEffect(() => {
    if (isOpen) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const formData = JSON.parse(savedData);
        formik.setValues(formData); // Load saved data into form
      }
    }
  }, [isOpen]);

  // Handle delete (clear data from localStorage)
  const handleDelete = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear form data from localStorage
    formik.resetForm(); // Reset form fields
    setIsOpen(false); // Close the modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll"
        >
          {/* Modal content container */}
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8 rounded-lg w-full max-w-3xl shadow-xl relative overflow-hidden"
          >
            <FiHardDrive className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-3 gap-4"
            >
              <div className="col-span-3 inline-flex items-center gap-4">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center">
                  <FiHardDrive />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">One more thing!</h3>
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
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500">{formik.errors.title}</div>
                  ) : null}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Project Description</h4>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter project description..."
                    rows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Right Side: Date Pickers (Start and End Date) */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Start Date</h4>
                  <FlipCalendar
                    selectedDate={formik.values.startDate}
                    onDateSelected={(date) =>
                      formik.setFieldValue("startDate", date)
                    }
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="text-red-500">
                      {String(formik.errors.startDate)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">End Date</h4>
                  <FlipCalendar
                    selectedDate={formik.values.endDate}
                    onDateSelected={(date) =>
                      formik.setFieldValue("endDate", date)
                    }
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="text-red-500">
                      {String(formik.errors.endDate)}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-span-3 grid grid-cols-3 gap-4 pt-10">
                <div className="flex gap-4 col-start-3">
                  <button
                    type="button"
                    onClick={handleDelete} // Handle delete
                    className="flex items-center justify-center bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded border border-red-500"
                  >
                    <FiTrash2 className="w-5 h-5 mr-2" />
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    <FiPlus className="w-5 h-5 mr-2" />
                    Add
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
