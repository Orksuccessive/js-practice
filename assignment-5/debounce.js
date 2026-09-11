
// Debounce


function debounce(fn, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}



// Throttle


function throttle(fn, delay) {

    let lastCall = 0;

    return function (...args) {

        const now = Date.now();

        if (now - lastCall >= delay) {

            lastCall = now;

            fn.apply(this, args);
        }
    };
}



// Debounce Demo


const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");
const searchResults = document.getElementById("searchResults");


async function searchUsers(query) {

    if (!query) {
        searchResults.innerHTML = "";
        searchStatus.textContent = "";
        return;
    }

    searchStatus.textContent = "Searching...";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );

        searchResults.innerHTML = "";

        filteredUsers.forEach(user => {

            const li = document.createElement("li");

            li.textContent = `${user.name} - ${user.email}`;

            searchResults.appendChild(li);
        });

        searchStatus.textContent =
            `${filteredUsers.length} user(s) found`;

    } catch (error) {

        searchStatus.textContent = "Error loading users";

        console.error(error);
    }
}


const debouncedSearch = debounce(searchUsers, 500);

searchInput.addEventListener("input", function (event) {

    debouncedSearch(event.target.value);

});



// Throttle Demo


const handleScroll = throttle(function () {

    console.log(
        "Scroll position:",
        window.scrollY
    );

}, 200);


window.addEventListener("scroll", handleScroll);