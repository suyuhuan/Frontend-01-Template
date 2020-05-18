function match(string) {
    for (let c of string) {
        if (c == "a") {
            return true;
        }
        return false;
    }
}
console.log(match("I am groot"));


function match(string) {
    let foundA = false;
    for(let c of string) {
        if (c == "a") 
            foundA = true;
        else if (foundA && c == "b")
            return true;
        else
           foundA = false;
    }
    return false;
}
console.log(match("I acbm groot"));


function match(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;

    for(let c of string) {
        if (c == "a") 
            foundA = true;
        else if (foundA && c == "b")
            return foundB = true;
        else if (foundB && c == "c")
            return foundC = true;
        else if (foundC && c == "d")
            return foundD = true;
        else if (foundD && c == "e")
            return foundE = true;
        else if (foundE && c == "f")
            return true;
        else
           foundA = false;
           foundB = false;
           foundC = false;
           foundD = false;
           foundE = false;
    }
    return false;
}
console.log(match("I abm groot"));



function match(string) {
    let state = start;
    for(let c of string) {
        console.log(c);
        state = state(c);
    }
    return state === encodeURIComponent;
}
function start(c) {
    if (c === "a") {
        return foundA;
    }else{
        return start;
    }
}
function end(c) {
    return end;
}
function foundA(c) {
    if (c === "b") {
        return foundB;
    }else {
        return start(c);
    }
}
function foundB(c) {
    if (c === "c") {
        return end;
    }else {
        return start(c);
    }
}
function foundC(c) {
    if (c === "d") {
        return foundD;
    }else {
        return start(c);
    }
}
function foundD(c) {
    if (c === "e") {
        return foundE;
    } else {
        return start(c);
    }
}

function foundE(c) {
    if (c === "f") {
        return end;
    } else {
        return start(c);
    }
}
console.log(match("aabc"));



function match(string) {
    let state = start;
    for(let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === "a") {
        return foundA;
    } else {
        return start;
    }
}
function end(c) {
    return end;
}

function foundA(c) {
    if (c === "b") {
        return foundB;
    }else {
        return start;
    }
}
function foundB(c) {
    if (c === "c") {
        return foundC;
    }else {
        return start;
    }
}
function foundC(c) {
    if (c === "a") {
        return foundA2;
    }else {
        return start;
    }
}
function foundA2(c) {
    if (c === "b") {
        return foundB2;
    } else {
        return start;
    }
}

function foundB2(c) {
    if (c === "x") {
        return end;
    } else if(c === "c") {
        return foundC;
    } else {
        return start;
    }
}
console.log(match("abcabcabx"));





function match(string) {
    let state = start;
    for(let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === "a") {
        return foundA;
    } else {
        return start;
    }
}
function end(c) {
    return end;
}

function foundA(c) {
    if (c === "b") {
        return foundB;
    }else {
        return start(c);
    }
}
function foundB(c) {
    if (c === "c") {
        return foundC;
    }else {
        return start(c);
    }
}
function foundC(c) {
    if (c === "a") {
        return foundA2;
    }else {
        return start(c);
    }
}
function foundA2(c) {
    if (c === "b") {
        return foundB2;
    } else {
        return start(c);
    }
}

function foundB2(c) {
    if (c === "x") {
        return end;
    } else {
        return foundB(c);
    }
}
console.log(match("abcabcabx"));