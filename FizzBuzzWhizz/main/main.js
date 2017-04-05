'use strict';

const fizz = "Fizz";
const buzz = "Buzz";
const whizz = "Whizz";
const numberSize = 100;

function fizzBuzzWhizz(numbers) {
  if (validate(numbers, error => {
      console.log(error.toString());
    })) {
    for (let i = 1; i < numberSize; i++) {
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
    result = fizz;
  } else {
    if (num % first === 0) {
      result += fizz;
    }
    if (num % second === 0) {
      result += buzz;
    }
    if (num % third === 0) {
      result += whizz;
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
