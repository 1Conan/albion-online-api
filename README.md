---
Just a basic API Library for Albion Online. (I do not play the game. I was supposed to write this as a task in r/slavelabour.)

PS: this is WIP. I won't work on this that much if anyone will ask.


---

# How To Use
---

# Functions

.getPlayerInfo

Parameter: Object

- playerName {String} - Player Username (Case-insensitive)

- playerId {String} - Player ID (Case-sensitive)

You only need one of each. If both parameters are passed, the ID will be used

```js
const albion = require('albion-online-api');

albion.getPlayerInfo({playerName: 'test0005'}).then(data => {
    console.log(data);
}).catch(console.error)
// [Object object]

albion.getPlayerInfo({playerName: 'test'}).then(data => {
    console.log(data);
}).catch(console.error)
// Player Not Found

albion.getPlayerInfo({playerId: 'pm1P1jF3TeyaSaeL1g0Seg'}).then(data => {
    console.log(data);
}).catch(console.error)
// [Object object]
```

.getGuildInfo

Parameter: Object

- guildName {String} - Guild Name (Case-insensitive)

- guildId {String} - Guild ID (Case-sensitive)

You only need one of each. If both parameters are passed, the ID will be used

```js
const albion = require('albion-online-api');

albion.getGuildInfo({guildName: 'Test 123'}).then(data => {
    console.log(data);
}).catch(console.error)
// [Object object]

albion.getGuildInfo({guildName: 'test'}).then(data => {
    console.log(data);
}).catch(console.error)
// Guild Not Found

albion.getGuildInfo({guildId: 'Pofs7UvDTvC2ODQH1yRGWA'}).then(data => {
    console.log(data);
}).catch(console.error)
// [Object object]
```

# Events
A VERY crappy implementation. I'm gonna fix this in the future.
```js
const albion = require('albion-online-api');

const Events = new albion.Events();

Events.on('event', (data) => {
    console.log(data) // [Object object]
})
Events.listen();
```

TODO:

- Add filtering options for the contructor

- Make it emit events that occured occurred after the module is loaded instead of emiting everything at start. (Should be easy. Just busy for now)
