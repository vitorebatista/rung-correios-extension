## Rung ─ Correios extension

This is a demo extension to Rung showing how to be alerted when track a package changes status by Correios

### Test and develop

- Clone the project and `cd` to its directory
- Install the dependencies: `npm install` or `yarn`
- If you don't have `rung-cli`, install it globally by running `sudo npm install -g rung-cli`
- Modify the source providing your token and source id
- Run `rung run` to start the _Query Wizard_ via _CLI_

You'll get this screen and the result:

![](https://fat.gfycat.com/BlueBriskJerboa.gif)

Your result will be an array containing all the alerts that would be generated.

### Full source

```js
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
```