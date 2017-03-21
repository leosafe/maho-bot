var _ = require('underscore');
var fs = require('fs');


function help() {
    self = this;

    this.main = function(e, msg) {
        return new Promise((resolve, reject) => {
            msg = '```python';

            msg += '\n Commandos existentes: \n';
            msg += '\n 1. maho.help (Lista de commandos) "estável"';
            msg += '\n 2. maho.join (Entra no ch de voz do user) "estável"';
            msg += '\n 3. maho.leave (Sai do ch de voz do user) "estável"';
            msg += '\n 4. maho.ping (Commando de ping) "estável"';
            msg += '\n 5. maho.play (Procura, lista e executa uma musica) "WIP"';
            msg += '\n 6. maho.say (Commando de fala) "estável"';
            msg += '\n 7. maho.tyrant (Tyrant Star Simulator) "estável"';
            msg += '\n 8. maho.ursus (Alarme para o ursus 2x) "WIP"';
            msg += '```';

            e.channel.sendMessage(msg)
        });
    }

    return this;
}

module.exports = help;