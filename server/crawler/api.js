import rp from 'request-promise'
import _ from 'lodash'
import {writeFileSync} from 'fs'

let _allCharacters = []

let sleep = time => new Promise((resolve,reject) => setTimeout(function(){ if(true){return resolve()} else { return reject() } },time))

export const getAllCharacters = async (page = 1) => {
    console.log('get:' + page)
    var url = `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=20`
    var body = JSON.parse(await rp(url));

    _allCharacters = _.union(_allCharacters, body)

    console.log('have:' + _allCharacters.length);

    if (body.length < 20) {
        console.log('over');
        writeFileSync('./allCharacters.json', JSON.stringify(_allCharacters), 'utf8')
        return
    } else {
        await sleep(1000)
        console.log(page)
        page++
        getAllCharacters(page)
    }
}

getAllCharacters();
