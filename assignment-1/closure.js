
//1) Create Counter 
function createCounter() {
    let count = 0;
    return{
        increment: () => count++,
        decrement: () => count--,
        getValue: () => count
    };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue());
counter.decrement();
console.log(counter.getValue());
console.log(counter.count);

console.log("______________________________")

//2) once(fn)


function once(fn){
    let called = false;
    let result;
    return function(...args){
        if(!called){
            called = true;
           result = fn(...args);
        }

        return result;
    };
}

function greet(name){
    console.log(`Hello ${name}`);
    return `Welcome ${name}`;
}

const oneHello = once(greet);
console.log(oneHello("Om"));
console.log(oneHello("Jay"));
console.log(oneHello("Vishal"));

console.log("______________________________")

//3) memoize(fn)
function memoize(fn){
    const cache = new Map();
    return function(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)){
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

function slowAdd(a,b){
    console.log("Calculating");
    return a + b;
}

const add = memoize(slowAdd);
console.log(add(2,2));
console.log(add(2,2));
console.log(add(2,2));
console.log(add(3,3));
console.log(add(5,6));
console.log(add(3,3));
console.log(add(3,3));

console.log("______________________________")

// 4) For loop closure trap

for(var i =0;i<5;i++){
    setTimeout(() => {
        console.log(i);
    }, 1000);
    
}


//Fix (1) by using let
for(let i =0;i<5;i++){
    setTimeout(() => {
        console.log("let:",i);
    }, 1000);
}

//Fix (2) by using IIFE
for(var i =0;i<5;i++){
    (function(i){
        setTimeout(() => {
            console.log("iife:",i);
        }, 1000);
    })(i);
}

//Fix (3) by using third argument
for(var i =0;i<5;i++){
    setTimeout((j) => {
        console.log("Third argument:",j);
    }, 1000, i);
}

