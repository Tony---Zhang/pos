'use strict';

const fizz = "Fizz";
const buzz = "Buzz";
const whizz = "Whizz";
const numberSize = 100;

function fizzBuzzWhizz(numbers) {
  if (validate(numbers, error => {
      console.log("Invalidate number: " + error.toString());
    })) {
    let result;
    for (let i = 1; i < numberSize; i++) {
      result = "";
      if (i.toString().indexOf(numbers[0].toString()) >= 0) {
        result = fizz;
      } else {
        result = rul3And4(numbers[0], numbers[1], numbers[2], i);
      }
      console.log(result);
    }
  }
}

function validate(numbers, error) {
  for (let number of numbers) {
    if (!isPositiveInteger(number)) {
      error(number);
      return false;
    }
  }
  return true;
}

function rul3And4(firstNum, secondNum, thirdNum, num) {
  let result = "";
  if (num % firstNum === 0) {
    result += fizz;
  }
  if (num % secondNum === 0) {
    result += buzz;
  }
  if (num % thirdNum === 0) {
    result += whizz;
  }
  if (isEmpty(result)) {
    result = num.toString();
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

fizzBuzzWhizz([3, 5, 7]);
