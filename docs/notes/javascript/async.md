---
title: 'Handling Asynchronous Operations'
date: '2025-03-07'
fullPath: '/notes/javascript/async'
iconComponentName: "javascript_icon"
sectionSlug: 'notes'
---

# Overview

- [Promises](#promises)

## Promises

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

---

## `async/await`


