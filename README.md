# tic-tac-toe

tic-tac-toe is a web application which can be used to play Tic Tac Toe against a bot. You must provide an email address to play.

## Local Development

To run the app locally:

    $ npm install
    $ npm run dev

To run tests:

    $ npm test

## Architecture

This application leverages React on the frontend and calls an API to fetch authorization tokens and game moves for the opponent from the backend.

Below is a diagram of the overall flow:

![](https://github.com/alicemliu/tic-tac-toe/blob/main/tictactoe_arch.png)

## Design & Setup

- I opted to use [Vite](https://vitejs.dev) to quickly set up a Typescript React project and development server. However, something more customizable like [webpack](https://webpack.js.org) might be needed for a production web app.

- I used [Material UI](https://mui.com/material-ui/) as a design framework, which includes some built in styles, accessibility support, and more.

- I initally implemented the game logic with `useState`, but I later refactored it to use `useReducer` instead. I believe `useReducer` is more appropriate because the state updates are more complex and interdependent (e.g. each time `board` changes, `currentPlayer` also changes). This approach also helps encapsulate some shared logic, such as adding a move and checking the board for a winner.

- I set up `mocha`, `sinon`, and `chai` to run, mock, and assert tests in combination with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Potential Improvements

- The algorithm used to check the board for a win can be better optimized. For instance, instead of checking the entire board, we can check only the rows, columns, or diagonals that include the most recent move. However,
because the server currently returns the entire board, we would still need to check all indices of the array to get the last move. To further optimize, we can also modify the API to return only the coordinates of the bot's next move.

- As currently implemented, the game displays a general error whenever `/engine` returns a non-2XX response. It would be nice to show more specific error messaging in the UI. For example, we might redirect the user to log in again if the token expired, display "Try again later" if the error is serverside, etc.

- I would add a "Log Out" button to clear the token from `sessionStorage`, which is important for general usability. It would also enable users to back log in with different emails and allow them to get out of an error state when the token expires.

- The provided [APIs](https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/api-docs/#/Game%20engine/post_engine) are hosted on both `dev` and `production` servers. It would be a best practice to configure separate environments to point to each of the corresponding servers.

- The unit tests are (very) incomplete. With more time, I would've liked to write tests for all components, but I added several empty `it()` blocks for a few of them, with sample descriptions of tests. It also wouldn't hurt to add integration and code coverage tests!
