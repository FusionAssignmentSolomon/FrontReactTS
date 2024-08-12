To run the project use the next command:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Simple UI using React and TS, Tried to make the best design but because of lack of time in the end just wrote code really fast.
The code can improved, first we can use HTTP protocol for player joining the game (I didn't implement it because lack of time).
The game itself should use websocket but only it.

There are some bugs and lack of some validation.
UI BUG:
- SUBMIT doens't work, need to use HTTP instaed of websocket. For now you can just click submit and then write name.

Validation:
- Didn't have time to prevent users not to play on opponent turn. So don't rush to play if it is not your turn (It will play for the opponent :) )
