import R from 'ramda'
import {find} from 'lodash'
import {resolve} from 'path'
import {writeFileSync} from 'fs'

let characters = require(resolve(__dirname,'../../allCharacters.json'));
let imdbs = require(resolve(__dirname,'../../imdb.json'));

let findNameInAPI = (item) => {
    let c = find(characters,{
        name:item.name
    });
    return c
}

let findPlayedInAPI = (item) => {
    return find(characters,i => {
        return i.playedBy.includes(item.playedBy)
    })
}

let validData = R.filter(
    i => findNameInAPI(i) && findPlayedInAPI(i)
);

let IMDB = validData(imdbs)

writeFileSync('./checked.json', JSON.stringify(IMDB,null,2),'utf8');
