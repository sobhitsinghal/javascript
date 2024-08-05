function sumOfTWoNumbers(a, b) {
    const sum = a + b;
    console.log("result is", sum);
    return sum;
}

const a = 12;
const b =  4;
const result = sumOfTwoNumbers(a, b);
console.log("returned result", result);
//
// do something else 
//
const c = 2;
const d = 24;
sumOfTwoNumbers(c, d);
//
// do something else
//
const e = 5;
const f = 14;
sumOfTwoNumbers(e,f);

const square = function square(num) {
    return num*num;
};

console.log(square);

console.log(square(4));