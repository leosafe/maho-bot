var _ = require('underscore');
var fs = require('fs');


function join() {
    self = this;

    this.main = function(e, m, _global) {
        return new Promise((resolve, reject) => {
            msg  = '```python';

            if(m == 'on') {
                _global.ursus = true,
                msg += '\n Você ativou o alarme para o ursus 2x';
                msg += '\n Ele ocorre diariamente às 5PM (BRT - São Paulo)';
                msg += '\n Escreva "maho.ursus off" para desativar';
            } else if (m == 'off') {
                _global.ursus = false;
                msg += '\n Você desativou o alarme para o ursus 2x';
                msg += '\n Ele ocorre diariamente às 5PM (BRT - São Paulo)';
                msg += '\n Escreva "maho.ursus on" para ativar o alarme';
            } else {
                msg += '\n O alarme para ursus 2x está atualmente';
                msg =  _global.ursus ? msg + ' "on"' : msg + ' "off"';
                msg += '\n Ele ocorre diariamente às 5PM (BRT - São Paulo)';
                msg = _global.ursus ? msg + '\n Escreva "maho.ursus off" para desativar' : msg + '\n Escreva "maho.ursus on" para ativa-lo';
            }

            msg += '```';

            e.channel.sendMessage(msg)
        });
    }

    return this;
}

module.exports = join;