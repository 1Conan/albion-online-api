/**
 * Albion Online API
 * Copyright (c) 1Conan
 */

const request = require('snekfetch');
const EventEmitter = require('events');

const baseUrl = `https://gameinfo.albiononline.com/api/gameinfo`;
class Events extends EventEmitter {
  constructor(options = {}) {
    super()
    this.processed = []
    this.url = `${baseUrl}/events?limit=50&offset=0`
  }
  listen() {
    request.get(this.url).then((res) => {
      const data = res.body;

      data.forEach((item) => {

        if(this.processed.indexOf(item.EventId) > -1) return;
        if(this.processed.length > 500) this.processed = this.processed.slice(250)

        this.processed.push(item.EventId);
        this.emit('event', item);
      });
      
      setTimeout(() => {this.listen()}, 2 * 1000);
    })
  }
}


module.exports.Events = Events;
/**
 * @name getPlayerInfo
 * @param search {object} - playerId {string} | playerName {string}
 * @return {object}
 */
module.exports.getPlayerInfo = function(search = {}) {
  return new Promise((resolve, reject) => {
    if(search.playerId !== undefined) {

      request.get(`${baseUrl}/players/${search.playerId}`).then((res) => {
        console.log(res.body);
      }).catch((e) => reject(e))

    } 

    else if (search.playerName !== undefined) {
      request.get(`${baseUrl}/search?q=${search.playerName}`).then((res) => {
        const data = res.body;

        if(data.players.length < 1) reject('Player Not Found');

        for(let i = 0; i < data.players.length; i++) {

          const item = data.players[i];

          if(item.Name.toLowerCase() === search.playerName.toLowerCase()) {

            request.get(`${baseUrl}/players/${item.Id}`).then((res) => {
              console.log(res.body);
            }).catch((e) => reject(e))

          } else if((i+1) === data.players.length) reject('Player Not Found')

        }

      }).catch((e) => reject(e))

    } 

    else {
      reject('Invalid Options!');
    }
  })
}

/**
 * @name getGuildInfo
 * @param search {object} - guildId {string} | guildName {string}
 * @return {object}
 */
module.exports.getGuildInfo = function(search = {}) {
  return new Promise((resolve, reject) => {
    if(search.guildId !== undefined) {

      request.get(`${baseUrl}/guilds/${search.guildId}`).then((res) => {
        console.log(res.body);
      }).catch((e) => reject(e))

    } 

    else if (search.guildName !== undefined) {
      request.get(`${baseUrl}/search?q=${search.guildName}`).then((res) => {
        const data = res.body;

        if(data.guilds.length < 1) reject('Guild Not Found');

        for(let i = 0; i < data.guilds.length; i++) {

          const item = data.guilds[i];

          if(item.Name.toLowerCase() === search.guildName.toLowerCase()) {

            request.get(`${baseUrl}/guilds/${item.Id}`).then((res) => {
              console.log(res.body);
            }).catch((e) => reject(e))

          } else if((i+1) === data.guilds.length) reject('Guild Not Found')

        }

      }).catch((e) => reject(e))

    } 

    else {
      reject('Invalid Options!');
    }
  })
}