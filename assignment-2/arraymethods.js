//1)From an array of numbers, get the sum of squares of even numbers.

const numbers = [1,2,3,4,5,6,7,8];
const sum = numbers.filter(num=>num%2===0).map(num=>num*num).reduce((sum,num)=>sum+num,0);
console.log(sum);

console.log("______________________________");

//2)From an array of user objects { name, age, city }, return an object grouping users by city.

const users = [
        { name: 'Om', age: 25, city: 'Nagpur' },
        { name: 'Rahul', age: 30, city: 'Mumbai' },
        { name: 'Sandesh', age: 35, city: 'Nagpur' },
        { name: 'Umesh', age: 40, city: 'Nashik' }
    ];

    const groupedUsers = users.reduce((groups,user)=>{
        if(!groups[user.city]){
            groups[user.city] = [];
        }
        groups[user.city].push(user);
        return groups;
    },{});

    console.log(groupedUsers);
    

    //3)Flatten a deeply nested array without using .flat(Infinity) (write it yourself with recursion).

    const nestedArray = [1,[2, 3],[4, [5, 6]],[[7, 8], 9]];

    function flatternArray(array){
        return array.reduce((result,item)=>{
            if(Array.isArray(item)){
                return result.concat(flatternArray(item));
            }else{
                return result.concat(item);
            }
        },[]);
    }
    const result = flatternArray(nestedArray);
    console.log(result);

    //4)Given two arrays, return the intersection.

    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];
    const intersection = array1.filter(num=>array2.includes(num));
    console.log(intersection);

    //5)Given an array of transactions { amount, type: "credit" | "debit" }, compute the running balance.

    const transactions = [
        { amount: 100, type: "credit" },
        { amount: 50, type: "debit" },
        { amount: 200, type: "credit" },
        { amount: 75, type: "debit" }
    ];

    const runningBalence = transactions.reduce((balence,transaction)=>{
        if(transaction.type === "credit"){
            return balence + transaction.amount;
        }else{
            return balence - transaction.amount;
        }
    },0);
    console.log(runningBalence);