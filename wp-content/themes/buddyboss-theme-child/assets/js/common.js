/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// BACKUP CAPACITY CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BackupCapacityCalculator = (
    frontendTerabyte,
    numberOfFullBackupsToStorePerWeek,
    numberOfFullBackupsToStorePerMonth,
    numberOfFullBackupsToSizeFor,
    targetFullBackupWindowInHrs,
    expectedCompressionRatio,
    storageCostPerTBPerMonth,
    dataChangeRateBetweenBackups,
    numberOfIncrementalBackupsToStorePerWeek,
    numberOfIncrementalBackupsToStorePerMonth,
    totalNumberOfIncrementalBackupsToStore,
    targetIncrementalBackupWindowsInHrs,
    expectedDeDuplicationRatio
  ) => {
    // Variables to replace useState
    let DGB = frontendTerabyte,
      NBWK = numberOfFullBackupsToStorePerWeek,
      NBMO = numberOfFullBackupsToStorePerMonth,
      TNBK = numberOfFullBackupsToSizeFor,
      TBHR = targetFullBackupWindowInHrs,
      X = expectedCompressionRatio,
      TBMO = storageCostPerTBPerMonth,
      DXR = dataChangeRateBetweenBackups;
    let INCBKWK = numberOfIncrementalBackupsToStorePerWeek,
      INCBKMO = numberOfIncrementalBackupsToStorePerMonth,
      NBINCBK = totalNumberOfIncrementalBackupsToStore,
      INCBKHR = targetIncrementalBackupWindowsInHrs,
      DERATIO = expectedDeDuplicationRatio;
  
    // Backup data calculations
    let fullBackUpFirstData = DGB * (8000 / 100) * 1000;
    let fullBackUpSecondData = DGB * 8 * 1000;
    let fullBackUpThirdData = ((DGB * 8) / 10) * 1000;
    let incrementalBackupFirstData = ((DGB * (DXR / 100) * 8000) / 100) * 1000;
    let incrementalBackupSecondData = DGB * (DXR / 100) * 8 * 1000;
    let incrementalBackupThirdData = ((DGB * (DXR / 100) * 8) / 10) * 1000;
  
    // Initial full backup and incremental backup states
    let fullBackUpFirstState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let fullBackUpSecondState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let fullBackUpThirdState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let incrementalBackupFirstState = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    let incrementalBackupSecondState = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    let incrementalBackupThirdState = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  
    // Calculation functions
    function fullBackUpFirstFunction() {
      return {
        days: Math.floor(fullBackUpFirstData / (24 * 60 * 60)),
        hours: Math.floor((fullBackUpFirstData % (3600 * 24)) / 3600),
        minutes: Math.floor((fullBackUpFirstData % 3600) / 60),
        seconds: Math.floor((fullBackUpFirstData % 3600) % 60),
      };
    }
  
    function fullBackUpSecondFunction() {
      return {
        days: Math.floor(fullBackUpSecondData / (24 * 60 * 60)),
        hours: Math.floor((fullBackUpSecondData % (3600 * 24)) / 3600),
        minutes: Math.floor((fullBackUpSecondData % 3600) / 60),
        seconds: Math.floor((fullBackUpSecondData % 3600) % 60),
      };
    }
  
    function fullBackUpThirdFunction() {
      return {
        days: Math.floor(fullBackUpThirdData / (24 * 60 * 60)),
        hours: Math.floor((fullBackUpThirdData % (3600 * 24)) / 3600),
        minutes: Math.floor((fullBackUpThirdData % 3600) / 60),
        seconds: Math.floor((fullBackUpThirdData % 3600) % 60),
      };
    }
  
    function incrementalBackupFirstFunction() {
      return {
        days: Math.floor(incrementalBackupFirstData / (24 * 60 * 60)),
        hours: Math.floor((incrementalBackupFirstData % (3600 * 24)) / 3600),
        minutes: Math.floor((incrementalBackupFirstData % 3600) / 60),
        seconds: Math.floor((incrementalBackupFirstData % 3600) % 60),
      };
    }
  
    function incrementalBackupSecondFunction() {
      return {
        days: Math.floor(incrementalBackupSecondData / (24 * 60 * 60)),
        hours: Math.floor((incrementalBackupSecondData % (3600 * 24)) / 3600),
        minutes: Math.floor((incrementalBackupSecondData % 3600) / 60),
        seconds: Math.floor((incrementalBackupSecondData % 3600) % 60),
      };
    }
  
    function incrementalBackupThirdFunction() {
      return {
        days: Math.floor(incrementalBackupThirdData / (24 * 60 * 60)),
        hours: Math.floor((incrementalBackupThirdData % (3600 * 24)) / 3600),
        minutes: Math.floor((incrementalBackupThirdData % 3600) / 60),
        seconds: Math.floor((incrementalBackupThirdData % 3600) % 60),
      };
    }
  
    // Main calculation function (like onClick handler)
    function resultCalculations() {
      fullBackUpFirstState = fullBackUpFirstFunction();
      fullBackUpSecondState = fullBackUpSecondFunction();
      fullBackUpThirdState = fullBackUpThirdFunction();
      incrementalBackupFirstState = incrementalBackupFirstFunction();
      incrementalBackupSecondState = incrementalBackupSecondFunction();
      incrementalBackupThirdState = incrementalBackupThirdFunction();
  
      if (TBHR <= 0) TBHR = 1;
      if (X <= 0) X = 1;
      if (INCBKHR <= 0) INCBKHR = 1;
      if (DERATIO <= 0) DERATIO = 1;
  
      // Display the results
      // console.log("Full Backup First State:", fullBackUpFirstState);
      // console.log("Full Backup Second State:", fullBackUpSecondState);
      // console.log("Full Backup Third State:", fullBackUpThirdState);
      // console.log("Incremental Backup First State:", incrementalBackupFirstState);
      // console.log(
      //   "Incremental Backup Second State:",
      //   incrementalBackupSecondState
      // );
      // console.log("Incremental Backup Third State:", incrementalBackupThirdState);
    }
  
    // Initial function call to simulate useEffect
    resultCalculations();
  };
  
  const validateFormForBackupCalc = (obj) => {
    let errors = {};
  
    // Iterate over each property in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if value is empty or not a number
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          isNaN(value)
        ) {
          errors[key] = `The value for '${key}' is empty or not a number.`;
        }
        
      }
    }
  
    // Return the errors object
    return errors;
  };
  
  const handleBackupCapacityCalculatorForm = (e) => {
    e.preventDefault();
    let form = document.getElementById("backup-capacity-calculator-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    let errorResult = validateFormForBackupCalc(formDataJSON);
    if (Object.keys(errorResult).length > 0) {
      alert(Object.values(errorResult)[0]);
    } else {
      // console.log(formDataJSON);
      {
      }
  
      let updatedFormDataJSON = {};
      for (let key in formDataJSON) {
        updatedFormDataJSON[key] = parseFloat(formDataJSON[key]);
      }
  
      BackupCapacityCalculator(
        updatedFormDataJSON["frontendTerabyte"],
        updatedFormDataJSON["numberOfFullBackupsToStorePerWeek"],
        updatedFormDataJSON["numberOfFullBackupsToStorePerMonth"],
        updatedFormDataJSON["numberOfFullBackupsToSizeFor"],
        updatedFormDataJSON["targetFullBackupWindowInHrs"],
        updatedFormDataJSON["expectedCompressionRatio"],
        updatedFormDataJSON["storageCostPerTBPerMonth"],
        updatedFormDataJSON["dataChangeRateBetweenBackups"],
        updatedFormDataJSON["numberOfIncrementalBackupsToStorePerWeek"],
        updatedFormDataJSON["numberOfIncrementalBackupsToStorePerMonth"],
        updatedFormDataJSON["totalNumberOfIncrementalBackupsToStore"],
        updatedFormDataJSON["targetIncrementalBackupWindowsInHrs"],
        updatedFormDataJSON["expectedDeDuplicationRatio"]
      );
  
      // Define variables (placeholders) used in formulas
      let DGB = updatedFormDataJSON["frontendTerabyte"],
        NBWK = updatedFormDataJSON["numberOfFullBackupsToStorePerWeek"],
        NBMO = updatedFormDataJSON["numberOfFullBackupsToStorePerMonth"],
        TNBK = updatedFormDataJSON["numberOfFullBackupsToSizeFor"],
        TBHR = updatedFormDataJSON["targetFullBackupWindowInHrs"],
        X = updatedFormDataJSON["expectedCompressionRatio"],
        TBMO = updatedFormDataJSON["storageCostPerTBPerMonth"],
        DXR = updatedFormDataJSON["dataChangeRateBetweenBackups"];
      let INCBKWK =
          updatedFormDataJSON["numberOfIncrementalBackupsToStorePerWeek"],
        INCBKMO =
          updatedFormDataJSON["numberOfIncrementalBackupsToStorePerMonth"],
        NBINCBK = updatedFormDataJSON["totalNumberOfIncrementalBackupsToStore"],
        INCBKHR = updatedFormDataJSON["targetIncrementalBackupWindowsInHrs"],
        DERATIO = updatedFormDataJSON["expectedDeDuplicationRatio"];
  
      // Helper function to round numbers to 2 decimals and remove trailing ".00"
      const formatNumber = (num) =>
        (Math.round(num * 100) / 100).toFixed(2).replace(/[.,]00$/, "");
  
      // Reference the table by its ID
      const table = document.getElementById("backup-capacity-calculator-table");
      if(table == null){
        return;
      }
      table.innerHTML = "";
  
      // Create table header
      const headers = [
        "Backup storage size",
        "Non - compressed",
        "Compressed",
        "De-dupl.",
        "Compressed + De-dupl.",
      ];
      const headerRow = document.createElement("tr");
      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      // Helper function to create and append rows
      const addRow = (label, values) => {
        const row = document.createElement("tr");
        const tdLabel = document.createElement("td");
        tdLabel.textContent = label;
        row.appendChild(tdLabel);
  
        values.forEach((value) => {
          const td = document.createElement("td");
          td.textContent = formatNumber(value);
          row.appendChild(td);
          if(label == "Total (TB):"){
              row.style.fontWeight = "bold";
          }
        });
  
        table.appendChild(row);
      };
  
      // Full (TB) row
      addRow("Full (TB):", [
        DGB,
        DGB * (1 / X),
        DGB * (1 / DERATIO),
        DGB * (1 / (X * DERATIO)),
      ]);
  
      // Incremental (TB) row
      addRow("Incremental (TB):", [
        (DGB * DXR) / 100,
        DGB * (DXR / 100) * (1 / X),
        DGB * (DXR / 100) * (1 / DERATIO),
        DGB * (DXR / 100) * (1 / (X * DERATIO)),
      ]);
  
      // Weekly (TB) row
      addRow("Weekly (TB):", [
        DGB * NBWK + (DXR * DGB * INCBKWK) / 100,
        (DGB * NBWK + (DXR * DGB * INCBKWK) / 100) * (1 / X),
        (DGB * NBWK + (DXR * DGB * INCBKWK) / 100) * (1 / DERATIO),
        (DGB * NBWK + (DXR * DGB * INCBKWK) / 100) * (1 / (X * DERATIO)),
      ]);
  
      // Monthly (TB) row
      addRow("Monthly (TB):", [
        DGB * NBMO + (DXR * DGB * INCBKMO) / 100,
        (DGB * NBMO + (DXR * DGB * INCBKMO) / 100) * (1 / X),
        (DGB * NBMO + (DXR * DGB * INCBKMO) / 100) * (1 / DERATIO),
        (DGB * NBMO + (DXR * DGB * INCBKMO) / 100) * (1 / (X * DERATIO)),
      ]);
  
      // Total (TB) row
      addRow("Total (TB):", [
        DGB * TNBK + (DXR * DGB * NBINCBK) / 100,
        (DGB * TNBK + (DXR * DGB * NBINCBK) / 100) * (1 / X),
        (DGB * TNBK + (DXR * DGB * NBINCBK) / 100) * (1 / DERATIO),
        (DGB * TNBK + (DXR * DGB * NBINCBK) / 100) * (1 / (X * DERATIO)),
      ]);
  
      // Cost per month row
      addRow("Cost per month:", [
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) * (TBMO * 1000),
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
          (TBMO * 1000) *
          (1 / X),
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
          (TBMO * 1000) *
          (1 / DERATIO),
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
          (TBMO * 1000) *
          (1 / (X * DERATIO)),
      ]);
  
      // Cost per year row
      addRow("Cost per year:", [
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) * (TBMO * 1000) * 12,
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
          (TBMO * 1000) *
          12 *
          (1 / X),
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
          (TBMO * 1000) *
          12 *
          (1 / DERATIO),
        ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
          (TBMO * 1000) *
          12 *
          (1 / (X * DERATIO)),
      ]);
    }
  };
  
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// BANDWIDTH CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const validateInput = (obj) => {
    // Object to hold errors
    let errors = {};
  
    // Iterate over each property in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if value is empty or not a number
        if (value === undefined || value === null || value === "" || isNaN(value)) {
          errors[key] = `The value for '${key}' is empty or not a number.`;
        } 
        // Check if value is negative
        if (value < 0) {
          errors[key] = `The value for '${key}' is negative.`;
        }
      }
    }
  
    // Return the errors object
    return errors;
  };

function bandwidthCalculator(gbInput, timeInput, ratio1Input, ratio2Input) {
  // Initialize variables to simulate state
  let TD = gbInput;
  let RWT = timeInput;
  let timeInMin = ratio1Input;
  let timeInSec = ratio2Input;
  let result = 0;

  // Function to calculate the result
  function calculate() {
    if (TD <= 0) TD = 1;
    if (RWT <= 0) RWT = 1;
    if (timeInMin <= 0) timeInMin = 1;
    if (timeInSec <= 0) timeInSec = 1;

    result = (
      (TD * (100 / (timeInMin / timeInSec)) * 8192) /
      (RWT * 60)
    ).toFixed(2);
    // console.log("Calculated Result:", result);
    if(document.getElementById("bandwidth-calc-result") == null){
      return;
    }
    document.getElementById("bandwidth-calc-result").textContent = result;
  }

  // Function to simulate the effect of recalculating when the result changes
  function triggerCalculation() {
    calculate();
  }

  // Simulate the initial calculation
  triggerCalculation();
}

const handleBandwidthCalcSubmit = (e) => {
  e.preventDefault();
  let form = document.getElementById("bandwidth-calc-form");
  if(form == null){
    return;
  }
  let formData = new FormData(form);
  let formDataJSON = {};
  for (let [key, value] of formData.entries()) {
    formDataJSON[key] = parseFloat(value);
  }

  let errorResult = validateInput(formDataJSON);
  
  if (Object.keys(errorResult).length > 0) {
    
    alert(Object.values(errorResult)[0]);
  } else {
    // console.log(formDataJSON);
    bandwidthCalculator(
      formDataJSON["gbInput"],
      formDataJSON["timeInput"],
      formDataJSON["ratio1Input"],
      formDataJSON["ratio2Input"]
    );
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// DATA CENTER CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const getBenchmarkValue = (value, regionKey1, componentKey1, rangeArray) => {
    let benchmarks = {
      racks: {
        emergingAsia: [280, 250, 200],
        matureAsia: [280, 250, 200],
        emergingEurope: [800, 700, 600],
        matureEurope: [800, 700, 600],
        northAmerica: [800, 700, 600],
        latinAmerica: [280, 250, 200],
        china: [280, 250, 200],
        middleEastAndAfrica: [400, 350, 300],
      },
      cabinets: {
        emergingAsia: [15000, 13000, 12000],
        matureAsia: [15000, 13000, 12000],
        emergingEurope: [15000, 13000, 12000],
        matureEurope: [15000, 13000, 10000],
        northAmerica: [15000, 13000, 10000],
        latinAmerica: [15000, 13000, 12000],
        china: [12000, 11000, 10000],
        middleEastAndAfrica: [20000, 15000, 12000],
      },
      power: {
        emergingAsia: [0.15, 0.15, 0.13], //per Kwh
        matureAsia: [0.23, 0.21, 0.2],
        emergingEurope: [0.08, 0.08, 0.08],
        matureEurope: [0.18, 0.17, 0.17],
        northAmerica: [0.139, 0.137, 0.135],
        latinAmerica: [0.15, 0.15, 0.13],
        china: [0.094, 0.093, 0.092],
        middleEastAndAfrica: [0.07, 0.07, 0.06],
      },
      memory: {
        emergingAsia: [30, 28, 25], //per GB
        matureAsia: [28, 15, 20],
        emergingEurope: [30, 28, 25],
        matureEurope: [28, 25, 20],
        northAmerica: [28, 25, 20],
        latinAmerica: [30, 28, 25],
        china: [28, 25, 20],
        middleEastAndAfrica: [30, 28, 25],
      },
      cpu: {
        emergingAsia: [2600, 2400, 2300],
        matureAsia: [2500, 2400, 2200],
        emergingEurope: [2400, 2300, 2200],
        matureEurope: [2500, 2400, 2200],
        northAmerica: [2500, 2400, 2200],
        latinAmerica: [2800, 2700, 2200],
        china: [1800, 1600, 1500],
        middleEastAndAfrica: [2800, 2500, 2200],
      },
      hypervisor: {
        emergingAsia: [600, 2200, 2000],
        matureAsia: [600, 2200, 2000],
        emergingEurope: [600, 2200, 2000],
        matureEurope: [600, 2200, 2000],
        northAmerica: [600, 2200, 2000],
        latinAmerica: [600, 2200, 2000],
        china: [600, 2200, 2000],
        middleEastAndAfrica: [600, 2200, 2000],
      },
      flashStorage: {
        emergingAsia: [2200, 2000, 700],
        matureAsia: [1800, 1500, 600],
        emergingEurope: [2200, 2000, 700],
        matureEurope: [1800, 1500, 600],
        northAmerica: [1800, 1500, 600],
        latinAmerica: [2200, 2000, 700],
        china: [2200, 2000, 700],
        middleEastAndAfrica: [2200, 2000, 700],
      },
      HDDStorage: {
        emergingAsia: [600, 400, 250],
        matureAsia: [500, 400, 250],
        emergingEurope: [500, 400, 250],
        matureEurope: [500, 400, 250],
        northAmerica: [500, 400, 250],
        latinAmerica: [500, 400, 250],
        china: [500, 400, 250],
        middleEastAndAfrica: [600, 400, 250],
      },
      IPSwitches16: {
        emergingAsia: [350, 300, 250],
        matureAsia: [350, 300, 250],
        emergingEurope: [350, 300, 250],
        matureEurope: [350, 300, 250],
        northAmerica: [350, 300, 250],
        latinAmerica: [350, 300, 250],
        china: [350, 300, 250],
        middleEastAndAfrica: [350, 300, 250],
      },
      IPSwitches32: {
        emergingAsia: [18000, 16000, 15000],
        matureAsia: [18000, 16000, 15000],
        emergingEurope: [18000, 16000, 15000],
        matureEurope: [18000, 16000, 15000],
        northAmerica: [18000, 16000, 15000],
        latinAmerica: [18000, 16000, 15000],
        china: [18000, 16000, 15000],
        middleEastAndAfrica: [18000, 16000, 15000],
      },
      IPSwitches48: {
        emergingAsia: [18000, 16000, 15000],
        matureAsia: [18000, 16000, 15000],
        emergingEurope: [18000, 16000, 15000],
        matureEurope: [18000, 16000, 15000],
        northAmerica: [18000, 16000, 15000],
        latinAmerica: [18000, 16000, 15000],
        china: [18000, 16000, 15000],
        middleEastAndAfrica: [18000, 16000, 15000],
      },
      IPSwitches64: {
        emergingAsia: [20000, 17000, 15000],
        matureAsia: [20000, 17000, 15000],
        emergingEurope: [20000, 17000, 15000],
        matureEurope: [20000, 17000, 15000],
        northAmerica: [20000, 17000, 15000],
        latinAmerica: [20000, 17000, 15000],
        china: [20000, 17000, 15000],
        middleEastAndAfrica: [20000, 17000, 15000],
      },
      IPSwitches96: {
        emergingAsia: [30000, 25000, 20000],
        matureAsia: [30000, 25000, 20000],
        emergingEurope: [30000, 25000, 20000],
        matureEurope: [30000, 25000, 20000],
        northAmerica: [30000, 25000, 20000],
        latinAmerica: [30000, 25000, 20000],
        china: [30000, 25000, 20000],
        middleEastAndAfrica: [30000, 25000, 20000],
      },
      FCSwitches16: {
        emergingAsia: [13000, 13000, 13000],
        matureAsia: [13000, 13000, 13000],
        emergingEurope: [13000, 13000, 13000],
        matureEurope: [13000, 13000, 13000],
        northAmerica: [13000, 13000, 13000],
        latinAmerica: [13000, 13000, 13000],
        china: [13000, 13000, 13000],
        middleEastAndAfrica: [13000, 13000, 13000],
      },
      FCSwitches32: {
        emergingAsia: [20000, 20000, 20000],
        matureAsia: [20000, 20000, 20000],
        emergingEurope: [20000, 20000, 20000],
        matureEurope: [20000, 20000, 20000],
        northAmerica: [20000, 20000, 20000],
        latinAmerica: [20000, 20000, 20000],
        china: [20000, 20000, 20000],
        middleEastAndAfrica: [20000, 20000, 20000],
      },
      storedInHDD: {
        emergingAsia: [600, 400, 250],
        matureAsia: [500, 400, 250],
        emergingEurope: [500, 400, 250],
        matureEurope: [500, 400, 250],
        northAmerica: [500, 400, 250],
        latinAmerica: [500, 400, 250],
        china: [500, 400, 250],
        middleEastAndAfrica: [600, 400, 250],
      },
      storedInCloud: {
        emergingAsia: [23, 23, 23],
        matureAsia: [23, 23, 23],
        emergingEurope: [23, 23, 23],
        matureEurope: [23, 23, 23],
        northAmerica: [23, 23, 23],
        latinAmerica: [23, 23, 23],
        china: [23, 23, 23],
        middleEastAndAfrica: [23, 23, 23],
      },
      storedInTape: {
        emergingAsia: [15, 12, 10],
        matureAsia: [15, 12, 10],
        emergingEurope: [15, 12, 10],
        matureEurope: [15, 12, 10],
        northAmerica: [15, 12, 10],
        latinAmerica: [15, 12, 10],
        china: [15, 12, 10],
        middleEastAndAfrica: [15, 12, 10],
      },
    };
    const regionKey = regionKey1;
    const componentKey = componentKey1;
    let rangIndex = 0;
    for (var i = 0; i < rangeArray.length; i++) {
      if (value <= rangeArray[i]) {
        rangIndex = i;
        break;
      } else if (i === rangeArray.length - 1) {
        rangIndex = i;
        break;
      }
    }
  
    return benchmarks[componentKey][regionKey][rangIndex];
  };
  
  let dataCenterCalculator = (formObj) => {
    let currentQuestion = 1;
    let regionConfig = {
      1: "china",
      2: "emergingAsia",
      5: "matureAsia",
      3: "emergingEurope",
      6: "matureEurope",
      8: "northAmerica",
      4: "latinAmerica",
      7: "middleEastAndAfrica",
    };
  
    // const getBenchmarkValue = (value, stateData) => {
    //   const regionKey = regionConfig[selectedCountry.regionId];
    //   const componentKey = stateData.componentKey;
    //   let rangIndex = 0;
    //   for (var i = 0; i < stateData.range.length; i++) {
    //     if (value <= stateData.range[i]) {
    //       rangIndex = i;
    //       break;
    //     } else if (i === stateData.range.length - 1) {
    //       rangIndex = i;
    //       break;
    //     }
    //   }
    //   // console.log(`benchmarks[${componentKey}][${regionKey}][${rangIndex}]`);
    //   return benchmarks[componentKey][regionKey][rangIndex];
    // };
    let benchmarks = {
      racks: {
        emergingAsia: [280, 250, 200],
        matureAsia: [280, 250, 200],
        emergingEurope: [800, 700, 600],
        matureEurope: [800, 700, 600],
        northAmerica: [800, 700, 600],
        latinAmerica: [280, 250, 200],
        china: [280, 250, 200],
        middleEastAndAfrica: [400, 350, 300],
      },
      cabinets: {
        emergingAsia: [15000, 13000, 12000],
        matureAsia: [15000, 13000, 12000],
        emergingEurope: [15000, 13000, 12000],
        matureEurope: [15000, 13000, 10000],
        northAmerica: [15000, 13000, 10000],
        latinAmerica: [15000, 13000, 12000],
        china: [12000, 11000, 10000],
        middleEastAndAfrica: [20000, 15000, 12000],
      },
      power: {
        emergingAsia: [0.15, 0.15, 0.13], //per Kwh
        matureAsia: [0.23, 0.21, 0.2],
        emergingEurope: [0.08, 0.08, 0.08],
        matureEurope: [0.18, 0.17, 0.17],
        northAmerica: [0.139, 0.137, 0.135],
        latinAmerica: [0.15, 0.15, 0.13],
        china: [0.094, 0.093, 0.092],
        middleEastAndAfrica: [0.07, 0.07, 0.06],
      },
      memory: {
        emergingAsia: [30, 28, 25], //per GB
        matureAsia: [28, 15, 20],
        emergingEurope: [30, 28, 25],
        matureEurope: [28, 25, 20],
        northAmerica: [28, 25, 20],
        latinAmerica: [30, 28, 25],
        china: [28, 25, 20],
        middleEastAndAfrica: [30, 28, 25],
      },
      cpu: {
        emergingAsia: [2600, 2400, 2300],
        matureAsia: [2500, 2400, 2200],
        emergingEurope: [2400, 2300, 2200],
        matureEurope: [2500, 2400, 2200],
        northAmerica: [2500, 2400, 2200],
        latinAmerica: [2800, 2700, 2200],
        china: [1800, 1600, 1500],
        middleEastAndAfrica: [2800, 2500, 2200],
      },
      hypervisor: {
        emergingAsia: [600, 2200, 2000],
        matureAsia: [600, 2200, 2000],
        emergingEurope: [600, 2200, 2000],
        matureEurope: [600, 2200, 2000],
        northAmerica: [600, 2200, 2000],
        latinAmerica: [600, 2200, 2000],
        china: [600, 2200, 2000],
        middleEastAndAfrica: [600, 2200, 2000],
      },
      flashStorage: {
        emergingAsia: [2200, 2000, 700],
        matureAsia: [1800, 1500, 600],
        emergingEurope: [2200, 2000, 700],
        matureEurope: [1800, 1500, 600],
        northAmerica: [1800, 1500, 600],
        latinAmerica: [2200, 2000, 700],
        china: [2200, 2000, 700],
        middleEastAndAfrica: [2200, 2000, 700],
      },
      HDDStorage: {
        emergingAsia: [600, 400, 250],
        matureAsia: [500, 400, 250],
        emergingEurope: [500, 400, 250],
        matureEurope: [500, 400, 250],
        northAmerica: [500, 400, 250],
        latinAmerica: [500, 400, 250],
        china: [500, 400, 250],
        middleEastAndAfrica: [600, 400, 250],
      },
      IPSwitches16: {
        emergingAsia: [350, 300, 250],
        matureAsia: [350, 300, 250],
        emergingEurope: [350, 300, 250],
        matureEurope: [350, 300, 250],
        northAmerica: [350, 300, 250],
        latinAmerica: [350, 300, 250],
        china: [350, 300, 250],
        middleEastAndAfrica: [350, 300, 250],
      },
      IPSwitches32: {
        emergingAsia: [18000, 16000, 15000],
        matureAsia: [18000, 16000, 15000],
        emergingEurope: [18000, 16000, 15000],
        matureEurope: [18000, 16000, 15000],
        northAmerica: [18000, 16000, 15000],
        latinAmerica: [18000, 16000, 15000],
        china: [18000, 16000, 15000],
        middleEastAndAfrica: [18000, 16000, 15000],
      },
      IPSwitches48: {
        emergingAsia: [18000, 16000, 15000],
        matureAsia: [18000, 16000, 15000],
        emergingEurope: [18000, 16000, 15000],
        matureEurope: [18000, 16000, 15000],
        northAmerica: [18000, 16000, 15000],
        latinAmerica: [18000, 16000, 15000],
        china: [18000, 16000, 15000],
        middleEastAndAfrica: [18000, 16000, 15000],
      },
      IPSwitches64: {
        emergingAsia: [20000, 17000, 15000],
        matureAsia: [20000, 17000, 15000],
        emergingEurope: [20000, 17000, 15000],
        matureEurope: [20000, 17000, 15000],
        northAmerica: [20000, 17000, 15000],
        latinAmerica: [20000, 17000, 15000],
        china: [20000, 17000, 15000],
        middleEastAndAfrica: [20000, 17000, 15000],
      },
      IPSwitches96: {
        emergingAsia: [30000, 25000, 20000],
        matureAsia: [30000, 25000, 20000],
        emergingEurope: [30000, 25000, 20000],
        matureEurope: [30000, 25000, 20000],
        northAmerica: [30000, 25000, 20000],
        latinAmerica: [30000, 25000, 20000],
        china: [30000, 25000, 20000],
        middleEastAndAfrica: [30000, 25000, 20000],
      },
      FCSwitches16: {
        emergingAsia: [13000, 13000, 13000],
        matureAsia: [13000, 13000, 13000],
        emergingEurope: [13000, 13000, 13000],
        matureEurope: [13000, 13000, 13000],
        northAmerica: [13000, 13000, 13000],
        latinAmerica: [13000, 13000, 13000],
        china: [13000, 13000, 13000],
        middleEastAndAfrica: [13000, 13000, 13000],
      },
      FCSwitches32: {
        emergingAsia: [20000, 20000, 20000],
        matureAsia: [20000, 20000, 20000],
        emergingEurope: [20000, 20000, 20000],
        matureEurope: [20000, 20000, 20000],
        northAmerica: [20000, 20000, 20000],
        latinAmerica: [20000, 20000, 20000],
        china: [20000, 20000, 20000],
        middleEastAndAfrica: [20000, 20000, 20000],
      },
      storedInHDD: {
        emergingAsia: [600, 400, 250],
        matureAsia: [500, 400, 250],
        emergingEurope: [500, 400, 250],
        matureEurope: [500, 400, 250],
        northAmerica: [500, 400, 250],
        latinAmerica: [500, 400, 250],
        china: [500, 400, 250],
        middleEastAndAfrica: [600, 400, 250],
      },
      storedInCloud: {
        emergingAsia: [23, 23, 23],
        matureAsia: [23, 23, 23],
        emergingEurope: [23, 23, 23],
        matureEurope: [23, 23, 23],
        northAmerica: [23, 23, 23],
        latinAmerica: [23, 23, 23],
        china: [23, 23, 23],
        middleEastAndAfrica: [23, 23, 23],
      },
      storedInTape: {
        emergingAsia: [15, 12, 10],
        matureAsia: [15, 12, 10],
        emergingEurope: [15, 12, 10],
        matureEurope: [15, 12, 10],
        northAmerica: [15, 12, 10],
        latinAmerica: [15, 12, 10],
        china: [15, 12, 10],
        middleEastAndAfrica: [15, 12, 10],
      },
    };
  
    let colocationStatus = {
      value: parseInt(formObj["colocationFacility"]),
      label: parseInt(formObj["colocationFacility"]) == 1 ? "Yes" : "No",
    };
    let replicationCopies = parseInt(formObj["selectNumberOfReplicationCopies"]);
    let countryList = [];
    let selectedCountry = {
      label: "United States",
      regionId: 8,
      regionName: "North America",
      value: 231,
    };
  
    let computeCapacity = parseFloat(
      formObj["atWhatPercentageOfComputeCapacity"]
    );
  
    let rackState = {
      unit: document.getElementById("numberOfRacks") == null ? parseFloat(formObj["numberOfRacks"]) : parseFloat(document.getElementById("numberOfRacks").value),
      // cost: formObj["useRegionalBenchmarksSelectNumberOf"]
      //   ? benchmarks["racks"]["northAmerica"][0]
      //   : parseFloat(formObj["unitCostOfEachRack"]),
      cost: formObj["useRegionalBenchmarksSelectNumberOf"]
        ? getBenchmarkValue(
            parseFloat(formObj["numberOfRacks"]),
            "northAmerica",
            "racks",
            [10, 25, 25]
          )
        : parseFloat(formObj["unitCostOfEachRack"]),
      isBenchmarksChecked: formObj["useRegionalBenchmarksSelectNumberOf"],
      range: [10, 25, 25],
      componentKey: "racks",
    };
  
    let powerState = {
      numberOfRack: parseFloat(formObj["numberOfRacks"]),
      powerPerRack: 6, //kw
      contPerKwh: colocationStatus.value == 0 ? getBenchmarkValue(
        parseFloat(formObj["numberOfRacks"]),
        "northAmerica",
        "power",
        [0.139, 0.137, 0.135]
      ) : 0 ,
      range: [2, 5, 5],
      componentKey: "power",
    };
  
    let cabinetState = {
      unit: document.getElementById("numberOfCabinets") == null ? formObj["numberOfCabinets"] : parseFloat(document.getElementById("numberOfCabinets").value),
      // cost: formObj["useRegionalBenchmarks"]
      //   ? benchmarks["cabinets"]["northAmerica"][0]
      //   : parseFloat(formObj["unitCostOfEachCabinet"]),
      cost: formObj["useRegionalBenchmarks"]
        ? getBenchmarkValue(
            parseFloat(formObj["numberOfCabinets"]),
            "northAmerica",
            "cabinets",
            [10, 25, 25]
          )
        : parseFloat(formObj["unitCostOfEachCabinet"]),
      isBenchmarksChecked: formObj["useRegionalBenchmarks"],
      range: [10, 25, 25],
      componentKey: "cabinets",
    };


    // console.log("rackState", rackState);
    // console.log("cabinetState", cabinetState);
    
    
    let memoryState = {
      unit: formObj["totalMemoryInGB"],
      // cost: formObj["selectTotalMemoryFromRegionalBenchmarks"]
      //   ? benchmarks["memory"]["northAmerica"][0]
      //   : parseFloat(formObj["unitCostPerGBIn"]),
      cost: formObj["selectTotalMemoryFromRegionalBenchmarks"]
        ? getBenchmarkValue(
            parseFloat(formObj["totalMemoryInGB"]),
            "northAmerica",
            "memory",
            [3000, 10000, 10000]
          )
        : parseFloat(formObj["unitCostPerGBIn"]),
      isBenchmarksChecked: formObj["selectTotalMemoryFromRegionalBenchmarks"],
      range: [3000, 10000, 10000],
      componentKey: "memory",
    };
  
    let physicalCUPState = {
      unit: parseFloat(formObj["numberOfCPU"]),
      // cost: formObj["physicalCPURegionalBenchmarks"]
      //   ? benchmarks["cpu"]["northAmerica"][0]
      //   : formObj["unitCostPerCPUsIn"],
      cost: formObj["physicalCPURegionalBenchmarks"]
        ? getBenchmarkValue(
            parseFloat(formObj["numberOfCPU"]),
            "northAmerica",
            "cpu",
            [20, 50, 50]
          )
        : formObj["unitCostPerCPUsIn"],
      isBenchmarksChecked: formObj["physicalCPURegionalBenchmarks"],
      range: [20, 50, 50],
      componentKey: "cpu",
    };
  
    let storageState = {
      isBenchmarksChecked: formObj["selectTotalTBOfRegionalBenchmarks"],
      flashStorage: {
        unit: parseFloat(formObj["flashStorageInTB"]),
        // cost: formObj["selectTotalTBOfRegionalBenchmarks"]
        //   ? benchmarks["flashStorage"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerTBOfFlashStorage"]),
        cost: formObj["selectTotalTBOfRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["flashStorageInTB"]),
              "northAmerica",
              "flashStorage",
              [100, 250, 250]
            )
          : parseFloat(formObj["unitCostPerTBOfFlashStorage"]),
        range: [100, 250, 250],
        componentKey: "flashStorage",
      },
      hddStorage: {
        unit: parseFloat(formObj["hddStorageInTB"]),
        // cost: formObj["selectTotalTBOfRegionalBenchmarks"]
        //   ? benchmarks["HDDStorage"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerTBOfHDDStorage"]),
        cost: formObj["selectTotalTBOfRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["hddStorageInTB"]),
              "northAmerica",
              "HDDStorage",
              [100, 250, 250]
            )
          : parseFloat(formObj["unitCostPerTBOfHDDStorage"]),
        range: [100, 250, 250],
        componentKey: "HDDStorage",
      },
    };
  
    let ipSwitchesState = {
      isBenchmarksChecked: formObj["selectTotalNumberIPregionalBenchmarks"],
      switches16: {
        unit: parseFloat(formObj["numberOfIPSwitches16Ports"]),
        // cost: formObj["selectTotalNumberIPregionalBenchmarks"]
        //   ? benchmarks["IPSwitches16"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn"]),
        cost: formObj["selectTotalNumberIPregionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfIPSwitches16Ports"]),
              "northAmerica",
              "IPSwitches16",
              [3, 6, 6]
            )
          : parseFloat(formObj["unitCostPerSwitchIn"]),
        range: [3, 6, 6],
        componentKey: "IPSwitches16",
      },
      switches32: {
        unit: parseFloat(formObj["numberOfIPSwitches32Ports"]),
        // cost: formObj["selectTotalNumberIPregionalBenchmarks"]
        //   ? benchmarks["IPSwitches32"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn2"]),
        cost: formObj["selectTotalNumberIPregionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfIPSwitches32Ports"]),
              "northAmerica",
              "IPSwitches32",
              [3, 6, 6]
            )
          : parseFloat(formObj["unitCostPerSwitchIn2"]),
        range: [3, 6, 6],
        componentKey: "IPSwitches32",
      },
      switches48: {
        unit: parseFloat(formObj["numberOfIPSwitches48Ports"]),
        // cost: formObj["selectTotalNumberIPregionalBenchmarks"]
        //   ? benchmarks["IPSwitches48"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn3"]),
        cost: formObj["selectTotalNumberIPregionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfIPSwitches48Ports"]),
              "northAmerica",
              "IPSwitches48",
              [3, 6, 6]
            )
          : parseFloat(formObj["unitCostPerSwitchIn3"]),
        range: [3, 6, 6],
        componentKey: "IPSwitches48",
      },
      switches64: {
        unit: parseFloat(formObj["numberOfIPSwitches64Ports"]),
        // cost: formObj["selectTotalNumberIPregionalBenchmarks"]
        //   ? benchmarks["IPSwitches64"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn4"]),
        cost: formObj["selectTotalNumberIPregionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfIPSwitches64Ports"]),
              "northAmerica",
              "IPSwitches64",
              [3, 6, 6]
            )
          : parseFloat(formObj["unitCostPerSwitchIn4"]),
        range: [3, 6, 6],
        componentKey: "IPSwitches64",
      },
      switches96: {
        unit: parseFloat(formObj["numberOfIPSwitches96Ports"]),
        // cost: formObj["selectTotalNumberIPregionalBenchmarks"]
        //   ? benchmarks["IPSwitches96"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn5"]),
        cost: formObj["selectTotalNumberIPregionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfIPSwitches96Ports"]),
              "northAmerica",
              "IPSwitches96",
              [3, 6, 6]
            )
          : parseFloat(formObj["unitCostPerSwitchIn5"]),
        range: [3, 6, 6],
        componentKey: "IPSwitches96",
      },
    };
  
    let fabricSwitchesState = {
      isBenchmarksChecked: formObj["selectTotalNumberSANRegionalBenchmarks"],
      switches16: {
        unit: parseFloat(formObj["numberOfFCSwitches16Ports"]),
        // cost: formObj["selectTotalNumberSANRegionalBenchmarks"]
        //   ? benchmarks["FCSwitches16"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn6"]),
        cost: formObj["selectTotalNumberSANRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfFCSwitches16Ports"]),
              "northAmerica",
              "FCSwitches16",
              [2, 5, 5]
            )
          : parseFloat(formObj["unitCostPerSwitchIn6"]),
        range: [2, 5, 5],
        componentKey: "FCSwitches16",
      },
      switches32: {
        unit: parseFloat(formObj["numberOfFCSwitches32Ports"]),
        // cost: formObj["selectTotalNumberSANRegionalBenchmarks"]
        //   ? benchmarks["FCSwitches32"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerSwitchIn7"]),
        cost: formObj["selectTotalNumberSANRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["numberOfFCSwitches32Ports"]),
              "northAmerica",
              "FCSwitches32",
              [2, 5, 5]
            )
          : parseFloat(formObj["unitCostPerSwitchIn7"]),
        range: [2, 5, 5],
        componentKey: "FCSwitches32",
      },
    };
  
    let hypervisorState = {
      unit: parseFloat(formObj["numberOfHypervisorLicenses"]),
      // cost: formObj["selectNumberOfHypervisorRegionalBenchmarks"]
      //   ? benchmarks["hypervisor"]["northAmerica"][0]
      //   : parseFloat(formObj["unitCostPerSocketLicenseIn"]),
      cost: formObj["selectNumberOfHypervisorRegionalBenchmarks"]
        ? getBenchmarkValue(
            parseFloat(formObj["numberOfHypervisorLicenses"]),
            "northAmerica",
            "hypervisor",
            [20, 50, 50]
          )
        : parseFloat(formObj["unitCostPerSocketLicenseIn"]),
      isBenchmarksChecked: formObj["selectNumberOfHypervisorRegionalBenchmarks"],
      range: [20, 50, 50],
      componentKey: "hypervisor",
    };
  
    let backupStorageState = {
      isBenchmarksChecked: formObj["terabytesOfBackupStorageRegionalBenchmarks"],
      storedInHDD: {
        unit: parseFloat(formObj["totalDeduplicatedStorageInTB"]),
        // cost: formObj["terabytesOfBackupStorageRegionalBenchmarks"]
        //   ? benchmarks["storedInHDD"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerTBIn"]),
        cost: formObj["terabytesOfBackupStorageRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["totalDeduplicatedStorageInTB"]),
              "northAmerica",
              "storedInHDD",
              [100, 250, 250]
            )
          : parseFloat(formObj["unitCostPerTBIn"]),
        range: [100, 250, 250],
        componentKey: "storedInHDD",
      },
      storedInCloud: {
        unit: parseFloat(formObj["totalDeduplicatedStorageCloud"]),
        // cost: formObj["terabytesOfBackupStorageRegionalBenchmarks"]
        //   ? benchmarks["storedInCloud"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerTBIn2"]),
        cost: formObj["terabytesOfBackupStorageRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["totalDeduplicatedStorageCloud"]),
              "northAmerica",
              "storedInCloud",
              [100, 250, 250]
            )
          : parseFloat(formObj["unitCostPerTBIn2"]),
        range: [100, 250, 250],
        componentKey: "storedInCloud",
      },
      storedInTape: {
        unit: parseFloat(formObj["totalDeduplicatedStorageTape"]),
        // cost: formObj["terabytesOfBackupStorageRegionalBenchmarks"]
        //   ? benchmarks["storedInTape"]["northAmerica"][0]
        //   : parseFloat(formObj["unitCostPerTBIn3"]),
        cost: formObj["terabytesOfBackupStorageRegionalBenchmarks"]
          ? getBenchmarkValue(
              parseFloat(formObj["totalDeduplicatedStorageTape"]),
              "northAmerica",
              "storedInTape",
              [100, 250, 250]
            )
          : parseFloat(formObj["unitCostPerTBIn3"]),
        range: [100, 250, 250],
        componentKey: "storedInTape",
      },
    };
    let manpowerState = {
      architects: {
        unit: parseFloat(formObj["numberOfArchitects"]),
        cost: parseFloat(formObj["pricePerResourceIn"]),
      },
      administrators: {
        unit: parseFloat(formObj["numberOfInfrastructureAdmins"]),
        cost: parseFloat(formObj["pricePerResourceIn2"]),
      },
      systemEngineers: {
        unit: parseFloat(formObj["numberOfSystemEngineers"]),
        cost: parseFloat(formObj["pricePerResourceIn3"]),
      },
    };
  
    let videoQualityData = {
      0: "0%",
      25: "25%",
      50: "50%",
      75: "75%",
      100: "100%",
    };
  
    let infrastructureRackTable = {
      numberOfRack: {
        component: "Number of racks",
        unit: 10,
        unitCost: 0,
        oneYearCost: 0,
        twoYearCost: 0,
        threeYearCost: 0,
      },
    };
  
    let infrastructurePowerTable = {
      totalPower: {
        component: "Total power",
        numberOfRack: 0,
        powerPerRack: 6, //kw
        letPerKwh: 0,
        oneYearCost: 0,
        twoYearCost: 0,
        threeYearCost: 0,
      },
      totalOwnInfraCost: {
        component: "Total Cost of On-premise Infrastructure",
        unit: 10,
        unitCost: 0,
        oneYearCost: 0,
        twoYearCost: 0,
        threeYearCost: 0,
      },
    };
  
    let colocationTable = {
      numberOfCabinets: {
        component: "Number of cabinets",
        unit: 0, //A=Q3
        unitCostPerRackPerYear: 0, //B=Q3
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=2C
        threeYearCost: 0, //E=3C
      },
    };
  
    let computeCostTable = {
      memory: {
        component: "Memory from all applications in GB",
        unit: 0, //A=Q5
        unitCost: 0, //B=Q5
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%C
        threeYearCost: 0, //E=D+15%C
      },
      physical: {
        component: "Physical CPUs",
        unit: 0, //A=Q6
        unitCost: 0, //B=Q6
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      hypervisor: {
        component: "Hypervisor licenses in sockets",
        unit: 0, //A=Q10
        unitCost: 0, //B=Q10
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      letOfDR: {
        component: "Cost of DR infrastructure",
        unit: 0, //A= inputfrom Q.13
        unitCost: 0,
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      total: {
        component: "Total Compute Costs",
        unit: "NA", //A=sum of all above
        unitCost: "NA", //B=sum of all above
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
    };
  
    let storageCostTable = {
      flashStorage: {
        component: "Flash storage in TB",
        unit: 0, //A=Q7.1
        unitCost: 0, //B=Q7.1
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      HDDStorage: {
        component: "HDD storage in TB",
        unit: 0, //A=Q7.2
        unitCost: 0, //B=Q7.2
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      replicatedData: {
        component: "Total data replicated in TB",
        unit: 0, //A=input from Q.12
        unitCost: 0,
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      storageCost: {
        component: "Total Storage costs",
        unit: "NA", //A=sum of all above
        unitCost: "NA", //B=sum of all above
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
    };
  
    let networkCostTable = {
      IPSwitches16: {
        component: "IP switches (16 ports)",
        unit: 0, //A=8.1
        unitCost: 0, //B=8.1
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      IPSwitches32: {
        component: "IP switches (32 ports)",
        unit: 0, //A=8.2
        unitCost: 0, //B=8.2
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      IPSwitches48: {
        component: "IP switches (48 ports)",
        unit: 0, //A=8.3
        unitCost: 0, //B=8.3
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      IPSwitches64: {
        component: "IP switches (64 ports)",
        unit: 0, //A=8.4
        unitCost: 0, //B=8.4
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      IPSwitches96: {
        component: "IP switches (96 ports)",
        unit: 0, //A=8.5
        unitCost: 0, //B=8.5
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      FCSwitches16: {
        component: "FC switches (16 ports)",
        unit: 0, //A=9.1
        unitCost: 0, //B=9.1
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      FCSwitches32: {
        component: "FC switches (32 ports)",
        unit: 0, //A=9.2
        unitCost: 0, //B=9.2
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      total: {
        component: "Total Network Costs",
        unit: "NA", //A=sum of all above
        unitCost: "NA", //B=sum of all above
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
    };
  
    let backupTable = {
      storedInCloud: {
        component: "Backup data stored in cloud",
        unit: 0, //A=11.2
        unitCost: 0, //B=11.2
        oneYearCost: 0, //C=(A*B*12)
        twoYearCost: 0, //D=(A*B*24)
        threeYearCost: 0, //E=(A*B*36)
      },
      storedInHDD: {
        component: "Backup data stored in HDD media in TB",
        unit: 0, //A=11.1
        unitCost: 0, //B=11.1
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      storedInTape: {
        component: "Backup data stored in tape",
        unit: 0, //A=11.3
        unitCost: 0, //B=11.3
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=C+15%
        threeYearCost: 0, //E=D+15%
      },
      total: {
        component: "Total Back Up Costs",
        unit: "NA",
        unitCost: "NA",
        oneYearCost: 0,
        twoYearCost: 0,
        threeYearCost: 0,
      },
    };
  
    let manpowerTable = {
      architects: {
        component: "Architects",
        unit: 0, //A=13.1
        unitCost: 0, //B=13.1
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=2C
        threeYearCost: 0, //E=3C
      },
      systemsEngineers: {
        component: "Systems Engineers",
        unit: 0, //A=13.3
        unitCost: 0, //B=13.3
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=2C
        threeYearCost: 0, //E=3C
      },
      administrators: {
        component: "Administrators",
        unit: 0, //A=13.2
        unitCost: 0, //B=13.2
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=2C
        threeYearCost: 0, //E=3C
      },
      total: {
        component: "Total cost of manpower",
        unit: "NA",
        unitCost: "NA",
        oneYearCost: 0, //C=(A*B)
        twoYearCost: 0, //D=2C
        threeYearCost: 0, //E=3C
      },
    };
  
    let totalCostTable = {
      passiveComponents: {
        component: "Passive Components",
        oneYearCost: 0, //T1.2
        twoYearCost: 0, //T1.2
        threeYearCost: 0, //T1.2
      },
      activeComponents: {
        component: "Active components ",
        oneYearCost: 0, //T2 sum All
        twoYearCost: 0, //T2 sum All
        threeYearCost: 0, //T2 sum All
      },
      manpower: {
        component: "Manpower",
        oneYearCost: 0, //T3 Sum
        twoYearCost: 0, //T3 Sum
        threeYearCost: 0, //T3 Sum
      },
    };
  
    ////////////////////////////////////////////////// Calculate logic ///////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Infrastructure Rack table
    let rackUnit = rackState.unit;
    let rackCost = rackState.cost;
    let rackOneYearCost = rackUnit * rackCost;
    let rackTwoYearCost = rackOneYearCost + (rackOneYearCost * 15) / 100;
    let rackThreeYearCost = rackTwoYearCost + (rackOneYearCost * 15) / 100;
    infrastructureRackTable["numberOfRack"] = {
      unit: rackUnit,
      unitCost: rackCost,
      oneYearCost: rackOneYearCost.toFixed(2),
      twoYearCost: rackTwoYearCost.toFixed(2),
      threeYearCost: rackThreeYearCost.toFixed(2),
    };
  
    // Infrastructure Power table
    let numberOfRack = powerState.numberOfRack;
    let powerPerRack = powerState.powerPerRack;
    let letPerKwh = powerState.contPerKwh;
    let powerOneYearCost = numberOfRack * powerPerRack * 24 * 31 * 12 * letPerKwh;
    let powerTwoYearCost = 2 * powerOneYearCost;
    let powerThreeYearCost = 3 * powerOneYearCost;
  
    // let totalInfrastructureUnit = rackUnit + numberOfRack;
    // let totalInfrastructureCost = rackCost + letPerKwh;
    let totalInfrastructureOneYearCost = rackOneYearCost + powerOneYearCost;
    let totalInfrastructureTwoYearCost = rackTwoYearCost + powerTwoYearCost;
    let totalInfrastructureThreeYearCost = rackThreeYearCost + powerThreeYearCost;
    infrastructurePowerTable = {
      ["totalPower"]: {
        numberOfRack: numberOfRack,
        letPerKwh: letPerKwh,
        powerPerRack: 6,
        oneYearCost: powerOneYearCost.toFixed(2),
        twoYearCost: powerTwoYearCost.toFixed(2),
        threeYearCost: powerThreeYearCost.toFixed(2),
      },
      ["totalOwnInfraCost"]: {
        unit: numberOfRack,
        unitCost: "-",
        oneYearCost: totalInfrastructureOneYearCost.toFixed(2),
        twoYearCost: totalInfrastructureTwoYearCost.toFixed(2),
        threeYearCost: totalInfrastructureThreeYearCost.toFixed(2),
      },
    };
  
    // calculation table
    let numberOfCabinets = cabinetState.unit;
    let cabinetCost = cabinetState.cost;
    let cabinetOneYearCost = numberOfCabinets * cabinetCost;
    let cabinetTwoYearCost = 2 * cabinetOneYearCost;
    let cabinetThreeYearCost = 3 * cabinetOneYearCost;
    colocationTable = {
      ["numberOfCabinets"]: {
        unit: numberOfCabinets,
        unitCostPerRackPerYear: cabinetCost,
        oneYearCost: cabinetOneYearCost.toFixed(2),
        twoYearCost: cabinetTwoYearCost.toFixed(2),
        threeYearCost: cabinetThreeYearCost.toFixed(2),
      },
    };
  
    // compute cost calculation
    let memoryUnit = memoryState.unit;
    let memoryCost = memoryState.cost;
    let memoryOneYearCost = memoryUnit * memoryCost;
    let memoryTwoYearCost = memoryOneYearCost + (memoryOneYearCost * 15) / 100;
    let memoryThreeYearCost = memoryTwoYearCost + (memoryOneYearCost * 15) / 100;
  
    let physicalUnit = physicalCUPState.unit;
    let physicalCost = physicalCUPState.cost;
    let physicalOneYearCost = physicalUnit * physicalCost;
    let physicalTwoYearCost =
      physicalOneYearCost + (physicalOneYearCost * 15) / 100;
    let physicalThreeYearCost =
      physicalTwoYearCost + (physicalOneYearCost * 15) / 100;
  
    let hypervisorUnit = hypervisorState.unit;
    let hypervisorCost = hypervisorState.cost;
    let hypervisorOneYearCost = hypervisorUnit * hypervisorCost;
    let hypervisorTwoYearCost =
      hypervisorOneYearCost + (hypervisorOneYearCost * 15) / 100;
    let hypervisorThreeYearCost =
      hypervisorTwoYearCost + (hypervisorOneYearCost * 15) / 100;
  
    let infraUnit = Math.round(
      parseFloat((physicalCUPState.unit * computeCapacity) / 100),
      0
    );
    let infraCost = parseFloat((physicalCUPState.cost * computeCapacity) / 100);
    let infraOneYearCost = infraUnit * infraCost;
    let infraTwoYearCost = infraOneYearCost + (infraOneYearCost * 15) / 100;
    let infraThreeYearCost = infraTwoYearCost + (infraOneYearCost * 15) / 100;
  
    let totalComputeCostUnit =
      parseFloat(memoryUnit) +
      parseFloat(physicalUnit) +
      parseFloat(hypervisorUnit) +
      parseFloat(infraUnit);
    let totalComputeCostCost =
      parseFloat(memoryCost) +
      parseFloat(physicalCost) +
      parseFloat(hypervisorCost) +
      parseFloat(infraCost);
    let totalComputeCostOneYearCost =
      memoryOneYearCost +
      physicalOneYearCost +
      hypervisorOneYearCost +
      infraOneYearCost;
    let totalComputeCostTwoYearCost =
      memoryTwoYearCost +
      physicalTwoYearCost +
      hypervisorTwoYearCost +
      infraTwoYearCost;
    let totalComputeCostThreeYearCost =
      memoryThreeYearCost +
      physicalThreeYearCost +
      hypervisorThreeYearCost +
      infraThreeYearCost;
  
    computeCostTable = {
      ["memory"]: {
        unit: memoryUnit,
        unitCost: memoryCost,
        oneYearCost: memoryOneYearCost.toFixed(2),
        twoYearCost: memoryTwoYearCost.toFixed(2),
        threeYearCost: memoryThreeYearCost.toFixed(2),
      },
      ["physical"]: {
        unit: physicalUnit,
        unitCost: physicalCost,
        oneYearCost: physicalOneYearCost.toFixed(2),
        twoYearCost: physicalTwoYearCost.toFixed(2),
        threeYearCost: physicalThreeYearCost.toFixed(2),
      },
      ["hypervisor"]: {
        unit: hypervisorUnit,
        unitCost: hypervisorCost,
        oneYearCost: hypervisorOneYearCost.toFixed(2),
        twoYearCost: hypervisorTwoYearCost.toFixed(2),
        threeYearCost: hypervisorThreeYearCost.toFixed(2),
      },
      ["letOfDR"]: {
        unit: infraUnit,
        unitCost: physicalCost,
        oneYearCost: infraOneYearCost.toFixed(2),
        twoYearCost: infraTwoYearCost.toFixed(2),
        threeYearCost: infraThreeYearCost.toFixed(2),
      },
      ["total"]: {
        oneYearCost: totalComputeCostOneYearCost.toFixed(2),
        twoYearCost: totalComputeCostTwoYearCost.toFixed(2),
        threeYearCost: totalComputeCostThreeYearCost.toFixed(2),
      },
    };
  
    // Storage cost calculation
    let flashStorageUnit = storageState["flashStorage"].unit;
  
    let flashStorageCost = storageState["flashStorage"].cost;
  
    let flashStorageOneYearCost = flashStorageUnit * flashStorageCost;
    let flashStorageTwoYearCost =
      flashStorageOneYearCost + (flashStorageOneYearCost * 15) / 100;
    let flashStorageThreeYearCost =
      flashStorageTwoYearCost + (flashStorageOneYearCost * 15) / 100;
  
    let hddStorageUnit = storageState["hddStorage"].unit;
  
    let hddStorageCost = storageState["hddStorage"].cost;
  
    let hddStorageOneYearCost = hddStorageUnit * hddStorageCost;
    let hddStorageTwoYearCost =
      hddStorageOneYearCost + (hddStorageOneYearCost * 15) / 100;
    let hddStorageThreeYearCost =
      hddStorageTwoYearCost + (hddStorageOneYearCost * 15) / 100;
  
    let replicatedStorageUnit =
      (flashStorageUnit + hddStorageUnit) * replicationCopies;
    let replicatedStorageCost = (flashStorageCost + hddStorageCost) / 2;
    let replicatedStorageOneYearCost =
      replicatedStorageUnit * replicatedStorageCost;
    let replicatedStorageTwoYearCost =
      replicatedStorageOneYearCost + (replicatedStorageOneYearCost * 15) / 100;
    let replicatedStorageThreeYearCost =
      replicatedStorageTwoYearCost + (replicatedStorageOneYearCost * 15) / 100;
  
    let totalStorageUnit =
      flashStorageUnit + hddStorageUnit + replicatedStorageUnit;
    let totalStorageCost =
      flashStorageCost + hddStorageCost + replicatedStorageCost;
  
    let totalStorageOneYearCost =
      flashStorageOneYearCost +
      hddStorageOneYearCost +
      replicatedStorageOneYearCost;
    let totalStorageTwoYearCost =
      flashStorageTwoYearCost +
      hddStorageTwoYearCost +
      replicatedStorageTwoYearCost;
    let totalStorageThreeYearCost =
      flashStorageThreeYearCost +
      hddStorageThreeYearCost +
      replicatedStorageThreeYearCost;
  
    storageCostTable = {
      ["flashStorage"]: {
        unit: flashStorageUnit,
        unitCost: flashStorageCost,
        oneYearCost: flashStorageOneYearCost.toFixed(2),
        twoYearCost: flashStorageTwoYearCost.toFixed(2),
        threeYearCost: flashStorageThreeYearCost.toFixed(2),
      },
      ["HDDStorage"]: {
        unit: hddStorageUnit,
        unitCost: hddStorageCost,
        oneYearCost: hddStorageOneYearCost.toFixed(2),
        twoYearCost: hddStorageTwoYearCost.toFixed(2),
        threeYearCost: hddStorageThreeYearCost.toFixed(2),
      },
      ["replicatedData"]: {
        unit: replicatedStorageUnit,
        unitCost: replicatedStorageCost,
        oneYearCost: replicatedStorageOneYearCost.toFixed(2),
        twoYearCost: replicatedStorageTwoYearCost.toFixed(2),
        threeYearCost: replicatedStorageThreeYearCost.toFixed(2),
      },
      ["storageCost"]: {
        oneYearCost: totalStorageOneYearCost.toFixed(2),
        twoYearCost: totalStorageTwoYearCost.toFixed(2),
        threeYearCost: totalStorageThreeYearCost.toFixed(2),
      },
    };
  
    // Network cost calculation
    let IPSwitches16Unit = ipSwitchesState["switches16"].unit;
  
    let IPSwitches16Cost = ipSwitchesState["switches16"].cost;
  
    let IPSwitches16OneYearCost = IPSwitches16Unit * IPSwitches16Cost;
    let IPSwitches16TwoYearCost =
      IPSwitches16OneYearCost + (IPSwitches16OneYearCost * 15) / 100;
    let IPSwitches16ThreeYearCost =
      IPSwitches16TwoYearCost + (IPSwitches16OneYearCost * 15) / 100;
  
    let IPSwitches32Unit = ipSwitchesState["switches32"].unit;
  
    let IPSwitches32Cost = ipSwitchesState["switches32"].cost;
  
    let IPSwitches32OneYearCost = IPSwitches32Unit * IPSwitches32Cost;
    let IPSwitches32TwoYearCost =
      IPSwitches32OneYearCost + (IPSwitches32OneYearCost * 15) / 100;
    let IPSwitches32ThreeYearCost =
      IPSwitches32TwoYearCost + (IPSwitches32OneYearCost * 15) / 100;
  
    let IPSwitches48Unit = ipSwitchesState["switches48"].unit;
  
    let IPSwitches48Cost = ipSwitchesState["switches48"].cost;
  
    let IPSwitches48OneYearCost = IPSwitches48Unit * IPSwitches48Cost;
    let IPSwitches48TwoYearCost =
      IPSwitches48OneYearCost + (IPSwitches48OneYearCost * 15) / 100;
    let IPSwitches48ThreeYearCost =
      IPSwitches48TwoYearCost + (IPSwitches48OneYearCost * 15) / 100;
  
    let IPSwitches64Unit = ipSwitchesState["switches64"].unit;
  
    let IPSwitches64Cost = ipSwitchesState["switches64"].cost;
  
    let IPSwitches64OneYearCost = IPSwitches64Unit * IPSwitches64Cost;
    let IPSwitches64TwoYearCost =
      IPSwitches64OneYearCost + (IPSwitches64OneYearCost * 15) / 100;
    let IPSwitches64ThreeYearCost =
      IPSwitches64TwoYearCost + (IPSwitches64OneYearCost * 15) / 100;
  
    let IPSwitches96Unit = ipSwitchesState["switches96"].unit;
  
    let IPSwitches96Cost = ipSwitchesState["switches96"].cost;
  
    let IPSwitches96OneYearCost = IPSwitches96Unit * IPSwitches96Cost;
    let IPSwitches96TwoYearCost =
      IPSwitches96OneYearCost + (IPSwitches96OneYearCost * 15) / 100;
    let IPSwitches96ThreeYearCost =
      IPSwitches96TwoYearCost + (IPSwitches96OneYearCost * 15) / 100;
  
    let FCSwitches16Unit = fabricSwitchesState["switches16"].unit;
  
    let FCSwitches16Cost = fabricSwitchesState["switches16"].cost;
  
    let FCSwitches16OneYearCost = FCSwitches16Unit * FCSwitches16Cost;
    let FCSwitches16TwoYearCost =
      FCSwitches16OneYearCost + (FCSwitches16OneYearCost * 15) / 100;
    let FCSwitches16ThreeYearCost =
      FCSwitches16TwoYearCost + (FCSwitches16OneYearCost * 15) / 100;
  
    let FCSwitches32Unit = fabricSwitchesState["switches32"].unit;
  
    let FCSwitches32Cost = fabricSwitchesState["switches32"].cost;
  
    let FCSwitches32OneYearCost = FCSwitches32Unit * FCSwitches32Cost;
    let FCSwitches32TwoYearCost =
      FCSwitches32OneYearCost + (FCSwitches32OneYearCost * 15) / 100;
    let FCSwitches32ThreeYearCost =
      FCSwitches32TwoYearCost + (FCSwitches32OneYearCost * 15) / 100;
  
    let totalNetworkUnit =
      IPSwitches16Unit +
      IPSwitches32Unit +
      IPSwitches48Unit +
      IPSwitches64Unit +
      IPSwitches96Unit +
      FCSwitches16Unit +
      FCSwitches32Unit;
    let totalNetworkCost =
      IPSwitches16Cost +
      IPSwitches32Cost +
      IPSwitches48Cost +
      IPSwitches64Cost +
      IPSwitches96Cost +
      FCSwitches16Cost +
      FCSwitches32Cost;
    let totalNetworkOneYearCost =
      IPSwitches16OneYearCost +
      IPSwitches32OneYearCost +
      IPSwitches48OneYearCost +
      IPSwitches64OneYearCost +
      IPSwitches96OneYearCost +
      FCSwitches16OneYearCost +
      FCSwitches32OneYearCost;
    let totalNetworkTwoYearCost =
      IPSwitches16TwoYearCost +
      IPSwitches32TwoYearCost +
      IPSwitches48TwoYearCost +
      IPSwitches64TwoYearCost +
      IPSwitches96TwoYearCost +
      FCSwitches16TwoYearCost +
      FCSwitches32TwoYearCost;
    let totalNetworkThreeYearCost =
      IPSwitches16ThreeYearCost +
      IPSwitches32ThreeYearCost +
      IPSwitches48ThreeYearCost +
      IPSwitches64ThreeYearCost +
      IPSwitches96ThreeYearCost +
      FCSwitches16ThreeYearCost +
      FCSwitches32ThreeYearCost;
    networkCostTable = {
      ["IPSwitches16"]: {
        unit: IPSwitches16Unit,
        unitCost: IPSwitches16Cost,
        oneYearCost: IPSwitches16OneYearCost.toFixed(2),
        twoYearCost: IPSwitches16TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches16ThreeYearCost.toFixed(2),
      },
      ["IPSwitches32"]: {
        unit: IPSwitches32Unit,
        unitCost: IPSwitches32Cost,
        oneYearCost: IPSwitches32OneYearCost.toFixed(2),
        twoYearCost: IPSwitches32TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches32ThreeYearCost.toFixed(2),
      },
      ["IPSwitches48"]: {
        unit: IPSwitches48Unit,
        unitCost: IPSwitches48Cost,
        oneYearCost: IPSwitches48OneYearCost.toFixed(2),
        twoYearCost: IPSwitches48TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches48ThreeYearCost.toFixed(2),
      },
      ["IPSwitches64"]: {
        unit: IPSwitches64Unit,
        unitCost: IPSwitches64Cost,
        oneYearCost: IPSwitches64OneYearCost.toFixed(2),
        twoYearCost: IPSwitches64TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches64ThreeYearCost.toFixed(2),
      },
      ["IPSwitches96"]: {
        unit: IPSwitches96Unit,
        unitCost: IPSwitches96Cost,
        oneYearCost: IPSwitches96OneYearCost.toFixed(2),
        twoYearCost: IPSwitches96TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches96ThreeYearCost.toFixed(2),
      },
      ["FCSwitches16"]: {
        unit: FCSwitches16Unit,
        unitCost: FCSwitches16Cost,
        oneYearCost: FCSwitches16OneYearCost.toFixed(2),
        twoYearCost: FCSwitches16TwoYearCost.toFixed(2),
        threeYearCost: FCSwitches16ThreeYearCost.toFixed(2),
      },
      ["FCSwitches32"]: {
        unit: FCSwitches32Unit,
        unitCost: FCSwitches32Cost,
        oneYearCost: FCSwitches32OneYearCost.toFixed(2),
        twoYearCost: FCSwitches32TwoYearCost.toFixed(2),
        threeYearCost: FCSwitches32ThreeYearCost.toFixed(2),
      },
      ["total"]: {
        oneYearCost: totalNetworkOneYearCost.toFixed(2),
        twoYearCost: totalNetworkTwoYearCost.toFixed(2),
        threeYearCost: totalNetworkThreeYearCost.toFixed(2),
      },
    };
  
    // Backup cost calculation
    let storedHDDUnit = backupStorageState["storedInHDD"].unit;
  
    let storedHDDCost = backupStorageState["storedInHDD"].cost;
  
    let storedHDDOneYearCost = storedHDDUnit * storedHDDCost;
    let storedHDDTwoYearCost =
      storedHDDOneYearCost + (storedHDDOneYearCost * 15) / 100;
    let storedHDDThreeYearCost =
      storedHDDTwoYearCost + (storedHDDOneYearCost * 15) / 100;
  
    let storedTapeUnit = backupStorageState["storedInTape"].unit;
    let storedTapeCost = backupStorageState["storedInTape"].cost;
  
    let storedTapeOneYearCost = storedTapeUnit * storedTapeCost;
    let storedTapeTwoYearCost =
      storedTapeOneYearCost + (storedTapeOneYearCost * 15) / 100;
    let storedTapeThreeYearCost =
      storedTapeTwoYearCost + (storedTapeOneYearCost * 15) / 100;
  
    let storedCloudUnit = backupStorageState["storedInCloud"].unit;
    let storedCloudCost = backupStorageState["storedInCloud"].cost;
  
    let storedCloudOneYearCost = storedCloudUnit * storedCloudCost * 12;
    let storedCloudTwoYearCost = storedCloudOneYearCost * 2;
    let storedCloudThreeYearCost = storedCloudOneYearCost * 3;
  
    let totalBackUpUnit = storedHDDUnit + storedTapeUnit + storedCloudUnit;
    let totalBackUpCost = storedHDDCost + storedTapeCost + storedCloudCost;
    let totalBackUpOneYearCost =
      storedHDDOneYearCost + storedTapeOneYearCost + storedCloudOneYearCost;
    let totalBackUpTwoYearCost =
      storedHDDTwoYearCost + storedTapeTwoYearCost + storedCloudTwoYearCost;
    let totalBackUpThreeYearCost =
      storedHDDThreeYearCost + storedTapeThreeYearCost + storedCloudThreeYearCost;
    backupTable = {
      ["storedInHDD"]: {
        unit: storedHDDUnit,
        unitCost: storedHDDCost,
        oneYearCost: storedHDDOneYearCost.toFixed(2),
        twoYearCost: storedHDDTwoYearCost.toFixed(2),
        threeYearCost: storedHDDThreeYearCost.toFixed(2),
      },
      ["storedInCloud"]: {
        unit: storedCloudUnit,
        unitCost: storedCloudCost,
        oneYearCost: storedCloudOneYearCost.toFixed(2),
        twoYearCost: storedCloudTwoYearCost.toFixed(2),
        threeYearCost: storedCloudThreeYearCost.toFixed(2),
      },
      ["storedInTape"]: {
        unit: storedTapeUnit,
        unitCost: storedTapeCost,
        oneYearCost: storedTapeOneYearCost.toFixed(2),
        twoYearCost: storedTapeTwoYearCost.toFixed(2),
        threeYearCost: storedTapeThreeYearCost.toFixed(2),
      },
      ["total"]: {
        unit: "NA",
        unitCost: "NA",
        oneYearCost: totalBackUpOneYearCost.toFixed(2),
        twoYearCost: totalBackUpTwoYearCost.toFixed(2),
        threeYearCost: totalBackUpThreeYearCost.toFixed(2),
      },
    };
    // cost of manpower calculation T3
    let architectsUnit = manpowerState["architects"].unit;
    let architectsCost = manpowerState["architects"].cost;
  
    let architectsOneYearCost = architectsUnit * architectsCost;
    let architectsTwoYearCost = architectsOneYearCost * 2;
    let architectsThreeYearCost = architectsOneYearCost * 3;
  
    let administratorsUnit = manpowerState["administrators"].unit;
    let administratorsCost = manpowerState["administrators"].cost;
  
    let administratorsOneYearCost = administratorsUnit * administratorsCost;
    let administratorsTwoYearCost = administratorsOneYearCost * 2;
    let administratorsThreeYearCost = administratorsOneYearCost * 3;
  
    let systemEngineersUnit = manpowerState["systemEngineers"].unit;
    let systemEngineersCost = manpowerState["systemEngineers"].cost;
  
    let systemEngineersOneYearCost = systemEngineersUnit * systemEngineersCost;
    let systemEngineersTwoYearCost = systemEngineersOneYearCost * 2;
    let systemEngineersThreeYearCost = systemEngineersOneYearCost * 2;
  
    let totalManpowerUnit =
      architectsUnit + administratorsUnit + systemEngineersUnit;
    let totalManpowerCost =
      architectsCost + administratorsCost + systemEngineersCost;
    let totalManpowerOneYearCost =
      architectsOneYearCost +
      administratorsOneYearCost +
      systemEngineersOneYearCost;
    let totalManpowerTwoYearCost =
      architectsTwoYearCost +
      administratorsTwoYearCost +
      systemEngineersTwoYearCost;
    let totalManpowerThreeYearCost =
      architectsThreeYearCost +
      administratorsThreeYearCost +
      systemEngineersThreeYearCost;
  
    manpowerTable = {
      ["architects"]: {
        unit: architectsUnit,
        unitCost: architectsCost,
        oneYearCost: architectsOneYearCost.toFixed(2),
        twoYearCost: architectsTwoYearCost.toFixed(2),
        threeYearCost: architectsThreeYearCost.toFixed(2),
      },
      ["administrators"]: {
        unit: administratorsUnit,
        unitCost: administratorsCost,
        oneYearCost: administratorsOneYearCost.toFixed(2),
        twoYearCost: administratorsTwoYearCost.toFixed(2),
        threeYearCost: administratorsThreeYearCost.toFixed(2),
      },
      ["systemsEngineers"]: {
        unit: systemEngineersUnit,
        unitCost: systemEngineersCost,
        oneYearCost: systemEngineersOneYearCost.toFixed(2),
        twoYearCost: systemEngineersTwoYearCost.toFixed(2),
        threeYearCost: systemEngineersThreeYearCost.toFixed(2),
      },
      ["total"]: {
        oneYearCost: totalManpowerOneYearCost.toFixed(2),
        twoYearCost: totalManpowerTwoYearCost.toFixed(2),
        threeYearCost: totalManpowerThreeYearCost.toFixed(2),
      },
    };
    // total Cost Calculation
    let passiveComponentsOneYearCost = 0;
    let passiveComponentsTwoYearCost = 0;
    let passiveComponentsThreeYearCost = 0;
    // console.log("colocationStatus.value", colocationStatus.value);
    
    if (colocationStatus.value == 1) {
      passiveComponentsOneYearCost = cabinetOneYearCost;
      passiveComponentsTwoYearCost = cabinetTwoYearCost;
      passiveComponentsThreeYearCost = cabinetThreeYearCost;
    } else {
      passiveComponentsOneYearCost = totalInfrastructureOneYearCost;
      passiveComponentsTwoYearCost = totalInfrastructureTwoYearCost;
      passiveComponentsThreeYearCost = totalInfrastructureThreeYearCost;
    }
  
    let activeComponentsOneYearCost =
      totalComputeCostOneYearCost +
      totalStorageOneYearCost +
      totalNetworkOneYearCost +
      totalBackUpOneYearCost;
    let activeComponentsTwoYearCost =
      totalComputeCostTwoYearCost +
      totalStorageTwoYearCost +
      totalNetworkTwoYearCost +
      totalBackUpTwoYearCost;
    let activeComponentsThreeYearCost =
      totalComputeCostThreeYearCost +
      totalStorageThreeYearCost +
      totalNetworkThreeYearCost +
      totalBackUpThreeYearCost;
    totalCostTable = {
      ["passiveComponents"]: {
        oneYearCost: passiveComponentsOneYearCost.toFixed(2),
        twoYearCost: passiveComponentsTwoYearCost.toFixed(2),
        threeYearCost: passiveComponentsThreeYearCost.toFixed(2),
      },
      ["activeComponents"]: {
        oneYearCost: activeComponentsOneYearCost.toFixed(2),
        twoYearCost: activeComponentsTwoYearCost.toFixed(2),
        threeYearCost: activeComponentsThreeYearCost.toFixed(2),
      },
      ["manpower"]: {
        oneYearCost: totalManpowerOneYearCost.toFixed(2),
        twoYearCost: totalManpowerTwoYearCost.toFixed(2),
        threeYearCost: totalManpowerThreeYearCost.toFixed(2),
      },
    };
  
    // console.log(
    //   "AAAAAAAAAAAAAAAAAAAA",
    //   infrastructurePowerTable,
    //   infrastructureRackTable,
    //   colocationTable,
    //   computeCostTable,
    //   storageCostTable,
    //   networkCostTable,
    //   backupTable,
    //   manpowerTable,
    //   totalCostTable
    // );

    // console.log(
    //   "AAAAAAAAAAAAAAAAAAAA",
    //   infrastructurePowerTable,
      
    // );
  
    // console.log("computeCostTable", computeCostTable);
  
    let tableContainer = document.getElementById("on-premise-table");
    if(tableContainer == null){
      return;
    }
    let tableHtml = `<table class="responsive">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th colspan="2">Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Number of racks</td>
                  <td>${isNaN(infrastructureRackTable.numberOfRack.unit) || infrastructureRackTable.numberOfRack.unit == "NaN" ? 0 : infrastructureRackTable.numberOfRack.unit}</td>
                  <td colspan="2">$ ${
                    isNaN(
                      parseFloat(
                        infrastructureRackTable.numberOfRack.unitCost
                      )
                    )
                      ? 0
                      : parseFloat(
                          infrastructureRackTable.numberOfRack.unitCost
                        )
                  }</td>
                  <td>$ ${
                    isNaN(
                      parseFloat(
                        infrastructureRackTable.numberOfRack.oneYearCost
                      )
                    )
                      ? 0
                      : parseFloat(
                          infrastructureRackTable.numberOfRack.oneYearCost
                        )
                  }</td>
                  <td>$ ${
                    isNaN(
                      parseFloat(
                        infrastructureRackTable.numberOfRack.twoYearCost
                      )
                    )
                      ? 0
                      : parseFloat(
                          infrastructureRackTable.numberOfRack.twoYearCost
                        )
                  }</td>
                  <td>$ ${
                    isNaN(
                      parseFloat(
                        infrastructureRackTable.numberOfRack.threeYearCost
                      )
                    )
                      ? 0
                      : parseFloat(
                          infrastructureRackTable.numberOfRack.threeYearCost
                        )
                  }</td>
                </tr>
                <!-- Repeat for each entry in infrastructureRackTable -->
              </tbody>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Number of racks</th>
                  <th>Power of rack</th>
                  <th>Cost per KwH</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Total power</td>
                  <td>${isNaN(infrastructurePowerTable.totalPower.numberOfRack) || infrastructurePowerTable.totalPower.numberOfRack == "NaN" ? 0 : infrastructurePowerTable.totalPower.numberOfRack }</td>
                  <td>${infrastructurePowerTable.totalPower.powerPerRack} KW</td>
                  <td>$ ${
                    isNaN(infrastructurePowerTable.totalPower.letPerKwh)
                      ? 0
                      : infrastructurePowerTable.totalPower.letPerKwh
                  }</td>
                  <td>$ ${
                    isNaN(infrastructurePowerTable.totalPower.oneYearCost)
                      ? 0
                      : infrastructurePowerTable.totalPower.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(infrastructurePowerTable.totalPower.twoYearCost)
                      ? 0
                      : infrastructurePowerTable.totalPower.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(
                      infrastructurePowerTable.totalPower.threeYearCost
                    )
                      ? 0
                      : infrastructurePowerTable.totalPower.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total Cost of On-premise Infrastructure</td>
                  <td>${isNaN(infrastructurePowerTable.totalOwnInfraCost.unit) || infrastructurePowerTable.totalOwnInfraCost.unit == "NaN" ? 0 : infrastructurePowerTable.totalOwnInfraCost.unit}</td>
                  <td>${
                    isNaN(infrastructurePowerTable.totalOwnInfraCost.unitCost)
                      ? "-"
                      : infrastructurePowerTable.totalOwnInfraCost.unitCost
                  } KW</td>
                  <td>$ ${
                    isNaN(infrastructurePowerTable.totalOwnInfraCost.unitCost)
                      ? 0
                      : infrastructurePowerTable.totalOwnInfraCost.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(infrastructurePowerTable.totalOwnInfraCost.oneYearCost)
                      ? 0
                      : infrastructurePowerTable.totalOwnInfraCost.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(infrastructurePowerTable.totalOwnInfraCost.twoYearCost)
                      ? 0
                      : infrastructurePowerTable.totalOwnInfraCost.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(
                      infrastructurePowerTable.totalOwnInfraCost.threeYearCost
                    )
                      ? 0
                      : infrastructurePowerTable.totalOwnInfraCost.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in infrastructurePowerTable -->
              </tbody>
            </table>`;
  
    tableContainer.innerHTML = "";
    tableContainer.innerHTML = tableHtml;
  
    let tableContainer2 = document.getElementById("colocation-table");
    if(tableContainer2 == null){
      return;
    }
    let tableHtml2 = `
              <table class="responsive">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost per rack per year</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Number of cabinets</td>
                  <td>${
                    isNaN(colocationTable.numberOfCabinets.unit)
                      ? "NA"
                      : colocationTable.numberOfCabinets.unit
                  }</td>
                  <td>$ ${
                    isNaN(colocationTable.numberOfCabinets.unitCostPerRackPerYear)
                      ? "NA"
                      : colocationTable.numberOfCabinets.unitCostPerRackPerYear
                  }</td>
                  <td>$ ${
                    isNaN(colocationTable.numberOfCabinets.oneYearCost)
                      ? 0
                      : colocationTable.numberOfCabinets.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(colocationTable.numberOfCabinets.twoYearCost)
                      ? 0
                      : colocationTable.numberOfCabinets.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(colocationTable.numberOfCabinets.threeYearCost)
                      ? 0
                      : colocationTable.numberOfCabinets.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in colocationTable -->
              </tbody>
            </table>
    `;
  
    tableContainer2.innerHTML = "";
    tableContainer2.innerHTML = tableHtml2;
  
    let tableContainer3 = document.getElementById("compute-cost-table");
    if(tableContainer3 == null){
      return;
    }
    let tableHtml3 = `
              <table class="responsive" id="compute-cost-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Memory from all applications in GB</td>
                  <td>${
                    isNaN(computeCostTable.memory.unit)
                      ? "NA"
                      : computeCostTable.memory.unit
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.memory.unitCost)
                      ? "NA"
                      : computeCostTable.memory.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.memory.oneYearCost)
                      ? 0
                      : computeCostTable.memory.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.memory.twoYearCost)
                      ? 0
                      : computeCostTable.memory.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.memory.threeYearCost)
                      ? 0
                      : computeCostTable.memory.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Physical CPUs</td>
                  <td>${
                    isNaN(computeCostTable.physical.unit)
                      ? "NA"
                      : computeCostTable.physical.unit
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.physical.unitCost)
                      ? "NA"
                      : computeCostTable.physical.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.physical.oneYearCost)
                      ? 0
                      : computeCostTable.physical.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.physical.twoYearCost)
                      ? 0
                      : computeCostTable.physical.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.physical.threeYearCost)
                      ? 0
                      : computeCostTable.physical.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Hypervisor licenses in sockets</td>
                  <td>${
                    isNaN(computeCostTable.hypervisor.unit)
                      ? "NA"
                      : computeCostTable.hypervisor.unit
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.hypervisor.unitCost)
                      ? "NA"
                      : computeCostTable.hypervisor.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.hypervisor.oneYearCost)
                      ? 0
                      : computeCostTable.hypervisor.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.hypervisor.twoYearCost)
                      ? 0
                      : computeCostTable.hypervisor.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.hypervisor.threeYearCost)
                      ? 0
                      : computeCostTable.hypervisor.threeYearCost
                  }</td>
                </tr>
  
  
                <tr>
                  <td>Cost of DR infrastructure</td>
                  <td>${
                    isNaN(computeCostTable.letOfDR.unit)
                      ? "NA"
                      : computeCostTable.letOfDR.unit
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.letOfDR.unitCost)
                      ? "NA"
                      : computeCostTable.letOfDR.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.letOfDR.oneYearCost)
                      ? 0
                      : computeCostTable.letOfDR.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.letOfDR.twoYearCost)
                      ? 0
                      : computeCostTable.letOfDR.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.letOfDR.threeYearCost)
                      ? 0
                      : computeCostTable.letOfDR.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total Compute Costs</td>
                  <td>${
                    isNaN(computeCostTable.total.unit)
                      ? "NA"
                      : computeCostTable.total.unit
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.total.unitCost)
                      ? "NA"
                      : computeCostTable.total.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.total.oneYearCost)
                      ? 0
                      : computeCostTable.total.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.total.twoYearCost)
                      ? 0
                      : computeCostTable.total.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(computeCostTable.total.threeYearCost)
                      ? 0
                      : computeCostTable.total.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in computeCostTable -->
              </tbody>
            </table>
    `;
  
    tableContainer3.innerHTML = "";
    tableContainer3.innerHTML = tableHtml3;
  
    let tableContainer4 = document.getElementById("storage-cost-table");
    if(tableContainer4 == null){
      return;
    }
    let tableHtml4 = `
              <table class="responsive" id="storage-cost-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Flash storage in TB</td>
                  <td>${
                    isNaN(storageCostTable.flashStorage.unit)
                      ? "NA"
                      : storageCostTable.flashStorage.unit
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.flashStorage.unitCost)
                      ? "NA"
                      : storageCostTable.flashStorage.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.flashStorage.oneYearCost)
                      ? 0
                      : storageCostTable.flashStorage.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.flashStorage.twoYearCost)
                      ? 0
                      : storageCostTable.flashStorage.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.flashStorage.threeYearCost)
                      ? 0
                      : storageCostTable.flashStorage.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>HDD storage in TB</td>
                  <td>${
                    isNaN(storageCostTable.HDDStorage.unit)
                      ? "NA"
                      : storageCostTable.HDDStorage.unit
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.HDDStorage.unitCost)
                      ? "NA"
                      : storageCostTable.HDDStorage.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.HDDStorage.oneYearCost)
                      ? 0
                      : storageCostTable.HDDStorage.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.HDDStorage.twoYearCost)
                      ? 0
                      : storageCostTable.HDDStorage.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.HDDStorage.threeYearCost)
                      ? 0
                      : storageCostTable.HDDStorage.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total data replicated in TB</td>
                  <td>${
                    isNaN(storageCostTable.replicatedData.unit)
                      ? "NA"
                      : storageCostTable.replicatedData.unit
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.replicatedData.unitCost)
                      ? "NA"
                      : storageCostTable.replicatedData.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.replicatedData.oneYearCost)
                      ? 0
                      : storageCostTable.replicatedData.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.replicatedData.twoYearCost)
                      ? 0
                      : storageCostTable.replicatedData.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.replicatedData.threeYearCost)
                      ? 0
                      : storageCostTable.replicatedData.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total Storage costs</td>
                  <td>${
                    isNaN(storageCostTable.storageCost.unit)
                      ? "NA"
                      : storageCostTable.storageCost.unit
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.storageCost.unitCost)
                      ? "NA"
                      : storageCostTable.storageCost.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.storageCost.oneYearCost)
                      ? 0
                      : storageCostTable.storageCost.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.storageCost.twoYearCost)
                      ? 0
                      : storageCostTable.storageCost.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(storageCostTable.storageCost.threeYearCost)
                      ? 0
                      : storageCostTable.storageCost.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in storageCostTable -->
              </tbody>
            </table>
    `;
  
    tableContainer4.innerHTML = "";
    tableContainer4.innerHTML = tableHtml4;
  
    let tableContainer5 = document.getElementById("network-cost-table");
    if(tableContainer5 == null){
      return;
    }
    let tableHtml5 = `
              <table class="responsive" id="network-cost-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>IP switches (16 ports)</td>
                  <td>${
                    isNaN(networkCostTable.IPSwitches16.unit)
                      ? "NA"
                      : networkCostTable.IPSwitches16.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches16.unitCost)
                      ? "NA"
                      : networkCostTable.IPSwitches16.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches16.oneYearCost)
                      ? 0
                      : networkCostTable.IPSwitches16.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches16.twoYearCost)
                      ? 0
                      : networkCostTable.IPSwitches16.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches16.threeYearCost)
                      ? 0
                      : networkCostTable.IPSwitches16.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>IP switches (32 ports)</td>
                  <td>${
                    isNaN(networkCostTable.IPSwitches32.unit)
                      ? "NA"
                      : networkCostTable.IPSwitches32.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches32.unitCost)
                      ? "NA"
                      : networkCostTable.IPSwitches32.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches32.oneYearCost)
                      ? 0
                      : networkCostTable.IPSwitches32.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches32.twoYearCost)
                      ? 0
                      : networkCostTable.IPSwitches32.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches32.threeYearCost)
                      ? 0
                      : networkCostTable.IPSwitches32.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>IP switches (48 ports)</td>
                  <td>${
                    isNaN(networkCostTable.IPSwitches48.unit)
                      ? "NA"
                      : networkCostTable.IPSwitches48.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches48.unitCost)
                      ? "NA"
                      : networkCostTable.IPSwitches48.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches48.oneYearCost)
                      ? 0
                      : networkCostTable.IPSwitches48.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches48.twoYearCost)
                      ? 0
                      : networkCostTable.IPSwitches48.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches48.threeYearCost)
                      ? 0
                      : networkCostTable.IPSwitches48.threeYearCost
                  }</td>
                </tr>
  
  
                <tr>
                  <td>IP switches (64 ports)</td>
                  <td>${
                    isNaN(networkCostTable.IPSwitches64.unit)
                      ? "NA"
                      : networkCostTable.IPSwitches64.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches64.unitCost)
                      ? "NA"
                      : networkCostTable.IPSwitches64.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches64.oneYearCost)
                      ? 0
                      : networkCostTable.IPSwitches64.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches64.twoYearCost)
                      ? 0
                      : networkCostTable.IPSwitches64.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches64.threeYearCost)
                      ? 0
                      : networkCostTable.IPSwitches64.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>IP switches (96 ports)</td>
                  <td>${
                    isNaN(networkCostTable.IPSwitches96.unit)
                      ? "NA"
                      : networkCostTable.IPSwitches96.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches96.unitCost)
                      ? "NA"
                      : networkCostTable.IPSwitches96.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches96.oneYearCost)
                      ? 0
                      : networkCostTable.IPSwitches96.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches96.twoYearCost)
                      ? 0
                      : networkCostTable.IPSwitches96.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.IPSwitches96.threeYearCost)
                      ? 0
                      : networkCostTable.IPSwitches96.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>FC switches (16 ports)</td>
                  <td>${
                    isNaN(networkCostTable.FCSwitches16.unit)
                      ? "NA"
                      : networkCostTable.FCSwitches16.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches16.unitCost)
                      ? "NA"
                      : networkCostTable.FCSwitches16.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches16.oneYearCost)
                      ? 0
                      : networkCostTable.FCSwitches16.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches16.twoYearCost)
                      ? 0
                      : networkCostTable.FCSwitches16.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches16.threeYearCost)
                      ? 0
                      : networkCostTable.FCSwitches16.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>FC switches (32 ports)</td>
                  <td>${
                    isNaN(networkCostTable.FCSwitches32.unit)
                      ? "NA"
                      : networkCostTable.FCSwitches32.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches32.unitCost)
                      ? "NA"
                      : networkCostTable.FCSwitches32.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches32.oneYearCost)
                      ? 0
                      : networkCostTable.FCSwitches32.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches32.twoYearCost)
                      ? 0
                      : networkCostTable.FCSwitches32.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.FCSwitches32.threeYearCost)
                      ? 0
                      : networkCostTable.FCSwitches32.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total Network Costs</td>
                  <td>${
                    isNaN(networkCostTable.total.unit)
                      ? "NA"
                      : networkCostTable.total.unit
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.total.unitCost)
                      ? "NA"
                      : networkCostTable.total.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.total.oneYearCost)
                      ? 0
                      : networkCostTable.total.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.total.twoYearCost)
                      ? 0
                      : networkCostTable.total.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(networkCostTable.total.threeYearCost)
                      ? 0
                      : networkCostTable.total.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in networkCostTable -->
              </tbody>
            </table>
    `;
  
    tableContainer5.innerHTML = "";
    tableContainer5.innerHTML = tableHtml5;
  
    let tableContainer6 = document.getElementById("backup-table");
    if(tableContainer6 == null){
      return;
    }
    let tableHtml6 = `
              <table class="responsive" id="backup-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units in TB</th>
                  <th>Unit Cost in TB per month</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Backup data stored in cloud</td>
                  <td>${
                    isNaN(backupTable.storedInCloud.unit)
                      ? "NA"
                      : backupTable.storedInCloud.unit
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInCloud.unitCost)
                      ? "NA"
                      : backupTable.storedInCloud.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInCloud.oneYearCost)
                      ? 0
                      : backupTable.storedInCloud.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInCloud.twoYearCost)
                      ? 0
                      : backupTable.storedInCloud.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInCloud.threeYearCost)
                      ? 0
                      : backupTable.storedInCloud.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in backupTable -->
              </tbody>
  
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units in TB</th>
                  <th>Unit Cost per TB per</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Backup data stored in HDD media in TB</td>
                  <td>${
                    isNaN(backupTable.storedInHDD.unit)
                      ? "NA"
                      : backupTable.storedInHDD.unit
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInHDD.unitCost)
                      ? "NA"
                      : backupTable.storedInHDD.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInHDD.oneYearCost)
                      ? 0
                      : backupTable.storedInHDD.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInHDD.twoYearCost)
                      ? 0
                      : backupTable.storedInHDD.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInHDD.threeYearCost)
                      ? 0
                      : backupTable.storedInHDD.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Backup data stored in tape</td>
                  <td>${
                    isNaN(backupTable.storedInTape.unit)
                      ? "NA"
                      : backupTable.storedInTape.unit
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInTape.unitCost)
                      ? "NA"
                      : backupTable.storedInTape.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInTape.oneYearCost)
                      ? 0
                      : backupTable.storedInTape.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInTape.twoYearCost)
                      ? 0
                      : backupTable.storedInTape.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.storedInTape.threeYearCost)
                      ? 0
                      : backupTable.storedInTape.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total Back Up Costs</td>
                  <td>${
                    isNaN(backupTable.total.unit) ? "NA" : backupTable.total.unit
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.total.unitCost)
                      ? "NA"
                      : backupTable.total.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.total.oneYearCost)
                      ? 0
                      : backupTable.total.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.total.twoYearCost)
                      ? 0
                      : backupTable.total.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(backupTable.total.threeYearCost)
                      ? 0
                      : backupTable.total.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in backupTable -->
              </tbody>
            </table>
    `;
  
    tableContainer6.innerHTML = "";
    tableContainer6.innerHTML = tableHtml6;
  
    let tableContainer7 = document.getElementById("manpower-table");
    if(tableContainer7 == null){
      return;
    }
    let tableHtml7 = `
              <table class="responsive" id="manpower-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units (number of employees)</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Architects</td>
                  <td>${
                    isNaN(manpowerTable.architects.unit)
                      ? "NA"
                      : manpowerTable.architects.unit
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.architects.unitCost)
                      ? "NA"
                      : manpowerTable.architects.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.architects.oneYearCost)
                      ? 0
                      : manpowerTable.architects.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.architects.twoYearCost)
                      ? 0
                      : manpowerTable.architects.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.architects.threeYearCost)
                      ? 0
                      : manpowerTable.architects.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Systems Engineers</td>
                  <td>${
                    isNaN(manpowerTable.systemsEngineers.unit)
                      ? "NA"
                      : manpowerTable.systemsEngineers.unit
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.systemsEngineers.unitCost)
                      ? "NA"
                      : manpowerTable.systemsEngineers.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.systemsEngineers.oneYearCost)
                      ? 0
                      : manpowerTable.systemsEngineers.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.systemsEngineers.twoYearCost)
                      ? 0
                      : manpowerTable.systemsEngineers.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.systemsEngineers.threeYearCost)
                      ? 0
                      : manpowerTable.systemsEngineers.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Administrators</td>
                  <td>${
                    isNaN(manpowerTable.administrators.unit)
                      ? "NA"
                      : manpowerTable.administrators.unit
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.administrators.unitCost)
                      ? "NA"
                      : manpowerTable.administrators.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.administrators.oneYearCost)
                      ? 0
                      : manpowerTable.administrators.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.administrators.twoYearCost)
                      ? 0
                      : manpowerTable.administrators.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.administrators.threeYearCost)
                      ? 0
                      : manpowerTable.administrators.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Total cost of manpower</td>
                  <td>${
                    isNaN(manpowerTable.total.unit)
                      ? "NA"
                      : manpowerTable.total.unit
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.total.unitCost)
                      ? "NA"
                      : manpowerTable.total.unitCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.total.oneYearCost)
                      ? 0
                      : manpowerTable.total.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.total.twoYearCost)
                      ? 0
                      : manpowerTable.total.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(manpowerTable.total.threeYearCost)
                      ? 0
                      : manpowerTable.total.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in manpowerTable -->
              </tbody>
            </table>
    `;
  
    tableContainer7.innerHTML = "";
    tableContainer7.innerHTML = tableHtml7;
  
    let tableContainer8 = document.getElementById("total-cost-table");
    if(tableContainer8 == null){
      return;
    }
    let tableHtml8 = `
              <table class="responsive" id="total-cost-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td>Passive Components</td>
                  <td>$ ${
                    isNaN(totalCostTable.passiveComponents.oneYearCost)
                      ? 0
                      : totalCostTable.passiveComponents.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(totalCostTable.passiveComponents.twoYearCost)
                      ? 0
                      : totalCostTable.passiveComponents.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(totalCostTable.passiveComponents.threeYearCost)
                      ? 0
                      : totalCostTable.passiveComponents.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Active components</td>
                  <td>$ ${
                    isNaN(totalCostTable.activeComponents.oneYearCost)
                      ? 0
                      : totalCostTable.activeComponents.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(totalCostTable.activeComponents.twoYearCost)
                      ? 0
                      : totalCostTable.activeComponents.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(totalCostTable.activeComponents.threeYearCost)
                      ? 0
                      : totalCostTable.activeComponents.threeYearCost
                  }</td>
                </tr>
  
                <tr>
                  <td>Manpower</td>
                  <td>$ ${
                    isNaN(totalCostTable.manpower.oneYearCost)
                      ? 0
                      : totalCostTable.manpower.oneYearCost
                  }</td>
                  <td>$ ${
                    isNaN(totalCostTable.manpower.twoYearCost)
                      ? 0
                      : totalCostTable.manpower.twoYearCost
                  }</td>
                  <td>$ ${
                    isNaN(totalCostTable.manpower.threeYearCost)
                      ? 0
                      : totalCostTable.manpower.threeYearCost
                  }</td>
                </tr>
                <!-- Repeat for each entry in totalCostTable -->
              </tbody>
            </table>
    `;
  
    tableContainer8.innerHTML = "";
    tableContainer8.innerHTML = tableHtml8;
  };
  
  const screens = document.querySelectorAll(".screen");
  const inputValues = {};
  
  // Function to switch screens
  function switchScreen(current, target) {
    current.classList.remove("active");
    target.classList.add("active");
  }
  
  // Function to handle navigation
  function handleNavigation(event) {
    
    const currentScreen = event.target.closest(".screen");
    const screenNumber = parseInt(currentScreen.dataset.screen);
  
    // Find the input or select element within the current screen
    const formControl = currentScreen.querySelector("input, select, textarea");
  
    // Check if the form control exists
    if (formControl) {
      inputValues[`input${screenNumber}`] = formControl.value;
    }
  
    // Handle "Next" button click
    if (event.target.classList.contains("next")) {
      if(event.pointerType == ""){
        return;
      }
      if (
        screenNumber == 1 &&
        document.getElementById("selectYourCountry").value === ""
      ) {
        alert("Please choose country!");
        return;
      }
      if (
        screenNumber == 2 &&
        document.getElementById("colocationFacility").value === ""
      ) {
        alert("Please select colocation facility!");
        return;
      }
  
      if (
        screenNumber == 2 &&
        document.getElementById("colocationFacility").value == 1
      ) {
        let allRackDivs = document.getElementsByClassName("rack-div");
        Array.from(allRackDivs).forEach((input) => {
          input.disabled = true;
        });
  
        let allCabinetDivs = document.getElementsByClassName("cabinet-div");
        Array.from(allCabinetDivs).forEach((input) => {
          input.disabled = false;
        });
        if (document.getElementById("useRegionalBenchmarks").checked) {
          let inputDiv = document.getElementById("unitCostOfEachCabinet");
          if(inputDiv == null){
            return;
          }
          let inputDiv2 = document.getElementById("numberOfCabinets");
          if(inputDiv2 == null){
            return;
          }
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "cabinets",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "cabinets",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostOfEachCabinet");
          if(inputDiv == null){
            return;
          }
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      }
  
      if (
        screenNumber == 2 &&
        document.getElementById("colocationFacility").value == 0
      ) {
        let allRackDivs = document.getElementsByClassName("rack-div");
        Array.from(allRackDivs).forEach((input) => {
          input.disabled = false;
        });
  
        let allCabinetDivs = document.getElementsByClassName("cabinet-div");
        Array.from(allCabinetDivs).forEach((input) => {
          input.disabled = true;
        });
        if (
          document.getElementById("useRegionalBenchmarksSelectNumberOf").checked
        ) {
          let inputDiv = document.getElementById("unitCostOfEachRack");
          if(inputDiv == null){
            return;
          }
          let inputDiv2 = document.getElementById("numberOfRacks");
          if(inputDiv2 == null){
            return;
          }
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "racks",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "racks",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostOfEachRack");
          if(inputDiv == null){
            return;
          }
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      }
  
      const nextScreen = screens[screenNumber]; // Next screen index
      if (nextScreen) {
        const nextFormControl = nextScreen.querySelector(
          "input, select, textarea"
        );
        if (nextFormControl) {
          nextFormControl.value = inputValues[`input${screenNumber + 1}`] || ""; // Populate next input/select/textarea
        }
        switchScreen(currentScreen, nextScreen);
      }
    }
  
    // Handle "Back" button click
    else if (event.target.classList.contains("back")) {
      if(event.pointerType == ""){
        return;
      }
      const previousScreen = screens[screenNumber - 2]; // Previous screen index
      if (previousScreen) {
        const previousFormControl = previousScreen.querySelector(
          "input, select, textarea"
        );
        if (previousFormControl) {
          previousFormControl.value =
            inputValues[`input${screenNumber - 1}`] || ""; // Populate previous input/select/textarea
        }
        switchScreen(currentScreen, previousScreen);
      }
    }
  }
  
  // Add event listeners to buttons
  screens.forEach((screen) => {
    screen.addEventListener("click", handleNavigation);
  });
  
  // // Submit functionality
  // document.getElementById("submit").addEventListener("click", () => {
  // //   const lastInput = screens[2].querySelector("input");
  // //   inputValues.input3 = lastInput.value;
  // //   console.log(inputValues);
  // //   alert("Form submitted! Check the console for input values.");
  // //   // Here you can handle form submission (e.g., send data to the server)
  // handleDataCenterCalculatorForm();
  // });
  
  function updateRangeLabel(value) {
    if(document.getElementById("rangeValue") == null){
      return;
    }
    
    document.getElementById("rangeValue").innerText = value;
  }
  
  const handleDataCenterCalculatorForm = (e) => {
    e.preventDefault();
    
  
    let form = document.getElementById("data-center-calculator-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    formDataJSON["useRegionalBenchmarks"] = document.getElementById(
      "useRegionalBenchmarks"
    ).checked;
    formDataJSON["useRegionalBenchmarksSelectNumberOf"] = document.getElementById(
      "useRegionalBenchmarksSelectNumberOf"
    ).checked;
    formDataJSON["selectTotalMemoryFromRegionalBenchmarks"] =
      document.getElementById("selectTotalMemoryFromRegionalBenchmarks").checked;
    formDataJSON["physicalCPURegionalBenchmarks"] = document.getElementById(
      "physicalCPURegionalBenchmarks"
    ).checked;
    formDataJSON["selectTotalTBOfRegionalBenchmarks"] = document.getElementById(
      "selectTotalTBOfRegionalBenchmarks"
    ).checked;
    formDataJSON["selectTotalNumberIPregionalBenchmarks"] =
      document.getElementById("selectTotalNumberIPregionalBenchmarks").checked;
    formDataJSON["selectTotalNumberSANRegionalBenchmarks"] =
      document.getElementById("selectTotalNumberSANRegionalBenchmarks").checked;
    formDataJSON["selectNumberOfHypervisorRegionalBenchmarks"] =
      document.getElementById(
        "selectNumberOfHypervisorRegionalBenchmarks"
      ).checked;
    formDataJSON["terabytesOfBackupStorageRegionalBenchmarks"] =
      document.getElementById(
        "terabytesOfBackupStorageRegionalBenchmarks"
      ).checked;
  
    formDataJSON["unitCostOfEachCabinet"] = document.getElementById(
      "unitCostOfEachCabinet"
    ).value;
    formDataJSON["unitCostOfEachRack"] =
      document.getElementById("unitCostOfEachRack").value;
    formDataJSON["unitCostPerGBIn"] =
      document.getElementById("unitCostPerGBIn").value;
    formDataJSON["unitCostPerCPUsIn"] =
      document.getElementById("unitCostPerCPUsIn").value;
    formDataJSON["unitCostPerTBOfFlashStorage"] = document.getElementById(
      "unitCostPerTBOfFlashStorage"
    ).value;
    formDataJSON["unitCostPerTBOfHDDStorage"] = document.getElementById(
      "unitCostPerTBOfHDDStorage"
    ).value;
    formDataJSON["unitCostPerSwitchIn"] = document.getElementById(
      "unitCostPerSwitchIn"
    ).value;
    formDataJSON["unitCostPerSwitchIn2"] = document.getElementById(
      "unitCostPerSwitchIn2"
    ).value;
    formDataJSON["unitCostPerSwitchIn3"] = document.getElementById(
      "unitCostPerSwitchIn3"
    ).value;
    formDataJSON["unitCostPerSwitchIn4"] = document.getElementById(
      "unitCostPerSwitchIn4"
    ).value;
    formDataJSON["unitCostPerSwitchIn5"] = document.getElementById(
      "unitCostPerSwitchIn5"
    ).value;
    formDataJSON["unitCostPerSwitchIn6"] = document.getElementById(
      "unitCostPerSwitchIn6"
    ).value;
    formDataJSON["unitCostPerSwitchIn7"] = document.getElementById(
      "unitCostPerSwitchIn7"
    ).value;
    formDataJSON["unitCostPerSocketLicenseIn"] = document.getElementById(
      "unitCostPerSocketLicenseIn"
    ).value;
    formDataJSON["unitCostPerTBIn"] =
      document.getElementById("unitCostPerTBIn").value;
    formDataJSON["unitCostPerTBIn2"] =
      document.getElementById("unitCostPerTBIn2").value;
    formDataJSON["unitCostPerTBIn3"] =
      document.getElementById("unitCostPerTBIn3").value;
  
    // console.log("34436363", formDataJSON);
    dataCenterCalculator(formDataJSON);
  };
  
  let benchmarks = {
    racks: {
      emergingAsia: [280, 250, 200],
      matureAsia: [280, 250, 200],
      emergingEurope: [800, 700, 600],
      matureEurope: [800, 700, 600],
      northAmerica: [800, 700, 600],
      latinAmerica: [280, 250, 200],
      china: [280, 250, 200],
      middleEastAndAfrica: [400, 350, 300],
    },
    cabinets: {
      emergingAsia: [15000, 13000, 12000],
      matureAsia: [15000, 13000, 12000],
      emergingEurope: [15000, 13000, 12000],
      matureEurope: [15000, 13000, 10000],
      northAmerica: [15000, 13000, 10000],
      latinAmerica: [15000, 13000, 12000],
      china: [12000, 11000, 10000],
      middleEastAndAfrica: [20000, 15000, 12000],
    },
    power: {
      emergingAsia: [0.15, 0.15, 0.13], //per Kwh
      matureAsia: [0.23, 0.21, 0.2],
      emergingEurope: [0.08, 0.08, 0.08],
      matureEurope: [0.18, 0.17, 0.17],
      northAmerica: [0.139, 0.137, 0.135],
      latinAmerica: [0.15, 0.15, 0.13],
      china: [0.094, 0.093, 0.092],
      middleEastAndAfrica: [0.07, 0.07, 0.06],
    },
    memory: {
      emergingAsia: [30, 28, 25], //per GB
      matureAsia: [28, 15, 20],
      emergingEurope: [30, 28, 25],
      matureEurope: [28, 25, 20],
      northAmerica: [28, 25, 20],
      latinAmerica: [30, 28, 25],
      china: [28, 25, 20],
      middleEastAndAfrica: [30, 28, 25],
    },
    cpu: {
      emergingAsia: [2600, 2400, 2300],
      matureAsia: [2500, 2400, 2200],
      emergingEurope: [2400, 2300, 2200],
      matureEurope: [2500, 2400, 2200],
      northAmerica: [2500, 2400, 2200],
      latinAmerica: [2800, 2700, 2200],
      china: [1800, 1600, 1500],
      middleEastAndAfrica: [2800, 2500, 2200],
    },
    hypervisor: {
      emergingAsia: [600, 2200, 2000],
      matureAsia: [600, 2200, 2000],
      emergingEurope: [600, 2200, 2000],
      matureEurope: [600, 2200, 2000],
      northAmerica: [600, 2200, 2000],
      latinAmerica: [600, 2200, 2000],
      china: [600, 2200, 2000],
      middleEastAndAfrica: [600, 2200, 2000],
    },
    flashStorage: {
      emergingAsia: [2200, 2000, 700],
      matureAsia: [1800, 1500, 600],
      emergingEurope: [2200, 2000, 700],
      matureEurope: [1800, 1500, 600],
      northAmerica: [1800, 1500, 600],
      latinAmerica: [2200, 2000, 700],
      china: [2200, 2000, 700],
      middleEastAndAfrica: [2200, 2000, 700],
    },
    HDDStorage: {
      emergingAsia: [600, 400, 250],
      matureAsia: [500, 400, 250],
      emergingEurope: [500, 400, 250],
      matureEurope: [500, 400, 250],
      northAmerica: [500, 400, 250],
      latinAmerica: [500, 400, 250],
      china: [500, 400, 250],
      middleEastAndAfrica: [600, 400, 250],
    },
    IPSwitches16: {
      emergingAsia: [350, 300, 250],
      matureAsia: [350, 300, 250],
      emergingEurope: [350, 300, 250],
      matureEurope: [350, 300, 250],
      northAmerica: [350, 300, 250],
      latinAmerica: [350, 300, 250],
      china: [350, 300, 250],
      middleEastAndAfrica: [350, 300, 250],
    },
    IPSwitches32: {
      emergingAsia: [18000, 16000, 15000],
      matureAsia: [18000, 16000, 15000],
      emergingEurope: [18000, 16000, 15000],
      matureEurope: [18000, 16000, 15000],
      northAmerica: [18000, 16000, 15000],
      latinAmerica: [18000, 16000, 15000],
      china: [18000, 16000, 15000],
      middleEastAndAfrica: [18000, 16000, 15000],
    },
    IPSwitches48: {
      emergingAsia: [18000, 16000, 15000],
      matureAsia: [18000, 16000, 15000],
      emergingEurope: [18000, 16000, 15000],
      matureEurope: [18000, 16000, 15000],
      northAmerica: [18000, 16000, 15000],
      latinAmerica: [18000, 16000, 15000],
      china: [18000, 16000, 15000],
      middleEastAndAfrica: [18000, 16000, 15000],
    },
    IPSwitches64: {
      emergingAsia: [20000, 17000, 15000],
      matureAsia: [20000, 17000, 15000],
      emergingEurope: [20000, 17000, 15000],
      matureEurope: [20000, 17000, 15000],
      northAmerica: [20000, 17000, 15000],
      latinAmerica: [20000, 17000, 15000],
      china: [20000, 17000, 15000],
      middleEastAndAfrica: [20000, 17000, 15000],
    },
    IPSwitches96: {
      emergingAsia: [30000, 25000, 20000],
      matureAsia: [30000, 25000, 20000],
      emergingEurope: [30000, 25000, 20000],
      matureEurope: [30000, 25000, 20000],
      northAmerica: [30000, 25000, 20000],
      latinAmerica: [30000, 25000, 20000],
      china: [30000, 25000, 20000],
      middleEastAndAfrica: [30000, 25000, 20000],
    },
    FCSwitches16: {
      emergingAsia: [13000, 13000, 13000],
      matureAsia: [13000, 13000, 13000],
      emergingEurope: [13000, 13000, 13000],
      matureEurope: [13000, 13000, 13000],
      northAmerica: [13000, 13000, 13000],
      latinAmerica: [13000, 13000, 13000],
      china: [13000, 13000, 13000],
      middleEastAndAfrica: [13000, 13000, 13000],
    },
    FCSwitches32: {
      emergingAsia: [20000, 20000, 20000],
      matureAsia: [20000, 20000, 20000],
      emergingEurope: [20000, 20000, 20000],
      matureEurope: [20000, 20000, 20000],
      northAmerica: [20000, 20000, 20000],
      latinAmerica: [20000, 20000, 20000],
      china: [20000, 20000, 20000],
      middleEastAndAfrica: [20000, 20000, 20000],
    },
    storedInHDD: {
      emergingAsia: [600, 400, 250],
      matureAsia: [500, 400, 250],
      emergingEurope: [500, 400, 250],
      matureEurope: [500, 400, 250],
      northAmerica: [500, 400, 250],
      latinAmerica: [500, 400, 250],
      china: [500, 400, 250],
      middleEastAndAfrica: [600, 400, 250],
    },
    storedInCloud: {
      emergingAsia: [23, 23, 23],
      matureAsia: [23, 23, 23],
      emergingEurope: [23, 23, 23],
      matureEurope: [23, 23, 23],
      northAmerica: [23, 23, 23],
      latinAmerica: [23, 23, 23],
      china: [23, 23, 23],
      middleEastAndAfrica: [23, 23, 23],
    },
    storedInTape: {
      emergingAsia: [15, 12, 10],
      matureAsia: [15, 12, 10],
      emergingEurope: [15, 12, 10],
      matureEurope: [15, 12, 10],
      northAmerica: [15, 12, 10],
      latinAmerica: [15, 12, 10],
      china: [15, 12, 10],
      middleEastAndAfrica: [15, 12, 10],
    },
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    if(document
      .getElementById("useRegionalBenchmarks") == null){
        return
      }
    document
      .getElementById("useRegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostOfEachCabinet");
          let inputDiv2 = document.getElementById("numberOfCabinets");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "cabinets",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "cabinets",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostOfEachCabinet");
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      });
  
    document
      .getElementById("useRegionalBenchmarksSelectNumberOf")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostOfEachRack");
          let inputDiv2 = document.getElementById("numberOfRacks");
  
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "racks",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "racks",
              [10, 25, 25]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostOfEachRack");
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      });
  
    document
      .getElementById("selectTotalMemoryFromRegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerGBIn");
          let inputDiv2 = document.getElementById("totalMemoryInGB");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "memory",
              [3000, 10000, 10000]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "memory",
              [3000, 10000, 10000]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerGBIn");
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      });
  
    document
      .getElementById("physicalCPURegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerCPUsIn");
          let inputDiv2 = document.getElementById("numberOfCPU");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "cpu",
              [20, 50, 50]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "cpu",
              [20, 50, 50]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerCPUsIn");
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      });
  
    document
      .getElementById("selectTotalTBOfRegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerTBOfFlashStorage");
          let inputDiv2 = document.getElementById("flashStorageInTB");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "flashStorage",
              [100, 250, 250]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "flashStorage",
              [100, 250, 250]
            );
            inputDiv.disabled = true;
          }
  
          let inputDiv3 = document.getElementById("unitCostPerTBOfHDDStorage");
          let inputDiv4 = document.getElementById("hddStorageInTB");
          if (inputDiv4.value == "") {
            inputDiv3.value = getBenchmarkValue(
              0,
              "northAmerica",
              "HDDStorage",
              [100, 250, 250]
            );
            inputDiv3.disabled = true;
          } else {
            inputDiv3.value = getBenchmarkValue(
              parseFloat(inputDiv4.value),
              "northAmerica",
              "HDDStorage",
              [100, 250, 250]
            );
            inputDiv3.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerTBOfFlashStorage");
          inputDiv.value = 0;
          inputDiv.disabled = false;
  
          let inputDiv2 = document.getElementById("unitCostPerTBOfHDDStorage");
          inputDiv2.value = 0;
          inputDiv2.disabled = false;
        }
      });
  
    document
      .getElementById("selectTotalNumberIPregionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerSwitchIn");
          let inputDiv1 = document.getElementById("numberOfIPSwitches16Ports");
          if (inputDiv1.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "IPSwitches16",
              [3, 6, 6]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv1.value),
              "northAmerica",
              "IPSwitches16",
              [3, 6, 6]
            );
            inputDiv.disabled = true;
          }
  
          let inputDiv3 = document.getElementById("unitCostPerSwitchIn2");
          let inputDiv4 = document.getElementById("numberOfIPSwitches32Ports");
          if (inputDiv4.value == "") {
            inputDiv3.value = getBenchmarkValue(
              0,
              "northAmerica",
              "IPSwitches32",
              [3, 6, 6]
            );
            inputDiv3.disabled = true;
          } else {
            inputDiv3.value = getBenchmarkValue(
              parseFloat(inputDiv4.value),
              "northAmerica",
              "IPSwitches32",
              [3, 6, 6]
            );
            inputDiv3.disabled = true;
          }
  
          let inputDiv5 = document.getElementById("unitCostPerSwitchIn3");
          let inputDiv6 = document.getElementById("numberOfIPSwitches48Ports");
          if (inputDiv6.value == "") {
            inputDiv5.value = getBenchmarkValue(
              0,
              "northAmerica",
              "IPSwitches48",
              [3, 6, 6]
            );
            inputDiv5.disabled = true;
          } else {
            inputDiv5.value = getBenchmarkValue(
              parseFloat(inputDiv6.value),
              "northAmerica",
              "IPSwitches48",
              [3, 6, 6]
            );
            inputDiv5.disabled = true;
          }
  
          let inputDiv7 = document.getElementById("unitCostPerSwitchIn4");
          let inputDiv8 = document.getElementById("numberOfIPSwitches64Ports");
          if (inputDiv8.value == "") {
            inputDiv7.value = getBenchmarkValue(
              0,
              "northAmerica",
              "IPSwitches64",
              [3, 6, 6]
            );
            inputDiv7.disabled = true;
          } else {
            inputDiv7.value = getBenchmarkValue(
              parseFloat(inputDiv8.value),
              "northAmerica",
              "IPSwitches64",
              [3, 6, 6]
            );
            inputDiv7.disabled = true;
          }
  
          let inputDiv9 = document.getElementById("unitCostPerSwitchIn5");
          let inputDiv10 = document.getElementById("numberOfIPSwitches96Ports");
          if (inputDiv10.value == "") {
            inputDiv9.value = getBenchmarkValue(
              0,
              "northAmerica",
              "IPSwitches96",
              [3, 6, 6]
            );
            inputDiv9.disabled = true;
          } else {
            inputDiv9.value = getBenchmarkValue(
              parseFloat(inputDiv10.value),
              "northAmerica",
              "IPSwitches96",
              [3, 6, 6]
            );
            inputDiv9.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerSwitchIn");
          inputDiv.value = 0;
          inputDiv.disabled = false;
  
          let inputDiv2 = document.getElementById("unitCostPerSwitchIn2");
          inputDiv2.value = 0;
          inputDiv2.disabled = false;
  
          let inputDiv3 = document.getElementById("unitCostPerSwitchIn3");
          inputDiv3.value = 0;
          inputDiv3.disabled = false;
  
          let inputDiv4 = document.getElementById("unitCostPerSwitchIn4");
          inputDiv4.value = 0;
          inputDiv4.disabled = false;
  
          let inputDiv5 = document.getElementById("unitCostPerSwitchIn5");
          inputDiv5.value = 0;
          inputDiv5.disabled = false;
        }
      });
  
    document
      .getElementById("selectTotalNumberSANRegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerSwitchIn6");
          let inputDiv2 = document.getElementById("numberOfFCSwitches16Ports");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "FCSwitches16",
              [2, 5, 5]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "FCSwitches16",
              [2, 5, 5]
            );
            inputDiv.disabled = true;
          }
  
          let inputDiv3 = document.getElementById("unitCostPerSwitchIn7");
          let inputDiv4 = document.getElementById("numberOfFCSwitches32Ports");
          if (inputDiv4.value == "") {
            inputDiv3.value = getBenchmarkValue(
              0,
              "northAmerica",
              "FCSwitches32",
              [2, 5, 5]
            );
            inputDiv3.disabled = true;
          } else {
            inputDiv3.value = getBenchmarkValue(
              parseFloat(inputDiv4.value),
              "northAmerica",
              "FCSwitches32",
              [2, 5, 5]
            );
            inputDiv3.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerSwitchIn6");
          inputDiv.value = 0;
          inputDiv.disabled = false;
  
          let inputDiv2 = document.getElementById("unitCostPerSwitchIn7");
          inputDiv2.value = 0;
          inputDiv2.disabled = false;
        }
      });
  
    document
      .getElementById("selectNumberOfHypervisorRegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerSocketLicenseIn");
          let inputDiv2 = document.getElementById("numberOfHypervisorLicenses");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "hypervisor",
              [20, 50, 50]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "hypervisor",
              [20, 50, 50]
            );
            inputDiv.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerSocketLicenseIn");
          inputDiv.value = 0;
          inputDiv.disabled = false;
        }
      });
  
    document
      .getElementById("terabytesOfBackupStorageRegionalBenchmarks")
      .addEventListener("click", (event) => {
        if (event.target.checked) {
          let inputDiv = document.getElementById("unitCostPerTBIn");
          let inputDiv2 = document.getElementById("totalDeduplicatedStorageInTB");
          if (inputDiv2.value == "") {
            inputDiv.value = getBenchmarkValue(
              0,
              "northAmerica",
              "storedInHDD",
              [100, 250, 250]
            );
            inputDiv.disabled = true;
          } else {
            inputDiv.value = getBenchmarkValue(
              parseFloat(inputDiv2.value),
              "northAmerica",
              "storedInHDD",
              [100, 250, 250]
            );
            inputDiv.disabled = true;
          }
  
          let inputDiv3 = document.getElementById("unitCostPerTBIn2");
          let inputDiv4 = document.getElementById(
            "totalDeduplicatedStorageCloud"
          );
          if (inputDiv4.value == "") {
            inputDiv3.value = getBenchmarkValue(
              0,
              "northAmerica",
              "storedInCloud",
              [100, 250, 250]
            );
            inputDiv3.disabled = true;
          } else {
            inputDiv3.value = getBenchmarkValue(
              parseFloat(inputDiv4.value),
              "northAmerica",
              "storedInCloud",
              [100, 250, 250]
            );
            inputDiv3.disabled = true;
          }
  
          let inputDiv5 = document.getElementById("unitCostPerTBIn3");
          let inputDiv6 = document.getElementById("totalDeduplicatedStorageTape");
          if (inputDiv6.value == "") {
            inputDiv5.value = getBenchmarkValue(
              0,
              "northAmerica",
              "storedInTape",
              [100, 250, 250]
            );
            inputDiv5.disabled = true;
          } else {
            inputDiv5.value = getBenchmarkValue(
              parseFloat(inputDiv6.value),
              "northAmerica",
              "storedInTape",
              [100, 250, 250]
            );
            inputDiv5.disabled = true;
          }
        } else {
          let inputDiv = document.getElementById("unitCostPerTBIn");
          inputDiv.value = 0;
          inputDiv.disabled = false;
  
          let inputDiv2 = document.getElementById("unitCostPerTBIn2");
          inputDiv2.value = 0;
          inputDiv2.disabled = false;
  
          let inputDiv3 = document.getElementById("unitCostPerTBIn3");
          inputDiv3.value = 0;
          inputDiv3.disabled = false;
        }
      });


    // Add eventlisteners on the input fields
    document.getElementById("numberOfCabinets").addEventListener("input", (event) =>{
      if (document
        .getElementById("useRegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostOfEachCabinet");
        let inputDiv2 = event.target;
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "cabinets",
            [10, 25, 25]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "cabinets",
            [10, 25, 25]
          );
          inputDiv.disabled = true;
        }
      } else {
        let inputDiv = document.getElementById("unitCostOfEachCabinet");
        inputDiv.value = 0;
        inputDiv.disabled = false;
      }
    });


    document.getElementById("numberOfRacks").addEventListener("input", (event)=>{
      if (document
        .getElementById("useRegionalBenchmarksSelectNumberOf").checked) {
        let inputDiv = document.getElementById("unitCostOfEachRack");
        let inputDiv2 = document.getElementById("numberOfRacks");

        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "racks",
            [10, 25, 25]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "racks",
            [10, 25, 25]
          );
          inputDiv.disabled = true;
        }
      } else {
        let inputDiv = document.getElementById("unitCostOfEachRack");
        inputDiv.value = 0;
        inputDiv.disabled = false;
      }
    });


    document.getElementById("totalMemoryInGB").addEventListener("input", (event)=>{
      if (document
        .getElementById("selectTotalMemoryFromRegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerGBIn");
        let inputDiv2 = document.getElementById("totalMemoryInGB");
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "memory",
            [3000, 10000, 10000]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "memory",
            [3000, 10000, 10000]
          );
          inputDiv.disabled = true;
        }
      } else {
        let inputDiv = document.getElementById("unitCostPerGBIn");
        inputDiv.value = 0;
        inputDiv.disabled = false;
      }
    });


    document.getElementById("numberOfCPU").addEventListener("input", (event)=>{
      if (document
        .getElementById("physicalCPURegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerCPUsIn");
        let inputDiv2 = document.getElementById("numberOfCPU");
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "cpu",
            [20, 50, 50]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "cpu",
            [20, 50, 50]
          );
          inputDiv.disabled = true;
        }
      } else {
        let inputDiv = document.getElementById("unitCostPerCPUsIn");
        inputDiv.value = 0;
        inputDiv.disabled = false;
      }
    });


    document.getElementById("flashStorageInTB").addEventListener("input", (event)=>{
      if (document
        .getElementById("selectTotalTBOfRegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerTBOfFlashStorage");
        let inputDiv2 = document.getElementById("flashStorageInTB");
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "flashStorage",
            [100, 250, 250]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "flashStorage",
            [100, 250, 250]
          );
          inputDiv.disabled = true;
        }


      } else {
        let inputDiv = document.getElementById("unitCostPerTBOfFlashStorage");
        inputDiv.value = 0;
        inputDiv.disabled = false;
      }
    });


    document.getElementById("hddStorageInTB").addEventListener("input", (event)=>{
      if (document
        .getElementById("selectTotalTBOfRegionalBenchmarks").checked) {
        

        let inputDiv3 = document.getElementById("unitCostPerTBOfHDDStorage");
        let inputDiv4 = document.getElementById("hddStorageInTB");
        if (inputDiv4.value == "") {
          inputDiv3.value = getBenchmarkValue(
            0,
            "northAmerica",
            "HDDStorage",
            [100, 250, 250]
          );
          inputDiv3.disabled = true;
        } else {
          inputDiv3.value = getBenchmarkValue(
            parseFloat(inputDiv4.value),
            "northAmerica",
            "HDDStorage",
            [100, 250, 250]
          );
          inputDiv3.disabled = true;
        }
      } else {

        let inputDiv2 = document.getElementById("unitCostPerTBOfHDDStorage");
        inputDiv2.value = 0;
        inputDiv2.disabled = false;
      }
    });


    document.getElementById("numberOfIPSwitches16Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberIPregionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerSwitchIn");
        let inputDiv1 = document.getElementById("numberOfIPSwitches16Ports");
        if (inputDiv1.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "IPSwitches16",
            [3, 6, 6]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv1.value),
            "northAmerica",
            "IPSwitches16",
            [3, 6, 6]
          );
          inputDiv.disabled = true;
        }

      } else {
        let inputDiv = document.getElementById("unitCostPerSwitchIn");
        inputDiv.value = 0;
        inputDiv.disabled = false;

      }
    });

    document.getElementById("numberOfIPSwitches32Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberIPregionalBenchmarks").checked) {

        let inputDiv3 = document.getElementById("unitCostPerSwitchIn2");
        let inputDiv4 = document.getElementById("numberOfIPSwitches32Ports");
        if (inputDiv4.value == "") {
          inputDiv3.value = getBenchmarkValue(
            0,
            "northAmerica",
            "IPSwitches32",
            [3, 6, 6]
          );
          inputDiv3.disabled = true;
        } else {
          inputDiv3.value = getBenchmarkValue(
            parseFloat(inputDiv4.value),
            "northAmerica",
            "IPSwitches32",
            [3, 6, 6]
          );
          inputDiv3.disabled = true;
        }

  
      } else {

        let inputDiv2 = document.getElementById("unitCostPerSwitchIn2");
        inputDiv2.value = 0;
        inputDiv2.disabled = false;

      }
    });


    document.getElementById("numberOfIPSwitches48Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberIPregionalBenchmarks").checked) {
        
        let inputDiv5 = document.getElementById("unitCostPerSwitchIn3");
        let inputDiv6 = document.getElementById("numberOfIPSwitches48Ports");
        if (inputDiv6.value == "") {
          inputDiv5.value = getBenchmarkValue(
            0,
            "northAmerica",
            "IPSwitches48",
            [3, 6, 6]
          );
          inputDiv5.disabled = true;
        } else {
          inputDiv5.value = getBenchmarkValue(
            parseFloat(inputDiv6.value),
            "northAmerica",
            "IPSwitches48",
            [3, 6, 6]
          );
          inputDiv5.disabled = true;
        }

      } else {

        let inputDiv3 = document.getElementById("unitCostPerSwitchIn3");
        inputDiv3.value = 0;
        inputDiv3.disabled = false;

      }
    });


    document.getElementById("numberOfIPSwitches64Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberIPregionalBenchmarks").checked) {
        
        let inputDiv7 = document.getElementById("unitCostPerSwitchIn4");
        let inputDiv8 = document.getElementById("numberOfIPSwitches64Ports");
        if (inputDiv8.value == "") {
          inputDiv7.value = getBenchmarkValue(
            0,
            "northAmerica",
            "IPSwitches64",
            [3, 6, 6]
          );
          inputDiv7.disabled = true;
        } else {
          inputDiv7.value = getBenchmarkValue(
            parseFloat(inputDiv8.value),
            "northAmerica",
            "IPSwitches64",
            [3, 6, 6]
          );
          inputDiv7.disabled = true;
        }

      } else {
        
        let inputDiv4 = document.getElementById("unitCostPerSwitchIn4");
        inputDiv4.value = 0;
        inputDiv4.disabled = false;

      }
    });


    document.getElementById("numberOfIPSwitches96Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberIPregionalBenchmarks").checked) {
        
        let inputDiv9 = document.getElementById("unitCostPerSwitchIn5");
        let inputDiv10 = document.getElementById("numberOfIPSwitches96Ports");
        if (inputDiv10.value == "") {
          inputDiv9.value = getBenchmarkValue(
            0,
            "northAmerica",
            "IPSwitches96",
            [3, 6, 6]
          );
          inputDiv9.disabled = true;
        } else {
          inputDiv9.value = getBenchmarkValue(
            parseFloat(inputDiv10.value),
            "northAmerica",
            "IPSwitches96",
            [3, 6, 6]
          );
          inputDiv9.disabled = true;
        }
      } else {
        
        let inputDiv5 = document.getElementById("unitCostPerSwitchIn5");
        inputDiv5.value = 0;
        inputDiv5.disabled = false;
      }
    });

    
    document.getElementById("numberOfFCSwitches16Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberSANRegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerSwitchIn6");
        let inputDiv2 = document.getElementById("numberOfFCSwitches16Ports");
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "FCSwitches16",
            [2, 5, 5]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "FCSwitches16",
            [2, 5, 5]
          );
          inputDiv.disabled = true;
        }

      } else {
        let inputDiv = document.getElementById("unitCostPerSwitchIn6");
        inputDiv.value = 0;
        inputDiv.disabled = false;

      }
    });


    document.getElementById("numberOfFCSwitches32Ports").addEventListener("input", ()=>{
      if (document
        .getElementById("selectTotalNumberSANRegionalBenchmarks").checked) {
        
        let inputDiv3 = document.getElementById("unitCostPerSwitchIn7");
        let inputDiv4 = document.getElementById("numberOfFCSwitches32Ports");
        if (inputDiv4.value == "") {
          inputDiv3.value = getBenchmarkValue(
            0,
            "northAmerica",
            "FCSwitches32",
            [2, 5, 5]
          );
          inputDiv3.disabled = true;
        } else {
          inputDiv3.value = getBenchmarkValue(
            parseFloat(inputDiv4.value),
            "northAmerica",
            "FCSwitches32",
            [2, 5, 5]
          );
          inputDiv3.disabled = true;
        }
      } else {
 
        let inputDiv2 = document.getElementById("unitCostPerSwitchIn7");
        inputDiv2.value = 0;
        inputDiv2.disabled = false;
      }
    });


    document.getElementById("numberOfHypervisorLicenses").addEventListener("input", (event)=>{
      if (document
        .getElementById("selectNumberOfHypervisorRegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerSocketLicenseIn");
        let inputDiv2 = document.getElementById("numberOfHypervisorLicenses");
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "hypervisor",
            [20, 50, 50]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "hypervisor",
            [20, 50, 50]
          );
          inputDiv.disabled = true;
        }
      } else {
        let inputDiv = document.getElementById("unitCostPerSocketLicenseIn");
        inputDiv.value = 0;
        inputDiv.disabled = false;
      }
    });


    document.getElementById("totalDeduplicatedStorageInTB").addEventListener("input", (event)=>{
      if (document
        .getElementById("terabytesOfBackupStorageRegionalBenchmarks").checked) {
        let inputDiv = document.getElementById("unitCostPerTBIn");
        let inputDiv2 = document.getElementById("totalDeduplicatedStorageInTB");
        if (inputDiv2.value == "") {
          inputDiv.value = getBenchmarkValue(
            0,
            "northAmerica",
            "storedInHDD",
            [100, 250, 250]
          );
          inputDiv.disabled = true;
        } else {
          inputDiv.value = getBenchmarkValue(
            parseFloat(inputDiv2.value),
            "northAmerica",
            "storedInHDD",
            [100, 250, 250]
          );
          inputDiv.disabled = true;
        }

      } else {
        let inputDiv = document.getElementById("unitCostPerTBIn");
        inputDiv.value = 0;
        inputDiv.disabled = false;

      }
    });


    document.getElementById("totalDeduplicatedStorageCloud").addEventListener("input", (event)=>{
      if (document
        .getElementById("terabytesOfBackupStorageRegionalBenchmarks").checked) {
        
        let inputDiv3 = document.getElementById("unitCostPerTBIn2");
        let inputDiv4 = document.getElementById(
          "totalDeduplicatedStorageCloud"
        );
        if (inputDiv4.value == "") {
          inputDiv3.value = getBenchmarkValue(
            0,
            "northAmerica",
            "storedInCloud",
            [100, 250, 250]
          );
          inputDiv3.disabled = true;
        } else {
          inputDiv3.value = getBenchmarkValue(
            parseFloat(inputDiv4.value),
            "northAmerica",
            "storedInCloud",
            [100, 250, 250]
          );
          inputDiv3.disabled = true;
        }

      } else {
        
        let inputDiv2 = document.getElementById("unitCostPerTBIn2");
        inputDiv2.value = 0;
        inputDiv2.disabled = false;

      }
    });


    document.getElementById("totalDeduplicatedStorageTape").addEventListener("input", (event)=>{
      if (document
        .getElementById("terabytesOfBackupStorageRegionalBenchmarks").checked) {
        
        let inputDiv5 = document.getElementById("unitCostPerTBIn3");
        let inputDiv6 = document.getElementById("totalDeduplicatedStorageTape");
        if (inputDiv6.value == "") {
          inputDiv5.value = getBenchmarkValue(
            0,
            "northAmerica",
            "storedInTape",
            [100, 250, 250]
          );
          inputDiv5.disabled = true;
        } else {
          inputDiv5.value = getBenchmarkValue(
            parseFloat(inputDiv6.value),
            "northAmerica",
            "storedInTape",
            [100, 250, 250]
          );
          inputDiv5.disabled = true;
        }
      } else {
        
        let inputDiv3 = document.getElementById("unitCostPerTBIn3");
        inputDiv3.value = 0;
        inputDiv3.disabled = false;
      }
    });


    
  });
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// DOWNTIME CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function downtimeCalculator(annualRevenue, durationOfDowntime, averageFullyLoadedEmployeeCostPerHour, numberOfEmployeesAffected, impactToSales, impactToProductivity) {
    // Initial values
    let r = annualRevenue; // Annual Revenue
    let i = durationOfDowntime; // Duration of Downtime (hours)
    let l = impactToSales; // Impact to sales (in percentage)
    let s = numberOfEmployeesAffected; // Number of Employees affected
    let u = averageFullyLoadedEmployeeCostPerHour; // Average Fully Loaded Employee Cost / Hour
    let c = impactToProductivity; // Impact to Productivity (in percentage)
  
    // Variables to store the results
    let lostRevenue = 0;
    let labourCost = 0;
    let hourlyDowntimeCost;
  
    // Function to update sales impact
    function sales(data) {
      l = data;
    }
  
    // Function to update productivity impact
    function productivity(data) {
      c = data;
    }
  
    // Calculation function
    function calculate() {
      // Validation: Ensure values are not empty
      r = checkValidValue(r);
      i = checkValidValue(i);
      l = checkValidValue(l);
      s = checkValidValue(s);
      u = checkValidValue(u);
      c = checkValidValue(c);
  
      // Perform calculations
      lostRevenue = Math.round((r / 1920) * i * (l / 100));
      labourCost = Math.round((s * u * i * c) / 100);
      hourlyDowntimeCost = Math.round(
        ((r / 1920) * i * (l / 100) + (s * u * i * c) / 100) / i
      );
  
      // Log the results (or return them based on your needs)
      // console.log("Lost Revenue:", lostRevenue);
      // console.log("Labour Cost:", labourCost);
      // console.log("Total Downtime Cost:", lostRevenue + labourCost);
      
      // console.log("Hourly Downtime Cost:", hourlyDowntimeCost > 1 ? hourlyDowntimeCost : 0);
      document.getElementById("lostRevenueResult").textContent = lostRevenue;
      document.getElementById("labourCostResult").textContent = labourCost;
      document.getElementById("totalDowntimeCostResult").textContent = lostRevenue + labourCost;
      document.getElementById("hourlyDowntimeCost").textContent = hourlyDowntimeCost > 1 ? hourlyDowntimeCost : 0;
    }
  
    // Function to validate and check the value
    function checkValidValue(value) {
      if (value > 0 || value === "") {
        return value || 1; // Return 1 if value is empty
      } else {
        return 1; // Return 1 for invalid values
      }
    }
  
    // Simulate useEffect by calling calculate initially and whenever necessary
    calculate();
  
  }
  
  const validateFormDowntimeCalc = (obj) => {
    let errors = {};
  
    // Iterate over each property in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if value is empty or not a number
        if (key === "resolution" || key === "compressionType") {
          continue;
        }
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          isNaN(value)
        ) {
          errors[key] = `The value for '${key}' is empty or not a number.`;
        }
        if (value < 0) {
          errors[key] = `The value for '${key}' is negative.`;
        }
      }
    }
  
    // Return the errors object
    return errors;
  };
  
  const handleDowntimeCalculatorForm = (e) => {
    e.preventDefault();
    let form = document.getElementById("downtime-calculator-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    let errorResult = validateFormDowntimeCalc(formDataJSON);
    if (Object.keys(errorResult).length > 0) {
      alert(Object.values(errorResult)[0]);
    } else {
      // console.log(formDataJSON);
      downtimeCalculator(formDataJSON["annualRevenue"], formDataJSON["durationOfDowntime"], formDataJSON["averageFullyLoadedEmployeeCostPerHour"], formDataJSON["numberOfEmployeesAffected"], formDataJSON["impactToSales"], formDataJSON["impactToProductivity"])
    }
  };
  
  // Get the range slider and label element
  const rangeSlider = document.getElementById("impactToProductivity");
  const percentageLabel = document.getElementById("percentageLabel");
  
  // Function to update the percentage label
  function updatePercentageLabel() {
    if(rangeSlider == null){
      return;
    }
    if(percentageLabel == null){
      return;
    }
    const value = rangeSlider.value;
    percentageLabel.textContent = `${value}%`;
  }
  
  
  // Get the range slider and label element
  const rangeSlider2 = document.getElementById("impactToSales");
  const percentageLabel2 = document.getElementById("percentageLabel1");
  
  // Function to update the percentage label
  function updatePercentageLabel2() {
    if(rangeSlider2 == null){
      return;
    }
    if(percentageLabel2 == null){
      return;
    }
    const value = rangeSlider2.value;
    percentageLabel2.textContent = `${value}%`;
  }
  
  // Initialize the percentage label on page load
  document.addEventListener("DOMContentLoaded", () => {
    updatePercentageLabel(); // Set initial value
    // Add event listener to update the label when the slider value changes
    if(rangeSlider == null){
      return;
    }
    rangeSlider.addEventListener("input", updatePercentageLabel);
    if(rangeSlider2 == null){
      return;
    }
    updatePercentageLabel2(); // Set initial value
    // Add event listener to update the label when the slider value changes
    rangeSlider2.addEventListener("input", updatePercentageLabel2);
  });
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  FILE TRANSFER CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function fileTransferTimeCalculator(
    sizeOfFile,
    transferRateVal,
    fileSizeUnit,
    transferRateUnitVal
  ) {
    let fileSize = sizeOfFile;
    let transferRate = transferRateVal;
    let DHMS_result;
    let sizeUnits = fileSizeUnit;
    let transferRateUnit = transferRateUnitVal;
  
    let T1DS1Line,
      Ethernet,
      FastEthernet,
      GigabitEthernet,
      TenGigabitEthernet,
      USB2,
      USB3,
      Thunderbolt2;
  
    function getTransferRate(value, rate) {
      switch (rate) {
        case "Mbps":
          return value;
        case "bps":
          return value / 1000000;
        case "kbps":
          return value / 1000;
        case "Gbps":
          return value * 1000;
        case "Tbps":
          return value * 1000000;
        case "B/s":
          return value * 0.000008;
        case "KB/s":
          return value * 0.008;
        case "GB/s":
          return value * 8000;
        case "TB/s":
          return value * 8000000;
        case "KiB/s":
          return value * 0.008192;
        case "MiB/s":
          return value * 8.388608;
        case "GiB/s":
          return value * 8589.93459;
        case "TiB/s":
          return value * 8796093.02;
        default:
          return 0;
      }
    }
  
    function calculate() {
      const TRate = getTransferRate(transferRate, transferRateUnit);
  
      if (fileSize < 0) {
        fileSize = Math.abs(fileSize);
      } else if (sizeUnits === "GB") {
        const time = fileSize / (TRate / 8000);
        const days = Math.floor(time / (24 * 60 * 60));
        const hours = Math.floor((time % (3600 * 24)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.round((time % 3600) % 60);
  
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = fileSize / (1.544 / 8000);
        Ethernet = fileSize / (10 / 8000);
        FastEthernet = fileSize / (100 / 8000);
        GigabitEthernet = fileSize / (1000 / 8000);
        TenGigabitEthernet = fileSize / (10000 / 8000);
        USB2 = fileSize / (480 / 8000);
        USB3 = fileSize / (5000 / 8000);
        Thunderbolt2 = fileSize / (20000 / 8000);
      } else if (sizeUnits === "B") {
        const time = fileSize / 1000000 / (TRate / 8);
        const days = Math.floor(time / (24 * 60 * 60));
        const hours = Math.floor((time % (3600 * 24)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.round((time % 3600) % 60);
  
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = fileSize / 1000000 / (1.544 / 8);
        Ethernet = fileSize / 1000000 / (10 / 8);
        FastEthernet = fileSize / 1000000 / (100 / 8);
        GigabitEthernet = fileSize / 1000000 / (1000 / 8);
        TenGigabitEthernet = fileSize / 1000000 / (10000 / 8);
        USB2 = fileSize / 1000000 / (480 / 8);
        USB3 = fileSize / 1000000 / (5000 / 8);
        Thunderbolt2 = fileSize / 1000000 / (20000 / 8);
      } else if (sizeUnits === "KB") {
        const time = fileSize / 1000 / (TRate / 8);
        const days = Math.floor(time / (24 * 60 * 60));
        const hours = Math.floor((time % (3600 * 24)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.round((time % 3600) % 60);
  
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = fileSize / 1000 / (1.544 / 8);
        Ethernet = fileSize / 1000 / (10 / 8);
        FastEthernet = fileSize / 1000 / (100 / 8);
        GigabitEthernet = fileSize / 1000 / (1000 / 8);
        TenGigabitEthernet = fileSize / 1000 / (10000 / 8);
        USB2 = fileSize / 1000 / (480 / 8);
        USB3 = fileSize / 1000 / (5000 / 8);
        Thunderbolt2 = fileSize / 1000 / (20000 / 8);
      } else if (sizeUnits === "MB") {
        const time = fileSize / (TRate / 8);
        const days = Math.floor(time / (24 * 60 * 60));
        const hours = Math.floor((time % (3600 * 24)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.round((time % 3600) % 60);
  
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = fileSize / (1.544 / 8);
        Ethernet = fileSize / (10 / 8);
        FastEthernet = fileSize / (100 / 8);
        GigabitEthernet = fileSize / (1000 / 8);
        TenGigabitEthernet = fileSize / (10000 / 8);
        USB2 = fileSize / (480 / 8);
        USB3 = fileSize / (5000 / 8);
        Thunderbolt2 = fileSize / (20000 / 8);
      } else if (sizeUnits == "TB") {
        let time = (fileSize * 1000) / (TRate / 8000);
        let days = Math.floor(time / (24 * 60 * 60));
        let hours = Math.floor((time % (3600 * 24)) / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.round((time % 3600) % 60);
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = (fileSize * 1000) / (1.544 / 8000);
        Ethernet = (fileSize * 1000) / (10 / 8000);
        FastEthernet = (fileSize * 1000) / (100 / 8000);
        GigabitEthernet = (fileSize * 1000) / (1000 / 8000);
        TenGigabitEthernet = (fileSize * 1000) / (10000 / 8000);
        USB2 = (fileSize * 1000) / (480 / 8000);
        USB3 = (fileSize * 1000) / (5000 / 8000);
        Thunderbolt2 = (fileSize * 1000) / (20000 / 8000);
      } else if (sizeUnits == "KiB") {
        let time = Math.round(fileSize / 976.6) / (TRate / 8);
        let days = Math.floor(time / (24 * 60 * 60));
        let hours = Math.floor((time % (3600 * 24)) / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.round((time % 3600) % 60);
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = fileSize / 976.6 / (1.544 / 8);
        Ethernet = fileSize / 976.6 / (10 / 8);
        FastEthernet = fileSize / 976.6 / (100 / 8);
        GigabitEthernet = fileSize / 976.6 / (1000 / 8);
        TenGigabitEthernet = fileSize / 976.6 / (10000 / 8);
        USB2 = fileSize / 976.6 / (480 / 8);
        USB3 = fileSize / 976.6 / (5000 / 8);
        Thunderbolt2 = fileSize / 976.6 / (20000 / 8);
      } else if (sizeUnits == "MiB") {
        let time = Math.round(fileSize * 1.048576) / (TRate / 8);
        let days = Math.floor(time / (24 * 60 * 60));
        let hours = Math.floor((time % (3600 * 24)) / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.round((time % 3600) % 60);
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = (fileSize * 1.048576) / (1.544 / 8);
        Ethernet = (fileSize * 1.048576) / (10 / 8);
        FastEthernet = (fileSize * 1.048576) / (100 / 8);
        GigabitEthernet = (fileSize * 1.048576) / (1000 / 8);
        TenGigabitEthernet = (fileSize * 1.048576) / (10000 / 8);
        USB2 = (fileSize * 1.048576) / (480 / 8);
        USB3 = (fileSize * 1.048576) / (5000 / 8);
        Thunderbolt2 = (fileSize * 1.048576) / (20000 / 8);
      } else if (sizeUnits == "GiB") {
        let time = (fileSize * 1073.74182) / (TRate / 8);
        let days = Math.floor(time / (24 * 60 * 60));
        let hours = Math.floor((time % (3600 * 24)) / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.round((time % 3600) % 60);
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = fileSize / 1073.74182 / (1.544 / 8);
        Ethernet = (fileSize * 1073.74182) / (10 / 8);
        FastEthernet = (fileSize * 1073.74182) / (100 / 8);
        GigabitEthernet = (fileSize * 1073.74182) / (1000 / 8);
        TenGigabitEthernet = (fileSize * 1073.74182) / (10000 / 8);
        USB2 = (fileSize * 1073.74182) / (480 / 8);
        USB3 = (fileSize * 1073.74182) / (5000 / 8);
        Thunderbolt2 = (fileSize * 1073.74182) / (20000 / 8);
      } else if (sizeUnits == "TiB") {
        let time = (fileSize * 1099511.63) / (TRate / 8);
        let days = Math.floor(time / (24 * 60 * 60));
        let hours = Math.floor((time % (3600 * 24)) / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.round((time % 3600) % 60);
        DHMS_result = `${days}:${hours}:${minutes}:${seconds}`;
        T1DS1Line = (fileSize * 1099511.63) / (1.544 / 8);
        Ethernet = (fileSize * 1099511.63) / (10 / 8);
        FastEthernet = (fileSize * 1099511.63) / (100 / 8);
        GigabitEthernet = (fileSize * 1099511.63) / (1000 / 8);
        TenGigabitEthernet = (fileSize * 1099511.63) / (10000 / 8);
        USB2 = (fileSize * 1099511.63) / (480 / 8);
        USB3 = (fileSize * 1099511.63) / (5000 / 8);
        Thunderbolt2 = (fileSize * 1099511.63) / (20000 / 8);
      }
      // Add additional cases for other units like TB, KiB, MiB, GiB, etc.
    }
  
    calculate();
  
    return {
      calculate,
      getTransferRate,
      DHMS_result,
      T1DS1Line,
      Ethernet,
      FastEthernet,
      GigabitEthernet,
      TenGigabitEthernet,
      USB2,
      USB3,
      Thunderbolt2,
    };
  }
  
  const validateFormForFileTransferCalc = (obj) => {
    let errors = {};
  
    // Iterate over each property in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if value is empty or not a number
        if (key === "fileSizeUnit" || key === "transferRateUnit") {
          continue;
        }
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          isNaN(value)
        ) {
          errors[key] = `The value for '${key}' is empty or not a number.`;
        }
        if (value < 0) {
          errors[key] = `The value for '${key}' is negative.`;
        }
      }
    }
  
    // Return the errors object
    return errors;
  };
  
  const handleFileTransferCalculatorForm = (e) => {
    e.preventDefault();
    let form = document.getElementById("file-transfer-calc-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    let errorResult = validateFormForFileTransferCalc(formDataJSON);
    if (Object.keys(errorResult).length > 0) {
      alert(Object.values(errorResult)[0]);
    } else {
      // console.log("formDataJSON", formDataJSON);
  
      let calculator = fileTransferTimeCalculator(
        parseFloat(formDataJSON["fileSize"]),
        parseFloat(formDataJSON["transferRate"]),
        formDataJSON["fileSizeUnit"],
        formDataJSON["transferRateUnit"]
      );
      // console.log(calculator.DHMS_result);
  
      document.getElementById("file-transfer-calc-result").textContent = calculator.DHMS_result
    }
  };
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  RAID CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let numberOfDisk = 0; //variable to hold number of disks value
let sizeOfEachDrive = 0; //variable to hold size of each drive value
// State variables
let activeDisk = 1;
let visibleDisk = [1]; // Example, modify according to your needs

const handleReadMoreFunction = () => {
  // Get the element by its ID
  const element = document.getElementById("raid-cal-desc");
  if(element == null){
    return;
  }

  // Check the current display style of the element
  if (element.style.display === "none" || element.style.display === "") {
    // If it is "none" or empty, set it to "block"
    element.style.display = "block";
  } else {
    // Otherwise, set it to "none"
    element.style.display = "none";
  }
};

// Function to update visibleDisk based on noOfDisks
function updateVisibleDisk() {
  visibleDisk = [1];
  if (numberOfDisk === 2) {
    visibleDisk = [1, 2];
  } else if (numberOfDisk >= 3) {
    visibleDisk = [1, 3];
  }
  if (numberOfDisk >= 4) {
    visibleDisk = [1, 3, 4];
  }
  if (numberOfDisk % 2 === 0 && numberOfDisk === 4) {
    visibleDisk = [1, 3, 4, 5];
  }
  if (numberOfDisk === 6) {
    visibleDisk = [1, 3, 4, 5, 6];
  }
  if (numberOfDisk === 7) {
    visibleDisk = [1, 3, 4, 6];
  }
  if (numberOfDisk >= 8 && numberOfDisk % 2 === 0) {
    visibleDisk = [1, 3, 4, 5, 6, 7];
  } else if (numberOfDisk > 8 && numberOfDisk % 2 !== 0) {
    visibleDisk = [1, 3, 4, 6, 7];
  }
  // console.log("Visible Disks:", visibleDisk);
  renderRadioButtons();
}

const handleNumberOfDiskChange = (e) => {
  e.preventDefault();
  if (e.target.value === "") {
    numberOfDisk = 0;
  } else {
    numberOfDisk = parseInt(e.target.value);
  }

  updateVisibleDisk();
  // call calculator function
  calculator();
};

const handleSizeOfEachDriveChange = (e) => {
  e.preventDefault();
  if (e.target.value === "") {
    sizeOfEachDrive = 0;
  } else {
    sizeOfEachDrive = parseInt(e.target.value);
  }

  updateVisibleDisk();
  // call calculator function
  calculator();
};

const calculator = () => {
  // Initialize variables to simulate state
  let noOfDisks = numberOfDisk;
  let sizeOfDrive = sizeOfEachDrive;
  let visibleDisk1 = visibleDisk;
  let resultCalculations;
  let activeDisk1 = activeDisk;
  let isReadMoreOpen = false;

  // Simulate the effect of calculations when activeDisk, sizeOfDrive, or noOfDisks change
  function calculateResult() {
    if (activeDisk === 1) {
      resultCalculations = noOfDisks * sizeOfDrive;
    } else if (activeDisk === 2) {
      resultCalculations = (noOfDisks * sizeOfDrive) / noOfDisks;
    } else if (activeDisk === 3) {
      resultCalculations = (noOfDisks - 1) * sizeOfDrive;
    } else if (activeDisk === 4) {
      resultCalculations = (noOfDisks - 2) * sizeOfDrive;
    } else if (activeDisk === 5) {
      resultCalculations = noOfDisks * (sizeOfDrive / 2);
    } else if (activeDisk === 6) {
      resultCalculations = (noOfDisks - 2) * sizeOfDrive;
    } else if (activeDisk === 7) {
      resultCalculations = (noOfDisks - 4) * sizeOfDrive;
    }
    // console.log("Result Calculations:", typeof resultCalculations);
    if (resultCalculations == NaN || resultCalculations == undefined) {
      // console.log("0909090909");

      document.getElementById("raid-calc-result").textContent = 0;
      document.getElementById("raid-calc-result-total").textContent = 0;
    } else {
      if (resultCalculations < 0) {
        document.getElementById("raid-calc-result").textContent = 0;
        document.getElementById("raid-calc-result-total").textContent = 0;
      } else {
        document.getElementById("raid-calc-result").textContent =
          resultCalculations;
        document.getElementById("raid-calc-result-total").textContent =
          noOfDisks * sizeOfDrive;
      }
    }
  }

  // Sample function to simulate changes in input values
  function setValues(noOfDisks, driveSize, activeDisk1) {
    noOfDisks = noOfDisks;
    sizeOfDrive = driveSize;
    activeDisk = activeDisk1;
    calculateResult();
    updateVisibleDisk();
  }

  // Simulate the initial setup
  setValues(noOfDisks, sizeOfDrive, activeDisk1); // Example values for testing
};

// Sample data options
const dataOptions = [
  { id: 1, name: "RAID 0" },
  { id: 2, name: "RAID 1" },
  { id: 3, name: "RAID 5" },
  { id: 4, name: "RAID 6" },
  { id: 5, name: "RAID 10" },
  { id: 6, name: "RAID 50" },
  { id: 7, name: "RAID 60" },
];

// Function to handle radio button clicks
const handleRadioClick = (id) => {
  activeDisk = id;
  renderRadioButtons();
  calculator();
};

// Function to render the radio buttons
const renderRadioButtons = () => {
  const container = document.getElementById("radioBoxContainer");
  if(container == null){
    return;
  }
  
  container.innerHTML = ""; // Clear the container

  dataOptions.forEach((data) => {
    const wrapper = document.createElement("div");
    wrapper.className = `radio-box-wrapper ${
      visibleDisk.includes(data.id) ? "" : "disabled"
    }`;

    const formGroup = document.createElement("div");
    const label = document.createElement("label");
    label.className = activeDisk === data.id ? "labelChecked" : "";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = data.name;
    input.checked = activeDisk === data.id;
    input.addEventListener("click", () => handleRadioClick(data.id));

    label.appendChild(input);
    label.appendChild(document.createTextNode(data.name));
    formGroup.appendChild(label);
    wrapper.appendChild(formGroup);
    container.appendChild(wrapper);
  });
};

// Initial render
renderRadioButtons();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  SERVER RACK POWER CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function serverRackPowerConsumptionCalc(numberOfRacks, serversPerRack, powerSupplyForEachServer, facilityPower1) {
    // Variables for input values
    let numberRack = numberOfRacks;
    let serverRack = serversPerRack;
    let powerSupply = powerSupplyForEachServer;
    let facilityPower = facilityPower1;
  
    // Variables to store the results
    let ampsResult = 0;
    let supplyPerRackResult = 0;
    let supplyResult = 0;
  
    // Calculation function
    function calculate() {
      // Calculate ampsResult, supplyPerRackResult, and supplyResult
      ampsResult = (powerSupply / facilityPower).toFixed(2);
      supplyPerRackResult = ((serverRack * powerSupply) / 1000).toFixed(2);
      supplyResult = ((numberRack * serverRack * powerSupply) / 1000).toFixed(2);
  
      // Ensure inputs are valid
      if (numberRack <= 0) {
        numberRack = 1;
        ampsResult = 0;
        supplyResult = 0;
      }
      if (serverRack <= 0) {
        serverRack = 1;
        supplyPerRackResult = 0;
        supplyResult = 0;
      }
      if (powerSupply <= 0) {
        powerSupply = 1;
        ampsResult = 0;
        supplyPerRackResult = 0;
        supplyResult = 0;
      }
      if (facilityPower <= 0) {
        facilityPower = 1;
        ampsResult = 0;
      }
  
      // Log the results (or return based on your needs)
      // console.log("Amps Result:", ampsResult);
      // console.log("Supply Per Rack Result:", supplyPerRackResult);
      // console.log("Total Supply Result:", supplyResult);
  
      document.getElementById("ampsPerServerResult").textContent = ampsResult;
      document.getElementById("totalRequiredSupplyPerRackInkW").textContent = supplyPerRackResult;
      document.getElementById("totalRequiredSupplyInkW").textContent = supplyResult;
    }
  
    // Initial calculation (simulating useEffect's initial call)
    calculate();
  
  }
  
  
  const validateForm = (obj) => {
    let errors = {};
  
    // Iterate over each property in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if value is empty or not a number
        if (key === "resolution" || key === "compressionType") {
          continue;
        }
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          isNaN(value)
        ) {
          errors[key] = `The value for '${key}' is empty or not a number.`;
        }
        if (value < 0) {
          errors[key] = `The value for '${key}' is negative.`;
        }
      }
    }
  
    // Return the errors object
    return errors;
  };
  
  const handleServerRackPowerCalculatorForm = (e) => {
    e.preventDefault();
    let form = document.getElementById("server-rack-power-calculator-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    let errorResult = validateForm(formDataJSON);
    if(Object.keys(errorResult).length > 0){
      alert(Object.values(errorResult)[0]);
    } else{
      // console.log(formDataJSON);
      serverRackPowerConsumptionCalc(formDataJSON["numberOfRacks"], formDataJSON["serversPerRack"], formDataJSON["powerSupplyForEachServer"], formDataJSON["facilityPower"])
      
    }
  };
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  SPLUNK STORAGE CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function convertDays(days) {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
  
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      return `${remainingDays} day${remainingDays > 1 ? "s" : ""}`;
    }
  }
  
  function convertGBToTB(gbValue) {
    // Check if the value is greater than 1000 GB
    if (gbValue > 1000) {
      // Convert to TB by dividing by 1000 and rounding down
      const tbValue = Math.floor(gbValue / 1000);
      return { val: tbValue.toString(), label: "TB" };
    } else {
      // Return the value in GB
      return { val: gbValue.toString(), label: "GB" };
    }
  }
  
  function splunkCalculator(formObj) {
    // console.log("formObj", formObj);
  
    // State variables converted to objects to hold data
    let isSizeByEventsChecked = false;
    let isClusterReplicationChecked = true;
    let isEstimateAutomaticallyChecked = true;
  
    //   {
    //     "sizeByEventsSec": "on",
    //     "eventPerSecond": "50",
    //     "averageSize": "20",
    //     "dailyDataVolume": "1",
    //     "rawCompression": "0.01",
    //     "metadataSize": "0.1",
    //     "hot": "0",
    //     "cold": "0",
    //     "archived": "0",
    //     "maxVolume": "1",
    //     "nodes": "2",
    //     "searchability": "1",
    //     "replication": "1"
    // }
  
    // Object to store input data
    let inputData = {
      dailyDataVolume: {
        value: Object.keys(formObj).includes("dailyDataVolume")
          ? parseInt(formObj["dailyDataVolume"])
          : 0,
        type: Object.keys(formObj).includes("dailyDataVolume")
          ? convertGBToTB(formObj["dailyDataVolume"]).label
          : "GB",
        step: 1,
        maxValue: 1000 * 40,
        minValue: 1,
        maxLimit: 1000 * 40,
        leftPosition: 0,
        rightMargin: 15,
        toolTipText:
          "The average amount of uncompressed raw data that Splunk will ingest.",
      },
      eventPerSecond: {
        value: Object.keys(formObj).includes("eventPerSecond")
          ? parseInt(formObj["eventPerSecond"])
          : 0,
        type: "",
        step: 50,
        maxValue: 5000000,
        minValue: 50,
        leftPosition: 0,
        rightMargin: 7.4,
        toolTipText:
          "The average number of events per second that Splunk will ingest.",
      },
      averageSize: {
        value: Object.keys(formObj).includes("averageSize")
          ? parseInt(formObj["averageSize"])
          : 0,
        type: "bytes",
        step: 20,
        maxValue: 1000,
        minValue: 20,
        leftPosition: 0,
        rightMargin: 29,
        toolTipText: "The average message size that Splunk will ingest.",
      },
      rawCompression: {
        value: Object.keys(formObj).includes("rawCompression")
          ? parseFloat(formObj["rawCompression"])
          : 0,
        type: "",
        step: 0.01,
        maxValue: 0.8,
        minValue: 0.01,
        leftPosition: 0,
        rightMargin: 9,
        toolTipText:
          "Typically, the compressed rawdata file is 15% the size of the incoming, pre-indexed raw data. The number of unique terms in the data affect this value.",
      },
      metadataSize: {
        value: Object.keys(formObj).includes("metadataSize")
          ? parseFloat(formObj["metadataSize"])
          : 0,
        type: "",
        step: 0.1,
        maxValue: 1.5,
        minValue: 0.1,
        leftPosition: 0,
        rightMargin: 7,
        toolTipText:
          "Typically, metadata is 35% of the raw data. The type of data and index time field extractions will affect this value.",
      },
    };
  
    let dataRetention = {
      hot: {
        value: Object.keys(formObj).includes("hot")
          ? parseFloat(formObj["hot"])
          : 0,
        type: "days",
        step: 1,
        maxValue: 2520,
        minValue: 0,
        leftPosition: 0,
        rightMargin: 22,
        label: "1 days",
        toolTipText:
          "Hot/Warm data will generally be accessed regularly. It should reside on the fastest disk to improve indexing and search performance.",
      },
      cold: {
        value: Object.keys(formObj).includes("cold")
          ? parseFloat(formObj["cold"])
          : 0,
        type: "days",
        step: 1,
        maxValue: 2520,
        minValue: 0,
        leftPosition: 0,
        rightMargin: 22,
        label: "1 days",
        toolTipText:
          "Cold data is generally older and not accessed regularly. It should reside on slower, cheaper disk as search performance is generally not critical.",
      },
      archived: {
        value: Object.keys(formObj).includes("archived")
          ? parseFloat(formObj["archived"])
          : 0,
        type: "days",
        step: 1,
        maxValue: 2520,
        minValue: 0,
        leftPosition: 0,
        rightMargin: 22,
        label: "1 days",
        toolTipText:
          "Frozen data is not searchable and should reside on the slowest, cheapest disk",
      },
      total:
        Object.keys(formObj).includes("hot") &&
        Object.keys(formObj).includes("cold") &&
        Object.keys(formObj).includes("archived")
          ? parseInt(formObj["hot"]) +
            parseInt(formObj["cold"]) +
            parseInt(formObj["archived"])
          : 0,
    };
  
    let architecture = {
      useCase: Object.keys(formObj).includes("useCase") ? formObj["useCase"] : "",
      maxVolume: {
        value: Object.keys(formObj).includes("maxVolume")
          ? parseInt(formObj["maxVolume"])
          : 0,
        type: "GB",
        step: 1,
        maxValue: 600,
        minValue: 1,
        leftPosition: 0,
        rightMargin: 22,
        toolTipText:
          "The maximum daily data volume (in GB) to ingest per indexer. Lowering this will increase the number of indexers required.",
      },
      nodes: {
        value: Object.keys(formObj).includes("nodes")
          ? parseInt(formObj["nodes"])
          : 0,
        type: "node(s)",
        step: 1,
        maxValue: 100,
        minValue: 2,
        leftPosition: 0,
        rightMargin: 37,
        toolTipText: "The number of indexers needed to meet the requirements.",
      },
      searchability: {
        value: Object.keys(formObj).includes("searchability")
          ? parseInt(formObj["searchability"])
          : 0,
        type: "",
        step: 1,
        maxValue: 1,
        minValue: 1,
        leftPosition: 0,
        rightMargin: 2,
        toolTipText:
          "The number of searchable copies of the data to be retained across the cluster. This must be the same or less than the Replication Factor",
      },
      replication: {
        value: Object.keys(formObj).includes("replication")
          ? parseInt(formObj["replication"])
          : 0,
        type: "",
        step: 1,
        maxValue: 2,
        minValue: 1,
        leftPosition: 0,
        rightMargin: 2,
        toolTipText:
          "The total number of searchable and non-searchable copies of the data to be retained across the cluster. This must be the same or greater than the Searchability Factor.",
      },
    };

    
    
  
    let storageRequired = {
      perIndexer: {
        hot: 0,
        cold: 0,
        archived: 0,
        total: 0,
      },
      allIndexer: {
        hot: 0,
        cold: 0,
        archived: 0,
        total: 0,
      },
    };

    
  
    // Function to handle changes
    function handleChange(name, value) {
      const { maxValue, step, type, maxLimit } = inputData[name];
  
      let newStep = step;
      if (name === "eventPerSecond") {
        if (value >= 500 && value < 10000) {
          newStep = 500;
        } else if (value >= 10000 && value < 100000) {
          newStep = 10000;
        } else if (value >= 100000 && value < 500000) {
          newStep = 100000;
        } else if (value >= 500000 && value < 5000000) {
          newStep = 500000;
        } else {
          newStep = 50;
        }
      }
  
      let data = { ...inputData[name], value };
  
      if (name === "dailyDataVolume") {
        if (value <= 1000) {
          data["type"] = "GB";
          data["labelValue"] = value;
        } else {
          data["type"] = "TB";
          data["labelValue"] = Math.round(value / 1000);
        }
      }
      // console.log("data", data);
      inputData[name] = data;
  
      if (
        (name === "eventPerSecond" || name === "averageSize") &&
        isSizeByEventsChecked
      ) {
        const eventPerSecondValue =
          name === "eventPerSecond" ? value : inputData["eventPerSecond"].value;
        const averageSizeValue =
          name === "averageSize" ? value : inputData["averageSize"].value;
        let newValue = eventPerSecondValue * averageSizeValue * (60 * 60 * 24);
        newValue = newValue / (1024 * 1024 * 1024);
        inputData["dailyDataVolume"].value = newValue;
      }
    }
  
    // Function to handle data retention
    function handleDataRetention(name, value) {
      const { step } = dataRetention[name];
      let total = value;
      let keys = Object.keys(dataRetention).filter(
        (k) => k !== name && k !== "total"
      );
      keys.forEach((key) => {
        total += dataRetention[key].value;
      });
  
      let newLabel = `${value} days`;
      let newStep = step;
      if (value > 60 && value <= 30 * 36) {
        newLabel = `${Math.round(value / 30)} month`;
        newStep = 30;
      } else if (value > 30 * 36) {
        newLabel = `${Math.round(value / (30 * 12))} years`;
        newStep = 30 * 12;
      }
  
      dataRetention[name] = {
        ...dataRetention[name],
        value,
        label: newLabel,
        step: newStep,
      };
      dataRetention.total = total;
    }
  
    // Function to handle architecture changes
    function handleArchitecture(name, value) {
      architecture[name] = { ...architecture[name], value };
      if (name === "replication") {
        architecture.searchability.maxValue = value;
      }
      if (name === "nodes") {
        architecture.replication.maxValue = value >= 10 ? 10 : value;
      }
    }
  
    // Function to handle use case
    function handleUseCase(val) {
      const value = val;
      let maxVolumeValue = 0;
      if (value === "security") {
        maxVolumeValue = 100;
      } else if (value === "vmware") {
        maxVolumeValue = 260;
      } else if (value === "intelligence") {
        maxVolumeValue = 200;
      } else if (value === "other") {
        maxVolumeValue = 300;
      }
      architecture.useCase = value;
      architecture.maxVolume.value = maxVolumeValue;
    }
  
    // Initial render equivalent
    function render() {
      // console.log("Input Data:", inputData);
      // console.log("Data Retention:", dataRetention);
      // console.log("Architecture:", architecture);
      // console.log("Storage Required:", storageRequired);
      
      


      document.getElementById("retention-time-hot").style.width = `${
        (dataRetention["hot"].value / dataRetention.total) * 100
      }%`;
      document.getElementById("retention-time-cold").style.width = `${
        (dataRetention["cold"].value / dataRetention.total) * 100
      }%`;
      document.getElementById("retention-time-archived").style.width = `${
        (dataRetention["archived"].value / dataRetention.total) * 100
      }%`;
      document.getElementById("retention-time-total").textContent = convertDays(
        dataRetention["hot"].value +
          dataRetention["cold"].value +
          dataRetention["archived"].value
      );

      // console.log("inputData",inputData,);
      // console.log("dataRetention",dataRetention);
      // console.log("architecture",architecture);
      // console.log("storageRequired",storageRequired);
      document.getElementById("daily-data-volume-value").textContent = inputData.dailyDataVolume.value.toFixed(1);
      document.getElementById("daily-data-volume-events").textContent = inputData.eventPerSecond.value;
      document.getElementById("daily-data-volume-bytes").textContent = inputData.averageSize.value;
  
      const tableHTML = `
      <table>
          <thead>
              <tr>
                  <td></td>
                  <td>(per Indexer)</td>
                  <td>(all Indexer)</td>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Hot, Warm</td>
                  <td>${storageRequired.perIndexer.hot}</td>
                  <td>${storageRequired.allIndexer.hot}</td>
              </tr>
              <tr>
                  <td>Cold</td>
                  <td>${storageRequired.perIndexer.cold}</td>
                  <td>${storageRequired.allIndexer.cold}</td>
              </tr>
              <tr>
                  <td>Archived</td>
                  <td>${storageRequired.perIndexer.archived}</td>
                  <td>${storageRequired.allIndexer.archived}</td>
              </tr>
              <tr>
                  <th>Total</th>
                  <th>${storageRequired.perIndexer.total}</th>
                  <th>${storageRequired.allIndexer.total}</th>
              </tr>
          </tbody>
      </table>
  `;
  
      // Target the element by ID and set its innerHTML
      const tableContainer = document.getElementById("splunk-calculator-table");
      if(tableContainer == null){
        return;
      }
      tableContainer.innerHTML = "";
      tableContainer.innerHTML = tableHTML;
    }
  
    // Simulating lifecycle mount
  
    // Assume these variables are defined in your scope.
  
    // Function to update inputData state
    function setInputData(newState) {
      inputData = { ...inputData, ...newState };
    }
  
    // Function to update architecture state
    function setArchitecture(newState) {
      architecture = { ...architecture, ...newState };
    }
  
    // Function to update dataRetention state
    function setDataRetention(newState) {
      dataRetention = { ...dataRetention, ...newState };
    }
  
    // Function to update storageRequired state
    function setStorageRequired(newState) {
      storageRequired = { ...storageRequired, ...newState };
    }
  
    // Function to handle size by events change
    function handleSizeByEventsChange() {
      if (isSizeByEventsChecked) {
        const averageSizeValue = inputData.averageSize.value;
        const eventPerSecondValue = inputData.eventPerSecond.value;
        let newValue = eventPerSecondValue * averageSizeValue * (60 * 60 * 24);
        newValue = newValue / (1024 * 1024 * 1024); // Convert to GB
        setInputData({
          dailyDataVolume: { ...inputData.dailyDataVolume, value: newValue },
        });
      } else {
        setInputData({
          dailyDataVolume: {
            value: inputData.dailyDataVolume.minValue,
            type: "GB",
            labelValue: null,
          },
        });
      }
    }
  
    // Function to handle cluster replication change
    function handleClusterReplicationChange() {
      if (isClusterReplicationChecked) {
        const { minValue } = architecture.nodes;
        setArchitecture({
          nodes: { value: minValue },
          replication: { maxValue: minValue },
        });
      }
    }
  
    // Function to calculate default data retention
    function calculateDefaultRetention() {
      const { archived, cold, hot } = dataRetention;
      let totalRetention = hot.value + cold.value + archived.value;
      setDataRetention({ total: totalRetention });
    }
  
    // Function to calculate storage requirements
    function calculateStorageRequirements() {
      const {
        averageSize,
        dailyDataVolume,
        eventPerSecond,
        metadataSize,
        rawCompression,
      } = inputData;
      const { replication, nodes, searchability } = architecture;
      const { archived, cold, hot } = dataRetention;
      // if(hot.value > 2520){
      //   hot["value"] = 2520
      // }
      // if(cold.value > 2520){
      //   cold["value"] = 2520
      // }

      // if(archived.value > 2520){
      //   archived["value"] = 2520
      // }


      // console.log("5656ssssssss", hot, cold, archived);
      

      // console.log("89898!!!!!!!!!!!",
      //   JSON.parse(JSON.stringify(dailyDataVolume)),
      // );

      // console.log("!!!!!!!!",dailyDataVolume["value"]);
  
      const gbtobytesFactor = 1024; // Convert GB to bytes
      const GBtoMBFactor = 1024;
  
      const replicationFactorSlider = replication.value;
      
      
      const searchabilityFactorSlider = searchability.value;
      const nodeValue = nodes.value;
      const dailyDataVolumeValue = dailyDataVolume["value"];
      const indexFactorSlider = metadataSize.value;
      const rawCompressionValue = rawCompression.value;

      // console.log("!qqqq", dailyDataVolumeValue);
      
  
      let rawDataPerDay = dailyDataVolumeValue * rawCompressionValue;
      let replicationFactor = document.getElementById("clusterReplication").checked
        ? replicationFactorSlider
        : 1;
      const searchFactor = document.getElementById("clusterReplication").checked
        ? searchabilityFactorSlider
        : 1;
            
      let storageRawPerDay = rawDataPerDay * replicationFactor;
      const hotWarmRetention = hot.value;
      const coldRetention = cold.value;
      const frozenRetention = archived.value;
  
      const storageHotWarmRaw = storageRawPerDay * hotWarmRetention;
      const indexDataPerDay = dailyDataVolumeValue * indexFactorSlider;
      const storageIndexPerDay = indexDataPerDay * searchFactor;
  
      // hot warm Indexer calc
      const storageHotWarmIndex = storageIndexPerDay * hotWarmRetention;
      const storageHotWarmTotal = storageHotWarmRaw + storageHotWarmIndex;
      const storageHotWarmPerIndexer = storageHotWarmTotal / nodeValue;
      let hotWarmPerIndexerStorage = storageHotWarmPerIndexer * gbtobytesFactor;

      let hotWarmAllIndexerStorage = storageHotWarmTotal * gbtobytesFactor;
  
      // cold Indexer calc
      const storageColdIndex = storageIndexPerDay * coldRetention;
      const storageColdRaw = storageRawPerDay * coldRetention;
      const storageColdTotal = storageColdRaw + storageColdIndex;
      const storageColdPerIndexer = storageColdTotal / nodeValue;
      let coldPerIndexerStorage = storageColdPerIndexer * gbtobytesFactor;
      let coldAllIndexerStorage = storageColdTotal * gbtobytesFactor;
  
      // archived (Frozen) calc
      const storageFrozenIndex = storageIndexPerDay * frozenRetention;
      const storageFrozenRaw = storageRawPerDay * frozenRetention;
      const storageFrozenPerIndexer = storageFrozenRaw / nodeValue;
      let frozenPerIndexerStorage = storageFrozenPerIndexer * gbtobytesFactor;
      let frozenAllIndexerStorage = storageFrozenRaw * gbtobytesFactor;
  
      // total calc
      let totalPerIndexerStorage =
        hotWarmPerIndexerStorage +
        coldPerIndexerStorage +
        frozenPerIndexerStorage;
      let totalAllIndexerStorage =
        hotWarmAllIndexerStorage +
        coldAllIndexerStorage +
        frozenAllIndexerStorage;
  
      let totalPerIndexerLabel = "MB";
      let totalAllIndexerLabel = "MB";
      if (totalPerIndexerStorage >= GBtoMBFactor) {
        totalPerIndexerStorage /= GBtoMBFactor;
        totalPerIndexerLabel = "GB";
      }
  
      if (totalAllIndexerStorage >= GBtoMBFactor) {
        totalAllIndexerStorage /= GBtoMBFactor;
        totalAllIndexerLabel = "GB";
      }
  
      // hot warm
      let hotPerIndexerLabel = "MB";
      let hotAllIndexerLabel = "MB";
      if (hotWarmPerIndexerStorage >= GBtoMBFactor) {
        hotWarmPerIndexerStorage /= GBtoMBFactor;
        hotPerIndexerLabel = "GB";
      }
      if (hotWarmAllIndexerStorage >= GBtoMBFactor) {
        hotWarmAllIndexerStorage /= GBtoMBFactor;
        hotAllIndexerLabel = "GB";
      }
  
      // cold
      let coldPerIndexerLabel = "MB";
      let coldAllIndexerLabel = "MB";
      if (coldPerIndexerStorage >= GBtoMBFactor) {
        coldPerIndexerStorage /= GBtoMBFactor;
        coldPerIndexerLabel = "GB";
      }
      if (coldAllIndexerStorage >= GBtoMBFactor) {
        coldAllIndexerStorage /= GBtoMBFactor;
        coldAllIndexerLabel = "GB";
      }
  
      // frozen
      let frozenPerIndexerLabel = "MB";
      let frozenAllIndexerLabel = "MB";
      if (frozenPerIndexerStorage >= GBtoMBFactor) {
        frozenPerIndexerStorage /= GBtoMBFactor;
        frozenPerIndexerLabel = "GB";
      }
      if (frozenAllIndexerStorage >= GBtoMBFactor) {
        frozenAllIndexerStorage /= GBtoMBFactor;
        frozenAllIndexerLabel = "GB";
      }
  
      // setStorageRequired({
      //   perIndexer: {
      //     hot: `${hotWarmPerIndexerStorage.toFixed(1)} ${hotPerIndexerLabel}`,
      //     cold: `${coldPerIndexerStorage.toFixed(1)} ${coldPerIndexerLabel}`,
      //     archived: `${frozenPerIndexerStorage.toFixed(
      //       1
      //     )} ${frozenPerIndexerLabel}`,
      //     total: `${totalPerIndexerStorage.toFixed(1)} ${totalPerIndexerLabel}`,
      //   },
      //   allIndexer: {
      //     hot: `${hotWarmAllIndexerStorage.toFixed(1)} ${hotAllIndexerLabel}`,
      //     cold: `${coldAllIndexerStorage.toFixed(1)} ${coldAllIndexerLabel}`,
      //     archived: `${frozenAllIndexerStorage.toFixed(
      //       1
      //     )} ${frozenAllIndexerLabel}`,
      //     total: `${totalAllIndexerStorage.toFixed(1)} ${totalAllIndexerLabel}`,
      //   },
      // });

      
      
      storageRequired = {
        perIndexer: {
          hot: `${hotWarmPerIndexerStorage.toFixed(1)} ${hotPerIndexerLabel}`,
          cold: `${coldPerIndexerStorage.toFixed(1)} ${coldPerIndexerLabel}`,
          archived: `${frozenPerIndexerStorage.toFixed(
            1
          )} ${frozenPerIndexerLabel}`,
          total: `${totalPerIndexerStorage.toFixed(1)} ${totalPerIndexerLabel}`,
        },
        allIndexer: {
          hot: `${hotWarmAllIndexerStorage.toFixed(1)} ${hotAllIndexerLabel}`,
          cold: `${coldAllIndexerStorage.toFixed(1)} ${coldAllIndexerLabel}`,
          archived: `${frozenAllIndexerStorage.toFixed(
            1
          )} ${frozenAllIndexerLabel}`,
          total: `${totalAllIndexerStorage.toFixed(1)} ${totalAllIndexerLabel}`,
        },
      };
      
    }
  
    // Call functions to simulate the effects
    //   handleSizeByEventsChange();
    //   handleClusterReplicationChange();

    if(document.getElementById("sizeByEventsSec").checked){
      const averageSizeValue = inputData["averageSize"].value;
      const eventPerSecondValue = inputData["eventPerSecond"].value;
      let newValue = eventPerSecondValue * averageSizeValue * (60 * 60 * 24);
      newValue = newValue / (1024 * 1024 * 1024);
      inputData.dailyDataVolume.value = newValue
    } else{
      if(Object.keys(formObj).includes("dailyDataVolume")){
        if(parseInt(formObj["dailyDataVolume"]) > 40000){
          inputData.dailyDataVolume.value = 40000
        } else{
          inputData.dailyDataVolume.value = parseInt(formObj["dailyDataVolume"])
        }
      } else{
        inputData.dailyDataVolume.value = 1
      }
    
    }

    calculateDefaultRetention();

    calculateStorageRequirements();
  
    render();
  }
  
  const handleSizeByEvent = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      let allView1Divs = document.getElementsByClassName("view1");
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allView1Divs).forEach((div) => {
        div.style.display = "none";
      });
  
      let allView2Divs = document.getElementsByClassName("view2");
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allView2Divs).forEach((div) => {
        div.style.display = "block";
      });
    } else {
      let allView2Divs = document.getElementsByClassName("view2");
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allView2Divs).forEach((div) => {
        div.style.display = "none";
      });
  
      let allView1Divs = document.getElementsByClassName("view1");
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allView1Divs).forEach((div) => {
        div.style.display = "block";
      });
    }
  };
  
  const handleClusterReplicationChange = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      let allClusterReplicationDivs = document.getElementsByClassName(
        "clusterReplicationOpt"
      );
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allClusterReplicationDivs).forEach((div) => {
        div.style.display = "block";
      });
    } else {
      let allClusterReplicationDivs = document.getElementsByClassName(
        "clusterReplicationOpt"
      );
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allClusterReplicationDivs).forEach((div) => {
        div.style.display = "none";
      });
    }
  };
  
  const handleEstimateAutomaticallyChange = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      if(document.getElementById("other").checked){
        document.getElementById("nodes").disabled = false;
      }else{
        document.getElementById("nodes").disabled = true;
      }
      let allEstimateAutomaticallyDivs = document.getElementsByClassName(
        "estimateAutomaticallyOpt"
      );
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allEstimateAutomaticallyDivs).forEach((div) => {
        div.style.display = "block";
      });
    } else {
      let allEstimateAutomaticallyDivs = document.getElementsByClassName(
        "estimateAutomaticallyOpt"
      );
  
      // Convert HTMLCollection to array or use a for loop to iterate
      Array.from(allEstimateAutomaticallyDivs).forEach((div) => {
        div.style.display = "none";
      });

      document.getElementById("nodes").disabled = false;
    }
  };
  
  function updateValue(value) {
    let displayValue;
    if (value >= 1024) {
      // Convert to TB without decimal
      displayValue = Math.floor(value / 1024) + " TB";
    } else {
      // Keep in GB without decimal
      displayValue = value + " GB";
    }
    document.getElementById("sliderValue").textContent = displayValue;
  }
  
  function updateCompressionValue(value) {
    // Display the current slider value (rounded to two decimal places)
    document.getElementById("compressionValue").textContent =
      parseFloat(value).toFixed(2);
  }
  
  function updateMetadataValue(value) {
    // Display the current slider value (rounded to two decimal places)
    document.getElementById("metadataValue").textContent =
      parseFloat(value).toFixed(2);
  }
  
  function updateEventPerSecondValue(value) {
    const numValue = parseInt(value, 10);
  
    let label = numValue;
  
    // Convert value to 'K' (thousands) or 'M' (millions)
    if (numValue >= 1000000) {
      label = (numValue / 1000000).toFixed(2) + " M";
    } else if (numValue >= 1000) {
      label = (numValue / 1000).toFixed(2) + " K";
    }
  
    // Display the formatted value
    document.getElementById("eventPerSecondValue").textContent = label;
  }
  
  function updateAverageSizeValue(value) {
    // Update the label with the slider value in bytes
    document.getElementById("averageSizeValue").textContent = `${value} bytes`;
  }
  
  function updateRetentionLabel(value) {
    const slider = document.getElementById("hot");
    const days = parseInt(value, 10); // Convert value to integer
    let label;

    // Dynamically adjust the step attribute based on the current value
    if (days <= 60) {
        slider.step = 1; // 0-60 days, step = 1 day
        label = `${days} days`;
    } else if (days <= 1080) { // 1080 days = 36 months (3 years)
        slider.step = 30; // 2 to 36 months, step = 30 days (1 month)
        const months = Math.floor((days - 60) / 30) + 2; // Start from 2 months
        label = `${months} months`;
    } else {
        slider.step = 365; // 3 to 7 years, step = 365 days (1 year)
        const years = Math.floor((days - 1080) / 365) + 3; // Start from 3 years
        label = `${years} years`;
    }

    // Update the label with the appropriate time unit
    document.getElementById("retentionLabel").textContent = label;
}

  
  function updateRetentionLabel2(value) {
    const slider = document.getElementById("cold");
    const days = parseInt(value, 10); // Convert value to integer
    let label;

    // Dynamically adjust the step attribute based on the current value
    if (days <= 60) {
        slider.step = 1; // 0-60 days, step = 1 day
        label = `${days} days`;
    } else if (days <= 1080) { // 1080 days = 36 months (3 years)
        slider.step = 30; // 2 to 36 months, step = 30 days (1 month)
        const months = Math.floor((days - 60) / 30) + 2; // Start from 2 months
        label = `${months} months`;
    } else {
        slider.step = 365; // 3 to 7 years, step = 365 days (1 year)
        const years = Math.floor((days - 1080) / 365) + 3; // Start from 3 years
        label = `${years} years`;
    }

    // Update the label with the appropriate time unit
    document.getElementById("retentionLabel2").textContent = label;
  }
  
  function updateRetentionLabel3(value) {
    const slider = document.getElementById("archived");
    const days = parseInt(value, 10); // Convert value to integer
    let label;

    // Dynamically adjust the step attribute based on the current value
    if (days <= 60) {
        slider.step = 1; // 0-60 days, step = 1 day
        label = `${days} days`;
    } else if (days <= 1080) { // 1080 days = 36 months (3 years)
        slider.step = 30; // 2 to 36 months, step = 30 days (1 month)
        const months = Math.floor((days - 60) / 30) + 2; // Start from 2 months
        label = `${months} months`;
    } else {
        slider.step = 365; // 3 to 7 years, step = 365 days (1 year)
        const years = Math.floor((days - 1080) / 365) + 3; // Start from 3 years
        label = `${years} years`;
    }

    // Update the label with the appropriate time unit
    document.getElementById("retentionLabel3").textContent = label;
  }
  
  function updateMaxVolumeLabel(value) {
    const gbValue = parseInt(value, 10); // Convert the value to integer
    document.getElementById("maxVolumeLabel").textContent = `${gbValue} GB`;
  }
  
  function updateNodesAndReplication(nodesValue) {
    // Update nodes label
    document.getElementById("nodesLabel").textContent = `${nodesValue} node(s)`;
  
    // Update replication factor max value based on nodes input
    const replicationInput = document.getElementById("replication");
    if(replicationInput == null){
      return;
    }
    const maxReplication = nodesValue > 10 ? 10 : nodesValue;
    replicationInput.max = maxReplication;
  
    // If current replication value is greater than the new max, reset to max
    if (replicationInput.value > maxReplication) {
      replicationInput.value = maxReplication;
    }
  
    // Update replication label accordingly
    updateReplicationAndSearchability(replicationInput.value);
  }
  
  function updateReplicationAndSearchability(replicationValue) {
    // Update replication factor label
    if(document.getElementById("replicationLabel") == null){
      return;
    }
    
    document.getElementById("replicationLabel").textContent = replicationValue;
  
    // Update searchability factor max value based on replication factor input
    const searchabilityInput = document.getElementById("searchability");
    if(searchabilityInput == null){
      return;
    }
    searchabilityInput.max = replicationValue;
  
    // If current searchability value is greater than the new max, reset to max
    if (searchabilityInput.value > replicationValue) {
      searchabilityInput.value = replicationValue;
    }
  
    // Update searchability label accordingly
    updateSearchabilityLabel(searchabilityInput.value);
  }
  
  function updateSearchabilityLabel(searchabilityValue) {
    if(document.getElementById("searchabilityLabel") == null){
      return;
    }
    
    document.getElementById("searchabilityLabel").textContent =
      searchabilityValue;
  }
  
  const handleMakeDivDsableAccrodingToUseCase = (e) => {
    e.preventDefault();
    // console.log("090hhhhhh", e.target.value);
    if (e.target.value == "security") {
      let input1 = document.getElementById("maxVolume");
      if(input1 == null){
        return;
      }
      let label1 = document.getElementById("maxVolumeLabel");
      if(label1 == null){
        return;
      }
      input1.value = 100;
      label1.textContent = "100 GB";
      input1.disabled = true;
  
      let input2 = document.getElementById("nodes");
      if(input2 == null){
        return;
      }
      let label2 = document.getElementById("nodesLabel");
      if(label2 == null){
        return;
      }
      input2.value = 2;
      label2.textContent = "2 node(s)";
      input2.disabled = true;
    } else if (e.target.value == "vmware") {
      let div = document.getElementById("maxVolume");
      if(div == null){
        return;
      }
      let label = document.getElementById("maxVolumeLabel");
      if(label == null){
        return;
      }
      div.value = 260;
      label.textContent = "260 GB";
      div.disabled = true;
  
      let input2 = document.getElementById("nodes");
      if(input2 == null){
        return;
      }
      let label2 = document.getElementById("nodesLabel");
      if(label2 == null){
        return;
      }
      input2.value = 1;
      label2.textContent = "1 node(s)";
      input2.disabled = true;
    } else if (e.target.value == "intelligence") {
      let div = document.getElementById("maxVolume");
      if(div == null){
        return;
      }
      let label = document.getElementById("maxVolumeLabel");
      if(label == null){
        return;
      }
      div.value = 20;
      label.textContent = "200 GB";
      div.disabled = true;
  
      let input2 = document.getElementById("nodes");
      if(input2 == null){
        return;
      }
      let label2 = document.getElementById("nodesLabel");
      if(label2 == null){
        return;
      }
      input2.value = 1;
      label2.textContent = "1 node(s)";
      input2.disabled = true;
    } else {
      let div = document.getElementById("maxVolume");
      if(div == null){
        return;
      }
      div.disabled = false;
  
      let input2 = document.getElementById("nodes");
      if(input2 == null){
        return;
      }
      input2.disabled = false;
    }
  };
  
  ///////////////////////////////////////// MAIN FORM HANDLE FUNCTION ///////////////////////////////
  const handleSplunkStorageForm = (e) => {
    e.preventDefault();
    let form = document.getElementById("splunk-storage-calculator-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    let maxVolInput = document.getElementById("maxVolume");
    if(maxVolInput == null){
      return;
    }
    formDataJSON["maxVolume"] = maxVolInput.value;
    let nodesInput = document.getElementById("nodes");
    if(nodesInput == null){
      return;
    }
    formDataJSON["nodes"] = nodesInput.value;
  
    splunkCalculator(formDataJSON);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  
  document.addEventListener("DOMContentLoaded", () => {
    let allView2Divs = document.getElementsByClassName("view2");
  
    // Convert HTMLCollection to array or use a for loop to iterate
    Array.from(allView2Divs).forEach((div) => {
      div.style.display = "none";
    });
  
    let allClusterReplicationDivs = document.getElementsByClassName(
      "clusterReplicationOpt"
    );
  
    // Convert HTMLCollection to array or use a for loop to iterate
    Array.from(allClusterReplicationDivs).forEach((div) => {
      div.style.display = "none";
    });
  
    let allEstimateAutomaticallyDivs = document.getElementsByClassName(
      "estimateAutomaticallyOpt"
    );
  
    // Convert HTMLCollection to array or use a for loop to iterate
    Array.from(allEstimateAutomaticallyDivs).forEach((div) => {
      div.style.display = "none";
    });
  
    const inputContainer = document.getElementById("estimateAutomaticallyOpt");
    if(inputContainer == null){
      return;
    }
    inputContainer.addEventListener("input", (event) => {
      if (event.target.tagName === "INPUT") {
        handleMakeDivDsableAccrodingToUseCase(event);
      }
    });
  
    const inputContainer2 = document.getElementById(
      "splunk-storage-calculator-form"
    );

    if(inputContainer2 == null){
      return;
    }
  
    inputContainer2.addEventListener("input", (event) => {
      if (event.target.tagName === "INPUT") {
        handleSplunkStorageForm(event);
      }
    });
  
    handleSplunkStorageForm(event);
  });
  


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  VIDEO STORAGE CALCULATOR ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const videoStorageMainFunction = () => {

const rangeInput = document.getElementById("rangeInput");
if(rangeInput == null){
  return
}
const label = document.getElementById("label");
if(label == null){
  return
}

const updateLabel = (value) => {
  switch (value) {
    case "1":
      label.textContent = "Low";
      break;
    case "2":
      label.textContent = "Medium";
      break;
    case "3":
      label.textContent = "High";
      break;
  }
};

// Update the label initially based on the default value
updateLabel(rangeInput.value);

// Add event listener to update the label when the range input changes
rangeInput.addEventListener("input", function () {
  updateLabel(this.value);
});

      
// Data mappings
const resolutionData = {
    0: "720P HD",
    20: "1080P HD",
    40: "1.3MP",
    60: "3MP",
    80: "5MP",
    100: "10MP",
  };
  const resolutionQualityData = {
    0: { low: 40, medium: 80, high: 120 },
    20: { low: 70, medium: 120, high: 180 },
    40: { low: 100, medium: 170, high: 250 },
    60: { low: 125, medium: 210, high: 320 },
    80: { low: 150, medium: 250, high: 400 },
    100: { low: 300, medium: 500, high: 900 },
  };
  const videoQualityData = {
    1: "Low",
    2: "Medium",
    3: "High",
  };
  
  function findKeyByValue(data, value) {
    for (const key in data) {
      if (data[key] === value) {
        return { [key]: value }; // Return the whole object
      }
    }
    return null; // Return null if the value is not found
  }
  
  function findValueByKey(data, key) {
    if (data.hasOwnProperty(key)) {
      return { [key]: data[key] }; // Return the value associated with the key
    }
    return null; // Return null if the key is not found
  }
  
  function videoStorageCalculator(showError, formDataJSON) {
    // Initial state values
    let resolutionValue = findKeyByValue(
      resolutionData,
      formDataJSON["resolution"]
    );
    let videoQualityValue = findValueByKey(
      videoQualityData,
      formDataJSON["videoQuality"]
    );

    
    let compressionTypeValue = formDataJSON["compressionType"];
    let averageFrameSize;
  
    let NC = parseFloat(formDataJSON["numberOfCameras"]);
    let FPS = parseFloat(formDataJSON["framesPerSecond"]);
    let Hrs = parseFloat(formDataJSON["hoursPerDay"]);
    let NoD = parseFloat(formDataJSON["numberOfDaysStored"]);
  
    // Update functions for values
    function onNCValue(value) {
      NC = value;
    }
  
    function onFPSValue(value) {
      if (value > 30) {
        FPS = 30;
        return showError("Please enter value between 1 to 30");
      }
      FPS = value;
    }
  
    function onHrsValue(value) {
      if (value > 24) {
        Hrs = 24;
        return showError("Please enter value between 1 to 24");
      }
      Hrs = value;
    }
  
    function onNoDValue(value) {
      NoD = value;
    }
  
    // Custom useEffect-like function to run logic when state changes
    function calculateAverageFrameSize() {
      // console.log("resolutionValue", Object.keys(resolutionValue)[0]);
      // console.log("videoQualityValue", Object.values(videoQualityValue)[0]);
  
      let totalFrameSize =
        resolutionQualityData[Object.keys(resolutionValue)[0]][
          Object.values(Object.values(videoQualityValue))[0].toLowerCase()
        ];
  
      if (compressionTypeValue === "H.264") {
        totalFrameSize = totalFrameSize / 5;
      } else if (compressionTypeValue === "H.265") {
        if (Object.values(videoQualityValue)[0].toLowerCase() === "low") {
          totalFrameSize = (totalFrameSize * 0.647) / 5;
        } else if (Object.values(videoQualityValue)[0].toLowerCase() === "medium") {
          totalFrameSize = (totalFrameSize * 0.518) / 5;
        } else if (Object.values(videoQualityValue)[0].toLowerCase() === "high") {
          totalFrameSize = (totalFrameSize * 0.495) / 5;
        }
      }
  
      averageFrameSize = totalFrameSize;
    }
  
    // Call calculation function when values change (simulating useEffect)
    calculateAverageFrameSize();
  
    // Final result calculation
    const result =
      ((averageFrameSize * FPS * NC * 60 * 60 * 24 * NoD) / 1000000 / 24) * Hrs;
  
    // console.log("Result:", result);
  
    return result;
  }
  
  // Example of how to call the function with an error handler
  function showError(message) {
    console.error(message);
  }
  
  const validateFormForVideoStorageCalc = (obj) => {
    let errors = {};
  
    // Iterate over each property in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if value is empty or not a number
        if (key === "resolution" || key === "compressionType") {
          continue;
        }
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          isNaN(value)
        ) {
          errors[key] = `The value for '${key}' is empty or not a number.`;
        }
        if (value < 0) {
          errors[key] = `The value for '${key}' is negative.`;
        }
      }
    }
  
    // Return the errors object
    return errors;
  };
  
  const handleVideoStorageCalculatorForm = (e) => {
    e.preventDefault();
    let form = document.getElementById("video-storage-calculator-form");
    if(form == null){
      return;
    }
    let formData = new FormData(form);
    let formDataJSON = {};
    for (let [key, val] of formData.entries()) {
      formDataJSON[key] = val;
    }
  
    let errorResult = validateFormForVideoStorageCalc(formDataJSON);
    if (Object.keys(errorResult).length > 0) {
      alert(Object.values(errorResult)[0]);
    } else {
      // console.log(formDataJSON);
      let result = videoStorageCalculator(showError, formDataJSON);
      let span = document.getElementById("video-storage-calculator-result");
      if(span == null){
        return;
      }
      if (result < 1) {
        span.textContent = (result * 1000).toFixed(2) + " MB";
      } else if (result >= 1000) {
        span.textContent = (result / 1000).toFixed(2) + " TB";
      } else {
        span.textContent = result.toFixed(2) + " GB";
      }
    }
  
  
  };
  
  document.addEventListener("DOMContentLoaded", (event) => {
      // console.log("7878");
      
      handleVideoStorageCalculatorForm(event);
      const inputContainer = document.getElementById(
        "video-storage-calculator-form"
      );
      if(inputContainer == null){
        return;
      }
  
      inputContainer.addEventListener("input", (event) => {
        if (event.target.tagName === "INPUT") {
          handleVideoStorageCalculatorForm(event);
        }
      });
    });
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

videoStorageMainFunction();
