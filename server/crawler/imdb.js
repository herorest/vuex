import rp from 'request-promise'
import cheerio from 'cheerio'
import R from 'ramda'
import {writeFileSync} from 'fs'
import agent from 'socks5-http-client/lib/Agent'

export const getIMDBCharacters = async () => {
    const options = {
        uri: 'http://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm#cast',
        // agentClass: Agent,
    	// agentOptions: {
        //     socksHost: 'localhost'
    	// 	socksPort: 9050
    	// },
        transform: body => cheerio.load(body)
    }
    let $ = await rp(options);
    let photos = [];

    $('table.cast_list tr.odd, tr.even').each(function(){
        let playedBy = $(this).find('td.itemprop span.itemprop')
        playedBy = playedBy.text()

        let nmId = $(this).find('td.itemprop a')
        nmId = nmId.attr('href')

        let character = $(this).find('td.character a').eq(0)

        let name = character.text()
        let chId = character.attr('href')

        const data = {
          playedBy,
          nmId,
          name,
          chId
        }

        photos.push(data)
    });
    console.log('photos:',photos.length);
    const fn = R.compose(
        R.map(photo => {
            const reg1 = /\name\/(.*?)\/\?ref/;
            const reg2 = /\character\/(.*?)\/\?ref/;
            const match1 = photo.nmId.match(reg1);
            const match2 = photo.chId.match(reg2);
            match1 && (photo.nmId = match1[1]);
            match2 && (photo.chId = match2[1]);

            return photo;
        }),
        R.filter(photo => photo.playedBy && photo.name && photo.nmId && photo.chId)
    )

    photos = fn(photos);
    console.log('release:',photos.length);

    writeFileSync('./imdb.json', JSON.stringify(photos,null,2),'utf8');

}

getIMDBCharacters();
