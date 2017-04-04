var _ = require('underscore');
var fs = require('fs');


function tyrant() {
    self = this;

    this.enhance = function(rates, player, mpertry) {
        m = '```python';
        chances = Math.random() * 100;
        if (chances < rates[player.level].u || player.fails == 2) {

            player.level++;

            player.fails = 0;

            m += '\n Success!'
            m += '\n Sua tyrant está atualmente com ' + player.level + ' stars';

        } else if ((chances > rates[player.level].u && chances < (rates[player.level].u + rates[player.level].d)) || player.level == 0){
            player.level = player.level == 0 ? player.level : player.level - 1;
            player.fails++;
            m += '\n Fail :('
            m += '\n Sua tyrant está atualmente com ' + player.level + ' stars';
            m = player.fails == 2 ? m + '\n CHANCE! Próximo upgrade com 100% de chance de sucesso :D' : m;
        } else {
            player.level = 0;
            player.fails = 0;
            m += '\n DESTROYED :(((('
            m += '\n Sua tyrant voltou para 0 stars';
        }

        player.mesos += mpertry;
        m+= '\n Total gasto em mesos: ' + player.mesos;

        return m;
    };

    this.reset = function(rates, player, mpertry, username) {
        m = '```python';
        player.level = 0;
        player.mesos = 0;

        m += '\n ' + username  + ", você resetou sua tyrant!";
        m += "\n Ela está atualmente level " + player.level;
        m += '\n Digite "maho.tyrant enhance" para tentar a sorte';

        return m;
    };
    
    this.greetings = function(username, player) {
        m  = "```python";
        m += "\n Olá, " + username  + " bem vindo ao Tyrant Star Simulator";
        m += "\n Sua tyrant está atualmente com " + player.level + " stars";
        m += '\n Digite "maho.tyrant enhance" para tentar a sorte';
        m += '\n Você pode resetar para level 0 a sua tyrant \n usando "maho.tyrant reset"';
    };

    this.main = function(e, msg, _global) {
        return new Promise((resolve, reject) => {
            let mpertry = 55832200;
            let rates = require ('../rates.json');
            let userID = e.author.id;
            let playerObj = _global.tyrant.filter(function(i) { return i[userID]});

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

            playerObj = _global.tyrant.filter(function(i) { return i[userID]});

            if(msg && typeof(self[msg]) == 'function') {
                let m = self[msg](rates, playerObj[0][userID], mpertry, e.author.username);
            } else {
                let m = self.greetings(e.author.username, playerObj[0][userID]);
            }
            
            m += '```';

            e.channel.sendMessage(m);

        });
    };

    return this;
}

module.exports = tyrant;