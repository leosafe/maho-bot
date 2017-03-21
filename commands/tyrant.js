var _ = require('underscore');
var fs = require('fs');


function tyrant() {
    self = this;

    this.main = function(e, msg, _global) {
        return new Promise((resolve, reject) => {
            let mpertry = 55832200;
            let rates = [
                {
                    lvl: 0, // level
                    u: 50, // upgrade
                    d: 100, // downgrade
                    b: 0 // boom
                },
                {
                    lvl: 1,
                    u: 50,
                    d: 50,
                    b: 0
                },
                {
                    lvl: 2,
                    u: 45,
                    d: 55,
                    b: 0
                },
                {
                    lvl: 3,
                    u: 40,
                    d: 60,
                    b: 0
                },
                {
                    lvl: 4,
                    u: 40,
                    d: 60,
                    b: 0
                },
                {
                    lvl: 5,
                    u: 40,
                    d: 58.2,
                    b: 1.8
                },
                {
                    lvl: 6,
                    u: 40,
                    d: 57,
                    b: 3
                },
                {
                    lvl: 7,
                    u: 40,
                    d: 55.8,
                    b: 4.2
                },
                {
                    lvl: 8,
                    u: 40,
                    d: 54,
                    b: 6
                },
                {
                    lvl: 9,
                    u: 37,
                    d: 53.5,
                    b: 9.5
                },
                {
                    lvl: 10,
                    u: 35,
                    d: 52,
                    b: 13
                },
                {
                    lvl: 11,
                    u: 35,
                    d: 48.7,
                    b: 16.3
                },
                {
                    lvl: 12,
                    u: 3,
                    d: 48.5,
                    b: 48.5
                },
                {
                    lvl: 13,
                    u: 2,
                    d: 49,
                    b: 49
                },
                {
                    lvl: 14,
                    u: 1,
                    d: 49.5,
                    b: 49.5
                }
            ]

            userID = e.author.id;
            playerObj = _global.tyrant.filter(function(i) { console.log(i); return i[userID]});

            if(!playerObj.length) {
                var key = userID;
                var obj = {};
                obj[key] = {
                    level:0,
                    mesos:0,
                    fails: 0,
                };
                _global.tyrant.push(obj);
            }
            playerObj = _global.tyrant.filter(function(i) { console.log(i); return i[userID]});

            if(msg == 'reset') {
                 playerObj[0][userID].level = 0;
                 playerObj[0][userID].mesos = 0;

                m  = "```python";
                m += '\n ' + e.author.username  + ", você resetou sua tyrant!";
                m += "\n ela está atualmente level " + playerObj[0][userID].level;
                m += '\n Digite "maho.tyrant enhance" para tentar a sorte';
            } else if(msg == 'enhance') {
                    m = '```python';
                    chances = Math.random() * 100;
                    if (chances < rates[playerObj[0][userID].level].u || playerObj[0][userID].fails == 2) {

                        playerObj[0][userID].level++;

                        playerObj[0][userID].fails = 0;

                        m += '\n Success!'
                        m += '\n Sua tyrant está atualmente com ' + playerObj[0][userID].level + ' stars';

                    } else if ((chances > rates[playerObj[0][userID].level].u && chances < (rates[playerObj[0][userID].level].u + rates[playerObj[0][userID].level].d)) || playerObj[0][userID].level == 0){
                        playerObj[0][userID].level = playerObj[0][userID].level == 0 ? playerObj[0][userID].level : playerObj[0][userID].level - 1;
                        playerObj[0][userID].fails++;
                        m += '\n Fail :('
                        m += '\n Sua tyrant está atualmente com ' + playerObj[0][userID].level + ' stars';
                        m = playerObj[0][userID].fails == 2 ? m + '\n CHANCE! Próximo upgrade com 100% de chance de sucesso :D' : m;
                    } else {
                        playerObj[0][userID].level = 0;
                        playerObj[0][userID].fails = 0;
                        m += '\n DESTROYED :(((('
                        m += '\n Sua tyrant voltou para 0 stars';
                    }

                    playerObj[0][userID].mesos += mpertry;
                    m+= '\n Total gasto em mesos: ' + playerObj[0][userID].mesos;
            } else {
                m  = "```python";
                m += "\n Olá, " + e.author.username  + " bem vindo ao Tyrant Star Simulator";
                m += "\n Sua tyrant está atualmente com " + playerObj[0][userID].level + " stars";
                m += '\n Digite "maho.tyrant enhance" para tentar a sorte';
                m += '\n Você também pode resetar para level 0 a sua tyrant usando "maho.tyrant reset"';
            }

            m += '```';

            e.channel.sendMessage(m);

        });
    }

    return this;
}

module.exports = tyrant;