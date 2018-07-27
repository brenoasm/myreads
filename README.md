# MyReads Project

This is my project for Udacity React Nanodegree.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json
├── eslintrc.js # Eslint file. I'm using Airbnb style guide.
├── public├──
│   ├── favicon.ico
│   └── index.html
└── src
    ├── components
    │    ├── book # The component to render a book.
    │    ├── bookshelf # Has a style and render its children (The books in this case).
    │    ├── sellect # Render a select with the shelves avaliable.
    │    └── select-option # The option for the select.
    ├── utils
    │    ├── default.js # Here i put all the constants that I use for default values.
    │    └── shelves.js # Is the list os shelves avaliable in the project.
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── BooksAPI.js
    ├── icons
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css
    └── index.js
```

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
