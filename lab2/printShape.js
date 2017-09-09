function triangle(lines) {
    if (typeof lines !== "number") throw "TypeError: Input need to be number";
    if (lines <= 0 ) throw "ValueError: lines should be positive numnbers";

    for (let i = 1; i <= lines;  i++){
        middleLine =  i === lines ? "--" : "  ";
        line = " ".repeat(lines - i) + "/" + middleLine.repeat(i - 1) + "\\";
        console.log(line);
    }

}

function square(lines) {
    if (typeof lines !== "number") throw "TypeError: Input need to be number";
    if ( lines < 2) throw "ValueError: must provide at least 2 lines.";
    
    for (let i = 1; i <= lines; i++) {
        middleLine = (i === 1 || i === lines) ? "-".repeat(lines) : " ".repeat(lines);
        console.log("|" + middleLine + "|");
    }
}

function rhombus(lines) {
    if (typeof lines !== "number") throw "TypeError: Input need to be number";
    if ( lines < 2) throw "ValueError: must provide at least 2 lines.";
    if ( lines % 2 === 1) throw "ValueErrorL must provide an even number of lines.";

    for (let i = 1; i <= lines / 2; i++ ) {
        middleLine = i === 1 ? "-" : " ".repeat( 2 * i - 1);
        line = " ".repeat(lines/2 - i) + "/" + middleLine + "\\";
        console.log(line);
    }

    for (let i = 1; i <= lines / 2; i++) {
        middleLine = i === lines/2 ? "-" : " ".repeat( 2 * (lines/2 - i) + 1);
        line = " ".repeat(i - 1) + "\\" + middleLine + "/";
        console.log(line);
    }    

}

module.exports = {
    triangle,
    square,
    rhombus
}
