//1) Implement a sleep(ms) function using promises.

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
}

const promise = sleep(3000);

setTimeout(() => {
    console.log("After 3 seconds:", promise);
}, 3000);

async function testSleep(){
    console.log("Start");
    await sleep(2000);
    console.log("After 2 seconds")
}

testSleep();

//2)Implement a retry(fn, attempts) that retries an async function on failure.

async function retry(fn, attempts) {

    let lastError;

    for (let i = 1; i <= attempts; i++) {

        try {
            return await fn();
        } catch (error) {

            lastError = error;

            console.log(`Attempt ${i} failed`);

            if (i < attempts) {
                await sleep(1000);
            }
        }
    }

    throw lastError;
}

//3)Implement Promise.all from scratch.

function promiseAll(promises) {

    return new Promise((resolve, reject) => {

        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {

            Promise.resolve(promise)
                .then(result => {

                    results[index] = result;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

//4)Fetch data from https://jsonplaceholder.typicode.com/users, then for each user fetch their posts (/users/:id/posts). Do this in parallel using Promise.all and log a { user, posts } object for each.

async function fetchUsersWithPosts() {

    try {

       
        const usersResponse = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!usersResponse.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await usersResponse.json();

        
        const usersWithPosts = await Promise.all(

            users.map(async user => {

                const postsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
                );

                if (!postsResponse.ok) {
                    throw new Error(
                        `Failed to fetch posts for user ${user.id}`
                    );
                }

                const posts = await postsResponse.json();

                return {
                    user,
                    posts
                };
            })
        );

       
        usersWithPosts.forEach(result => {
            console.log(result);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

fetchUsersWithPosts();