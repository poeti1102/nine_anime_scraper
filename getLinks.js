const cheerio = require("cheerio");
const request = require("request-promise");
var sleep = require("system-sleep");
const fs = require("fs");

var url = "https://www.9anime.to/az-list?page=";

var links = getLinks();
links.then((result) => {
  console.log(result)
})

async function getLinks() {
  try {
    let body = await request(url);
    let $ = cheerio.load(body);

    const pageCount = $(".total").html();
    let data = [];

    for (let i = 1; i <= 10; i++) {
      let body = await request(url + i);
      let $ = cheerio.load(body);
      $(".items .item .info").map((i, item) => {
          const $link = $(item).find("a");
          data.push($link.attr("href"));
        })
        
    }
    return data;
  } catch (e) {
    console.log("Error ".e);
  }
}