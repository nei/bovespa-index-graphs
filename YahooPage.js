'use strict';

const cheerio = require('cheerio')

class YahooPage {
	constructor(body) {
	    var $ = cheerio.load(body);
        this.sector = $('div.asset-profile-container > div > div > p > strong:nth-child(2)').text();
        this.industry = $('div.asset-profile-container > div > div > p > strong:nth-child(5)').text();
        this.price = $('#quote-header-info > div > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text();
    }
}

module.exports = YahooPage;