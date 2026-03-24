import { useContext, useEffect, useRef } from "react";
import { SelectionContext } from "./Context/SelectionContext";
import { CourseContext } from "./Context/CourseContext";

const CourseDialog = () => {
  const dialogRef = useRef(null);
  const { isDialogOpen, setIsDialogOpen, courseArr } = useContext(CourseContext);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDialogOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isDialogOpen]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={() => setIsDialogOpen(false)}
      className="m-auto bg-[#0F1C2B] p-6 md:p-10 relative min-h-50
                 w-[90vw] md:w-3xl lg:w-4xl xl:w-5xl rounded-2xl 
                 border border-white/20 shadow-2xl backdrop:backdrop-blur-sm backdrop:bg-black/60">
      {/* Close button */}
      <button
        type="button"
        onClick={() => setIsDialogOpen(false)}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 outline-none text-slate-400
                   hover:text-sky-400 active:scale-95 transition-all cursor-pointer bg-slate-800/50 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </button>

      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <span className="text-sky-400">Available</span> Courses
      </h2>

      {/* Table container */}
      <div className="relative overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs uppercase tracking-wider text-sky-400/80 bg-slate-800/40">
            <tr className="border-b border-white/10 *:px-6 *:py-4 *:font-semibold">
              <th>Course Name</th>
              <th>Level</th>
              <th>Field</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {courseArr && courseArr.length > 0 ? (
              courseArr.map((course, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/5 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium text-slate-100 whitespace-normal min-w-[200px]">
                    {course.course}
                  </td>
                  <td className="px-6 py-4">{course.level}</td>
                  <td className="px-6 py-4">{course.programme}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs border border-sky-500/20">
                      {course.availability || "Full Time"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-slate-500">
                  No specific course details available for this institution.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </dialog>
  );
};

export default CourseDialog;
