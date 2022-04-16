#!/usr/bin/env node
//Made by prince Kumar
//Date 15 apr 2022
//IMPORT all the requirements.. .
const axios = require('axios').default;
const prompt = require("prompt-sync")();
//Make a help function..
function help(){
	process.stdout.write("\033[33;1m Uses node app.js <oprion>\n");
	console.log(" node app.js -h or --help for help");
	console.log(" node app.js --url ");
}
//mask url
function maskurl(url,weburl,word="none"){
	let session = axios.create()
	session.get(`https://is.gd/create.php?format=json&url=${url}`)
	.then((res)=>{
		if(res.status == 200){
		urlid = res.data.shorturl.split("//");
			let id = urlid.pop();
			if(word == "none"){
				process.stdout.write("\033[35;1m Mask url: ");
				console.log(`${weburl}@${id}`);
			}
			else{
				process.stdout.write("\033[35;1m Mask url: ");
				console.log(`${weburl}-${word}@${id}`);
			}
}
	})

}
// Add site
function addsite(url){
	process.stdout.write("\033[32;1m Add a fake website like https://google.com or https://facebook.com\n");
	let weburl = prompt();
	if (validUrl(weburl)){
		console.log("Site added");
		process.stdout.write("\033[32;1m Add a fake Word like free-money or free-recharge without space.\n");
		let word = prompt();
		if(word.length === 0){
			maskurl(url,weburl)
		}
		else{
			maskurl(url,weburl,word);
		}
	

	}
}
//Make a function to check the valid url
function validUrl(url){
	let id1 = url.search("http://")
	let id2 = url.search("https://")
	if( id1 === 0 || id2 === 0 ){
	return true;
	}
	else{
		process.stdout.write("\033[31;1m Invalid url please use http or https \n");
	}

	
}
if(process.argv[2] === "-h" || process.argv[2] === "--help"){
	help()
}
else if(process.argv[2] === "--url"){
	//check for valid url...
	let burl = validUrl(process.argv[3])
	if (burl){
		addsite(process.argv[3])
	}
}
else{
	process.stdout.write("\033[31;1m Invalid argument\n");
	help()
}
