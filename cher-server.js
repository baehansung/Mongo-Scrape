//This is just a test file to use "cheerio" to Scrape The New York Times' "The Daily"

var cheerio = require("cheerio");
var request = require("request");

// First, tell the console this file is doing
console.log("\n******************************************\n" +
            "Grabbing every episode of New York Times' podcast 'The Daily':" +
            "\n******************************************\n");

// Making a request for "The Daily"
request("https://www.nytimes.com/column/the-daily", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each div with the class "story-body" and loop through the results
  $("article.story.theme-summary").each(function(i, element) {

    // Save the text of the span class as "title"
    var title = $(element).find('h2').text();

    // Obtaining the link of the article which is the child of div.story-body
    var link = $(element).children().children().attr("href");

    // // // //Obtaining the summary of the article
    var summary = $(element).find("p.summary").text();

    var date = $(element).find('time.dateline').text();

    // Make an object with data we scraped for this h4 and push it to the results array
            results.push({
            title: title,
            link: link,
            summary: summary,
            date: date
        });

  });


    // // With cheerio, find each div with the class "story-body" and loop through the results
    // $("footer.story-footer").each(function(i, element) {
    
    //     // Obtaining the link of the article which is the child of div.story-body
    //     var link = $(element).children().attr("data-audio-url");
    
    //     // Make an object with data we scraped for this h4 and push it to the results array
    //             results.push({
    //             link: link,
    //         });
    
    //   });

//Unintentionally used The Daily's online web link instead of Podcast.. will use this request as a backup
// Making a request for "The Daily"
// request("https://www.nytimes.com/column/the-daily", function(error, response, html) {

//   // Load the body of the HTML into cheerio
//   var $ = cheerio.load(html);

//   // Empty array to save our scraped data
//   var results = [];

//   // With cheerio, find each div with the class "story-body" and loop through the results
//   $("div.story-body").each(function(i, element) {

//     // Save the text of the span class as "title"
//     var title = $(element).find('h2').text();

//     // Obtaining the link of the article which is the child of div.story-body
//     var link = $(element).children().attr("href");

//     // // // //Obtaining the summary of the article
//     var summary = $(element).find("p.summary").text();

//     // Make an object with data we scraped for this h4 and push it to the results array
//             results.push({
//             title: title,
//             link: link,
//             summary: summary
//         });

//   });


  // After looping through each h4.headline-link, log the results
  console.log(results);
});