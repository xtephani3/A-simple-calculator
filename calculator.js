const userInput = document.getElementById("user-input");
const calculatedInput = document.getElementById("calculated-input");
const button = document.querySelectorAll("button");


let inputs = []; 

const calculatorDisplay = () => {
  userInput.value = inputs.join('');
}


const insertNumber = (num) =>{
  const lastNumber = inputs[inputs.length-1];
  if(num === "." && lastNumber.includes(".")){
    return;
  }

  inputs.push(num);
  calculatorDisplay();

}


const insertSymbol = (symbol) =>{
  const lastInput = inputs[inputs.length-1];
  if(!lastInput || ["+", "-", "*", "/", "%"].includes(lastInput)){
    return;
  }

  inputs.push(symbol);
   calculatorDisplay();
}


const deleteLastInput =  () =>{
  inputs.pop();
  calculatorDisplay();
}


const clearAllInput = () =>{
  inputs = [];
  userInput.value = " ";
  calculatedInput.value = " ";
}




const calculate = () => {
  if (inputs.length === 0){
    return;
  }
  const expressionToCalculate = inputs.join('');
  const result = eval(expressionToCalculate);
  
  calculatedInput.value = result;
  userInput.value = expressionToCalculate;

  inputs = [result.toString()];
}




