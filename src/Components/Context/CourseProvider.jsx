import { useState } from "react";
import { CourseContext } from "./CourseContext";

const CourseProvider = ({children}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [courseArr, setCourseArr] = useState(null);

    return (
      <CourseContext.Provider
        value={{ isDialogOpen, setIsDialogOpen, courseArr, setCourseArr }}>
        {children}
      </CourseContext.Provider>
    );
}

export default CourseProvider;

