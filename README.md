# Concentration Game

Just a classic game of Concentration!

You can check the rules before you start for a refresher in the app. Once you start the game you'll choose how many Pairs you would like to play with. Then just flip two cards at a time, if they match then they disappear, if not they'll flip back over. Continue until you've matched all pairs and you win the game!

## It's Live!

Go [here](https://game-concentration.netlify.app/) to play the game for real and try to get the fastest time!

- Client-side is deployed to Netlify
- Server-side is deployed to Heroku

## Tech

Started by using the [Create-React-App](https://github.com/facebook/create-react-app).

This app is built using the MERN stack:

- MongoDB
  - To store the highest 10 scores (fastest times)
- Express
  - To simplify the server-side routing sitting on top of Node.js
- React
  - To build the front-end of the app and track the state of the game
- Node
  - To build the server, along with Express, and allow interactions with the database

**Additional**

- React Router
  - To create a seamless UI and navigation between views
- Framer Motion
  - To create awesome animations on each view as well as changing views

## Future Features

- Determine an algorithm to rank a **Top Score** not just by the time itself but taking into account the number of pairs the user played with. More pairs is more difficult and should outrank a similar time with less pairs.

- Integrate other card games.
  - Provide a **Main Menu** on startup where the user can choose a game to play
  - Have separate MongoDB collections to store each games high scores
  - Potentially for a game like _Blackjack_ or _Poker_ implement a 'betting system'
