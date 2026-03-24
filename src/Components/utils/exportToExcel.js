import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName = "Filtered_Colleges") => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }


  const cleanedData = data.map((college) => ({
    Name: college.institute_name,
    District: college.district,
    State: college.state,
    Type: college.institution_type,
    University: college.university,
    Address: college.address
    
  
  }));
// create a excel sheet 
  const worksheet = XLSX.utils.json_to_sheet(cleanedData);

  // increase the column width 
   worksheet["!cols"] = [
    { wch: 50 }, 
    { wch: 13 }, 
    { wch: 30 }, 
    { wch: 15 }, 
    { wch: 60 }, 
    { wch: 80 }, 
   
  ];

  // create a workbook 
  const workbook = XLSX.utils.book_new();
  // 
  XLSX.utils.book_append_sheet(workbook, worksheet, "Colleges");


// workbook convert  to  binary format for  dowload 
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });


  // blob file like object 
  const fileData = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // dowload 
  saveAs(fileData, `${fileName}.xlsx`);
};