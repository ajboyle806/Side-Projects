const GSheetReader = require("g-sheets-api");

const options = {
  apiKey: "",
  sheetId: "",
  sheetNumber: 1,
  sheetName: "NPTSA Schedule", // if sheetName is supplied, this will take precedence over sheetNumber
  returnAllResults: true,
  // filter: {
  //   department: "archaeology",
  //   "module description": "introduction",
  // },
  // filterOptions: {
  //   operator: "or",
  //   matching: "loose",
  // },
};

GSheetReader(
  options,
  (results) => {
    console.log(results);
  },
  (error) => {
    // OPTIONAL: handle errors here
  }
);
