const { create } = require('rung-sdk');
const {  String: Text } = require('rung-sdk/dist/types');
const TrackingCorreios = require('tracking-correios');
const { map } = require('ramda');

function createAlert(track) {
    return `${track.nome} ${track.numero} com status "${track.evento[0].descricao}" em ${track.evento[0].data} às ${track.evento[0].hora} na cidade de ${track.evento[0].cidade}/${track.evento[0].uf}`
}

function main(context, done) {
    const { item } = context.params;

    return TrackingCorreios
        .track(`${item}`)
        .then(( body ) => {
            done(map(createAlert, body));
        })
        .catch((e) => done([e]));
    
}

const params = {
    item: {
        description: 'Informe o código de rastreamento (EX AA123456789BR):',
        type: Text,
        default: ''
    }
};

const app = create(main, { params });

module.exports = app;