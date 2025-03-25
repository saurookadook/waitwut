---
title: 'Handling Asynchronous Operations'
date: '2025-03-07'
fullPath: '/notes/javascript/async'
iconComponentName: "javascript_icon"
sectionSlug: 'notes'
---

## Overview

- [Promises](#promises)
- [`async/await`](#asyncawait)
- [Long-running Tasks](#long-running-tasks)
- [Throttling and Debouncing](#throttling-and-debouncing)

### Promises

```javascript
function getMoviesByDirector(director) {
    return new Promise((resolve, reject) => {
        const foundMovies = getMoviesForDirector(director);

        setTimeout(() => {
            if (foundMovies.length > 0) {
                resolve(foundMovies);
            } else {
                reject('No movies found for that director.');
            }
        }, 2000);
    })
}

const directorArg = 'Joe Schmoe';

getMoviesByDirector(directorArg)
    .then((movies) => {
        console.log(`Found movies: ${movies}`);
        return movies.length;
    })
    .then((numOfMovies) => console.log(`Number of movies found: ${numOfMovies}`));
    .catch((reason) => console.error(`Error getting movies for ${directorArg}`, reason)); // <- will get called for rejected value from `getMoviesByDirector`

getMoviesByDirector(directorArg)
    .then((movies) => {
        console.log(`Found movies: ${movies}`);
        return movies.length;
    }, (reason) => { return 0; })
    .then((numOfMovies) => console.log(`Number of movies found: ${numOfMovies}`));
    .catch((reason) => console.error(`Error getting movies for ${directorArg}`, reason)); // <- no longer called for rejected value from `getMoviesByDirector`

getMoviesByDirector(directorArg)
    .then((movies) => {
        console.log(`Found movies: ${movies}`);
        throw new Error('AHHHHHH! :o');
        return movies.length;
    }, (reason) => { return 0; })
    .then((numOfMovies) => console.log(`Number of movies found: ${numOfMovies}`));
    .catch((reason) => console.error(`Error getting movies for ${directorArg}`, reason)); // <- will get called with thrown error from first `then` call
```

#### Arrays of Promises

```javascript
// Examples of a `Promise.all` helper without using `Promise.all`

function waitForAll(promises) {
    const results = [];
    let completed = 0;
    const rejected = null;

    for (let i = 0; i < promises.length; i++) {
        promises[i].then((res) => {
            results[i] = res;
            completed++;
            return res;
        }).catch((err) => {
            rejected = err;
            return err;
        })
    }

    return new Promise((resolve, reject) => {
        var checkIsDone = setInterval(() => {
            if (completed === promises.length) {
                clearInterval(checkIsDone);
                resolve(results);
            } else if (rejected != null) {
                clearInterval(checkIsDone);
                reject(rejected);
            }
        }, 0);
    });
}

function _waitForAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, i) => {
            promise.then((res) => {
                results[i] = res;
                completed++;

                if (completed === promises.length) {
                    resolve(results);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    })
}
```

---

### `async/await`

🚧 **WIP** 🚧

---

### Long-running Tasks

- can use `setTimeout` to break code up into smaller chunks to be run as individual tasks
- prevents main thread becoming unresponsive to user interactions

---

### Throttling and Debouncing

#### Throttling

- technique for preventing function/method from being called more than once every `X` milliseconds
- think of it as _"**slowing down a constant stream of events**"_
- basic throttle function
  - takes another function and time limit as arguments
  - returns function which first checks whether passed function has already run
  - if not, calls function and updates `lastRan` variable with current timestamp
  - if it already ran, clears existing timer and creates new timer for `<limit> - <time between now and when it was last run>`

```javascript
function throttle(fn, limit) {
    let timerId;
    let lastRan;

    return function(...args) {
        if (!lastRan) {
            fn.apply(this, args);
            lastRan = Date.now();
        } else {
            const now = Date.now();
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                if ((now - lastRan) >= limit) {
                    fn.apply(this, args);
                    lastRan = now;
                }
            }, limit - (now - lastRan));
        }
    }
}

const recalcLayout = () => {
    // recalculate something about the layout
};

window.addEventListener(
    'resize',
    throttle(recalcLayout, 200);
)
```

#### Debouncing

- technique to ensure that function/method is only called after a specified delay has occurred since function was last invoked
- if function called again before timer has expired, function is not invoked and timer restarted
- think of it as _"**waiting for stream of events to have stopped, then invoking function**"_

```javascript
function debounce(fn, delay) {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(
            () => fn.apply(this, args),
            delay
        );
    };
}

const lookahead = () => {
    // get lookahead data
};

input.addEventListener(
    'input',
    debounce(lookahead, 300)
);
```
