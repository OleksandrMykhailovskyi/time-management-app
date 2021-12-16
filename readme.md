## PROJECT DESCRIPTION

The “Productivity” application gives a tool for time-management based on the Pomodoro technique. User can use the app to create a task list, adding a short description and the estimated number of Pomodoros needed for the task. In addition, user can start, stop and reset the timer for your Productivity, short and long break, and in the settings, user can change the lengths of each period. The app has a reports page to facilitate of analyze previous user’s results.

## TECHNOLOGIES STACK

Within the application development the next technologies stack is used.
⦁	Node.js and NPM package manager;
⦁	Markup: HTML5, Handlebars template engine;
⦁	Styles: CSS3, LESS Preprocessor;
⦁	ES6 using Babel as a transpiler;
⦁	Modularity with ES6 import;
⦁	Highcharts – for data visualization;
⦁	Firebase – for data storage;
⦁	Base libs for some functionality allowed (datepicker, JQuery);
⦁	Module bundler – Webpack;

## FOLDERS OVERVIEW

`src` folder should contain all project's sources

`src/app` folder contains all components. All they are be splitted into a logical parts. Components folder contains common and reusable components.

All specific components are inside pages folder. For example - `app/pages/task-list/daily-list` etc.

`src/assets` folder contains assets of the application

- `less` folder contains all common styles and helpers

- `images` folder contains all images of the project

- `fonts` folder contains all custom fonts

`static` folder used for holding `*.html` files while building markup on first phase.

## STEPS TO INSTALL AND RUN DEVELOPMENT ENV
1. install Node.js from official site https://nodejs.org/
2. run terminal of your choice and make sure that you are in root of a project
3. run `npm install` - this will install all required packages
4. run `npm start` command - this will run server on http://localhost:3000 (to access HTML files from static folder use URL like http://localhost:3000/static/task-list.html)
5. you can run `npm run build` to see resulting structure in file system (helps with path to images etc.)