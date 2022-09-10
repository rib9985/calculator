const add = function(a,b) {
    return a + b
  };
  
  const subtract = function(a,b) {
  return a - b
      
  };
  
  const sum = function(array) {
  return array.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  
  };
  
  const multiply = function(array) {
    
  return array.reduce((accumulate,nextItem) => 
  accumulate * nextItem)
  
  };
  
  const power = function(a,b) {
   return a ** b
      
  };
  
  const factorial = function(a) {
      const store = a
    total = 1
  for (let i = 1; i<=store; i++){
    total*=i
  }
  return total
  }