function sumOfSquares (num1, num2, num3) {
  if (typeof num1 === 'number' && typeof num2 === 'number' && typeof num3 === 'number' ){
    return num1 ** 2 + num2 ** 2 + num3 ** 2
  } else {
    throw 'TypeError: Arguments should be number.';
  }
}

// console.log(sumOfSquares(5, 3, 10));



function sayHelloTo (firstName, lastName, title) {
  if (typeof firstName === 'string' && typeof lastName === 'string' && typeof title === 'string') {
    console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
  } else if (typeof firstName === 'string' && typeof lastName === 'string') {
    console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
  } else if (typeof firstName === 'string') {
    console.log('Hello, ' + firstName);
  } else {
    throw 'ValueError: No inputs given.';
  }
}

// sayHelloTo(); // throws
// sayHelloTo("Phil"); // logs: Hello, Phil!
// sayHelloTo("Phil", "Barresi"); //logs: Hello, Phil Barresi. I hope you are having a good day!
// sayHelloTo("Phil", "Barresi", "Mr."); // logs: Hello, Mr. Phil Barresi! Have a good evening!



function cupsOfCoffee (howManyCups) {
  if (typeof howManyCups !== 'number') throw "TypeError: argument should be number."
  const tailing = '1 cup of coffee on the desk! 1 cup of coffee!\nPick it up, drink the cup, no more coffee left on the desk!';
  let mainBody = '';
  for (let i = howManyCups; i > 1; i--){
    mainBody +=
      `${i} cup of coffee on the desk! ${i} cup of coffee!\nPick one up, drink the cup, ${i - 1} cup of coffee on the desk!\n\n`;
  }
  return mainBody + tailing
}

// console.log(cupsOfCoffee(5));



function occurrencesOfSubstring(fullString, substring) {
  let count = 0;
  let sliced = '';
  for (let i = 0; i < fullString.length; i++) {
    sliced = fullString.slice(i, i + substring.length);
    if (sliced === substring) count++;
  }
  return count
}

// console.log(occurrencesOfSubstring("hello world", "o"));
// console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));



// cite: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function randomizeSentences (paragraph) {
  if (typeof paragraph !== 'string') throw 'TypeError: argument need to be string.'
  let preStartIndex = 0;
  let arr = [];
  let curChar = '';
  for (let i = 0; i < paragraph.length; i++){
    curChar = paragraph[i];
    if ( curChar === '!' || curChar === '.' || curChar === '?') {
      arr = arr.concat([paragraph.slice(preStartIndex, i+1)]);
      preStartIndex = i + 2; // skip one space
    }
  }
  return shuffleArray(arr).join(' ')
}

// let paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
// console.log(randomizeSentences(paragraph));