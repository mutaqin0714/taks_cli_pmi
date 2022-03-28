const sum = ({ numbers }) => {
  const sum = numbers.reduce((acc, curr) => curr + acc, 0);
  console.log(sum);
};

const divide = ({ numbers }) => {
  const divide = numbers.reduce((acc, curr) => {
    if(acc > curr) {
      return acc / curr
    } else {
      return curr / acc
    }
    
  }, 1);
  console.log(divide);
};

const multiply = ({ numbers }) => {
  const multiply = numbers.reduce((acc, curr) => {
    return (curr * acc)
  }, 1);
  console.log(multiply);
};

const substract = ({ numbers }) => {
  const substract = numbers.reduce((acc, curr) => {
    if(acc > curr) {
      return acc - curr
    } else {
      return curr - acc
    }
  }, 0);
  console.log(substract);
};

module.exports = {
  sum,
  divide,
  multiply,
  substract,
};
