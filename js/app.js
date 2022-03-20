let welcomeSec = document.getElementById("welcomeSec");
let mainSec = document.getElementById("mainSec");
let startCalcBtn = document.getElementById("startCalcBtn");
startCalcBtn.addEventListener("click", ()=> {
  if(welcomeSec.classList.contains("visible")) {
    welcomeSec.classList.remove("visible");
    welcomeSec.classList.add("hidden");
    mainSec.classList.remove("hidden");
    mainSec.classList.add("visible");
  } else {
    welcomeSec.classList.remove("hidden");
    welcomeSec.classList.add("visible");
    mainSec.classList.remove("visible");
    mainSec.classList.add("hidden");
  }
});

let subject_divs = document.querySelectorAll(".subject_divs");
let subject_divs_arr = [];

let total_marks = document.querySelectorAll(".total_marks");
let total_marks_arr = [];

let obtained_marks = document.querySelectorAll(".obtained_marks");
let obtained_marks_arr = [];

let credit_hours = document.querySelectorAll(".credit_hours");
let credit_hours_arr = [];

let allInputTags = document.querySelectorAll("input");
let allInputTags_arr = [];


let percentage_arr = [];
let percentage_GPA_arr = []; // Based on percentage i.e. 4 above 85% and 3.7 above 80% etc.
let subject_GPA_arr = []; // Percentage GPA multiplied by credit hours

let subjectGPASum = 0;
let creditHoursSum = 0;

let finalGPA = 0;
let finalGrade = "";


// Input validation
inputValidator(total_marks, 100, 0);
inputValidator(obtained_marks, 100, 0);
inputValidator(credit_hours, 3, 0);

// Main function that triggers when the user presses "Calculate" button
function mainFunction() {
  addElementsToArray(allInputTags, allInputTags_arr);
  // Checking if all the fields are filled
  let isCorrect  = allInputTags_arr.every((element)=> {
    return element >= 1 && element != NaN;
  });

  if (isCorrect == true) { 
    addElementsToArray(subject_divs, subject_divs_arr);
    addElementsToArray(total_marks, total_marks_arr);
    addElementsToArray(obtained_marks, obtained_marks_arr);
    addElementsToArray(credit_hours, credit_hours_arr);
    total_marks_arr.forEach((Element, i) => {
      percentage_arr[i] = (obtained_marks_arr[i] * 100 / total_marks_arr[i]).toFixed(2);
      percentage_GPA_arr[i] = percentageGPAReturn(percentage_arr[i]);
      subject_GPA_arr[i] = percentage_GPA_arr[i] * credit_hours_arr[i];
      
      subjectGPASum += subject_GPA_arr[i];
      creditHoursSum += credit_hours_arr[i];
    });
    finalGPA = (subjectGPASum / creditHoursSum).toFixed(2);
    finalGrade = gradeReturn(finalGPA);
    document.getElementById("resultArea").innerHTML = `<button id="calculate" onclick="mainFunction()">Calculate</button><div id="resultDiv">Your GPA is <span id="displayGPA">${finalGPA}</span> and your Grade is <span id="displayGrade">${finalGrade}</span></div>`;
  } else {
    alert("Please Enter values in all fields");
  }
  console.log(allInputTags_arr);
}


// Additional Functions

// Input validator function
function inputValidator(target_array, max_val, min_val) {
  target_array.forEach((Element, index)=> {
    Element.addEventListener("change", ()=> {
      if(parseInt(Element.value) > max_val) {
        alert(`Maximum value is ${max_val}`);
        Element.value = max_val;
      } else if(parseInt(Element.value) < min_val) {
        alert(`Minimum value is ${min_val}`);
        Element.value = min_val;
      }
    });
    
    Element.addEventListener("keyup", ()=> {
      if(parseInt(Element.value) > max_val) {
        alert(`Maximum value is ${max_val}`);
        Element.value = max_val;
      } else if(parseInt(Element.value) < min_val) {
        alert(`Minimum value is ${min_val}`);
        Element.value = min_val;
      }
    });
  });
}

// Takes elements from nodeList given by querySelectorAll and adds them to corresponding array in the form of numbers.
function addElementsToArray(nodeList, returningArray) {
  for(let i = 0; i <= nodeList.length - 1; i++) {
    returningArray[i] = parseInt(nodeList[i].value);
  }
  return returningArray;
}

// Takes percentage as input and returns GPA
function percentageGPAReturn(per) {
  if (per >= 85) {
    return 4;
  } else if (per >= 80) {
    return 3.7;
  } else if (per >= 75) {
    return 3.3;
  } else if (per >= 70) {
    return 3;
  } else if (per >= 65) {
    return 2.7;
  } else if (per >= 61) {
    return 2.3;
  } else if (per >= 58) {
    return 2;
  } else if (per >= 55) {
    return 1.7;
  } else if (per >= 50) {
    return 1;
  } else {
    return 0;
  }
}

// Takes finalGPA as input and returns finalGrade
function gradeReturn(GPA) {
  if (GPA == 4) {
    return "A";
  } else if (GPA >= 3.7) {
    return "A-";
  } else if (GPA >= 3.3) {
    return "B+";
  } else if (GPA >= 3) {
    return "B";
  } else if (GPA >= 2.7) {
    return "B-";
  } else if (GPA >= 2.3) {
    return "C+";
  } else if (GPA >= 2) {
    return "C";
  } else if (GPA >= 1.7) {
    return "C-";
  } else if (GPA >= 1) {
    return "D";
  } else {
    return "F";
  }
}
