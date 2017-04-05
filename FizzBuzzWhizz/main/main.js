'use strict';

const Fizz_Text = "Fizz";
const Buzz_Text = "Buzz";
const Whizz_Text = "Whizz";
const Number_Size = 100;

function fizzBuzzWhizz(numbers) {
  if (validate(numbers, error => {
      console.log(error.toString());
    })) {
    for (let i = 1; i < Number_Size; i++) {
      console.log(parseNum(i, numbers[0], numbers[1], numbers[2]));
    }
  }
}

function validate(numbers, error) {
  if (numbers == null || numbers.length != 3) {
    error("Illegal arguments, need 3 positive number array");
    return false;
  }
  for (let number of numbers) {
    if (!isPositiveInteger(number)) {
      error("Invalidate number: " + number);
      return false;
    }
  }
  return true;
}

function parseNum(num, first, second, third) {
  let result = "";
  if (num.toString().indexOf(first.toString()) >= 0) {
    result = Fizz_Text;
  } else {
    if (num % first === 0) {
      result += Fizz_Text;
    }
    if (num % second === 0) {
      result += Buzz_Text;
    }
    if (num % third === 0) {
      result += Whizz_Text;
    }
    if (isEmpty(result)) {
      result = num.toString();
    }
  }
  return result;
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function isPositiveInteger(str) {
  let n = Math.floor(Number(str));
  return typeof str === 'number' && n === str && n >= 0;
}

fizzBuzzWhizz([3, 4, 5]);
