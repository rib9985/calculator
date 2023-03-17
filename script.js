let operator = ''
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let mustResetScreen = false


const numberButtons = document.querySelectorAll('.btn')
const operatorButtons = document.querySelectorAll('.operator')
const clearButton = document.getElementById('clear')
const evaluateButton = document.getElementById('evaluate')
const lastOperationScreen = document.getElementById('previousScreen')
const currentOperationScreen = document.getElementById('mainScreen')
const operatorScreen = document.getElementById('operatorScreen')
const deleteButton = document.getElementById('delete')
const decimalButton = document.getElementById('decimal')

numberButtons.forEach((button) => button.addEventListener('click', ()=> addNumberToScreen(button.textContent) )
)

operatorButtons.forEach((button) => button.addEventListener('click', ()=> 
setOperator(button.textContent)
))

evaluateButton.addEventListener ('click', () => determineOperation(operator, true))

clearButton.addEventListener ('click', ()=> resetAllParameters())

deleteButton.addEventListener('click', ()=> removeNumberFromScreen())

decimalButton.addEventListener('click', () => addNumberToScreen("."))

function resetAllParameters () {
    currentOperation = null
    operator = ''
    mainScreen.textContent= ''
    previousScreen.textContent=""
    operatorScreen.textContent=''
}
    
function removeNumberFromScreen(){
  let length = currentOperationScreen.textContent.length
  let newString = currentOperationScreen.textContent.slice(0, length -1)
  return currentOperationScreen.textContent = newString
}    


function addNumberToScreen (number){
    if (currentOperationScreen.textContent === 'ERR'){
        previousScreen.textContent = ''
        currentOperation = null
        operator = ''}
    
    if (currentOperationScreen.textContent === '0' || mustResetScreen){
        resetScreen()
        }
        
    currentOperationScreen.textContent += number
}



function setOperator(op){
    return (operator = op) && determineOperation(operator, false)
}


function determineOperation(op, equal){
    if (currentOperation !== (""||null)){
        evaluate(op)
      }
    
    
    if (equal === true){
    updateLastOperationScreen('=')}
    else{
    updateLastOperationScreen(op)
    }
    
    storeOperand()
  
    currentOperation = `${firstOperand}`
    


}

function storeOperand(){
    firstOperand = currentOperationScreen.textContent
}

function updateLastOperationScreen(op){
  if (op =='='){
    lastOperationScreen.textContent = `${firstOperand} ${operator} ${secondOperand}`
    operatorScreen.textContent = op
  }
  else{
    lastOperationScreen.textContent = currentOperationScreen.textContent
    operatorScreen.textContent = operator}
  mustResetScreen = true
}

function resetScreen(){
    mainScreen.textContent=""
    mustResetScreen = false
}

function evaluate(operator){

    if (currentOperation === null || mustResetScreen){return}
    
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = `${operate(firstOperand, operator, secondOperand)}`    
    previousScreen.textContent = currentOperationScreen.textContent
}


function operate(firstOperand, operator, secondOperand){
    
    a = Number(firstOperand)
    b = Number(secondOperand)
    if (operator === "+"){
    return add(a,b)
    }
    else if (operator === "-"){
    return subtract(a,b)
    }
    else if (operator === "x"){
        return multiply(a,b)
    }
    else if (operator === "/"){
        if (b === 0 || null || undefined)
            return 'ERR'
        else    
            return divide(a,b).toFixed(5)
    }
    else
    return 'ERR' 
}






const add = function(a,b) {
    return a + b
  };
  
const subtract = function(a,b) {
  return a - b
      
  };
  

const multiply = function(a,b) {
    
  return a*b
  
  };

const divide = function (a,b){
    return a/b
  }

const sum = function(array) {
    return array.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    };




