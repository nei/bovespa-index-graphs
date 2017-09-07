const fs = require('fs');
const async = require('async');
const request = require('request');
const _ = require('underscore');
const YahooPage = require('./YahooPage');
const bovespa = require("./index-composition.json");

// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
    console.log('collecting data for ' + task.code);

    request(task.url, function(err, res, body) {
        if (err) return done(err);
        if (res.statusCode != 200) return done(res.statusCode);

        let data = new YahooPage(body);

        callback(null, data);
    });
}, 2);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
    dumpToFile(bovespa);
};

function dumpToFile(data){
	fs.exists('data.json', function(exists){
    	if(exists){
        	console.log("yes file exists");
        }else{
	    	var json = JSON.stringify(transformData(data));
	        fs.writeFile('data.json', json, (err) => {
		  		if (err) throw err;
		  		console.log('The file has been saved!');
			});
        }
	});
}

fs.exists('data.json', function(exists){
	if (!exists) {
		// queue items
		var result = [];
		_.each(bovespa, function(item, i){
			item['url'] = 'https://br.financas.yahoo.com/quote/'+item.code+'.SA/profile?p='+item.code+'.SA'; 
			q.push(item, function(err, res){
				_.extend(bovespa[i], res);
			});
		});
	}else{
		console.log('data.json already exist.')
	}
});


function transformData(bovespa){

	_.each(bovespa, function(item,i){
		bovespa[i]['name'] = item.code;
    });

	var data = {
	  "name": "Ibovespa",
	  "children": []
	};

	var sectors = _.uniq(_.pluck(bovespa, 'sector'));

	_.each(sectors, function(sector){
		var item = {
		    "name": sector,
		    "children": []
		};

		item.children = _.filter(bovespa, function(stock){
			return sector == stock.sector; 
		});

		data.children.push(item);
	});

	return data;
}

