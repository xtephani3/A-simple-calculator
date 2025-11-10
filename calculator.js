const userInput = document.getElementById("user-input");
const calculatedInput = document.getElementById("calculated-input");



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


const toggleSign = () => {
  if (inputs.length === 0) return;
  inputs = transformExpression(inputs);

  for (let i = 0; i < inputs.length; i++) {
    if (!isNaN(inputs[i])) {
      inputs[i] = (Number(inputs[i]) * -1).toString();
    }
  }

  calculatorDisplay();
}




const operators =["+", "-","*","%" ,"/" ];

const transformExpression =(expressionList) =>{
  const transformed =[];
  let setIndex = 0;

  if( expressionList[ expressionList.length -1] == "%") {  // to fix issues with percentage
    expressionList[ expressionList.length -1] = "/";      // to fix issues with percentage
   expressionList[ expressionList.length] = "100";        //to fix issues with percentage
}

  expressionList.forEach((expressionItem)=>{
    if(!transformed[setIndex]){
      transformed[setIndex] = "";
    }
    const isOperator = operators.includes(expressionItem);
    if(!isOperator){
      transformed[setIndex] = transformed[setIndex] + expressionItem;
    }else{
      setIndex++;
      transformed[setIndex] = expressionItem;
      setIndex++;
    }
    
  });
  
  console.log(transformed);
  return transformed;
  
}



const reduceExpression =(transformed) =>{
  let reduced =0;
  let activeOperator = null;
  transformed.forEach((item)=>{
    const isOperator = operators.includes(item);
    if(isOperator){
      activeOperator =item;
    }else{
      const numberItem =Number(item);
      console.log('the item', item);
      switch(activeOperator){
        case "+":
        reduced = reduced+ numberItem;
        break;
        case "-":
        reduced = reduced-numberItem;
        break;
        case "/":
        reduced = reduced/ numberItem;
        break;
        case "*":
        reduced = reduced * numberItem;
        break;
        case "%":
        reduced = reduced/100 * numberItem;
        break;
        default:
        reduced = numberItem;
        
      }
      activeOperator = null;
    }
  });
   return reduced;
}



const calculate = () => {
  if (inputs.length === 0){
    return;
  }
  const transformedExpression = transformExpression(inputs);
  const reducedExpression = reduceExpression(transformedExpression);
  calculatedInput.value = reducedExpression;
}





