const puppeteer = require('puppeteer');
const userAgent = require('user-agents');
// const mongoose = require('mongoose');
const fs = require('fs');



// mongoose.connect('mongodb+srv://user:user@cluster0.vlq5z.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=> console.log('DB Connected'));

// mongoose.connection.on('error', err => [
//   console.log(`DB connection error: ${err.message}`)
// ]);

// const schema = mongoose.Schema({
//             title: String,
//             experience: String,
//             url: String,
//           });
        
// const Model = mongoose.model("model", schema, "MyCollection");



async function fetchResumeList(params, pageNumber, link) {
    // let params = {
    //     title: 'javascript',
    //     experience: 'between3And6'
    //   }
      
      
    let paramsURL = `?isDefaultArea=true&exp_period=all_time&logic=normal&pos=full_text&fromSearchLine=true&clusters=True&specialization=1&ored_clusters=True&order_by=relevance&experience=${params.experience}&st=resumeSearch&text=${params.title}`;
    let pageNum = pageNumber ? pageNumber : 0;
    let url = link ? link : `https://hh.ru/search/resume${paramsURL}&page=${pageNum}`;

    const browser = await puppeteer.launch({ 
        headless: false, // false: enables one to view the Chrome instance in action
        defaultViewport: null, // (optional) useful only in non-headless mode
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await page.waitForSelector('div.resume-search-item');
    let result = await page.evaluate(() => {
        // counts total number of resumes
        let totalSearchResults = Array.from(document.querySelectorAll('div.resume-search-item')).length;

        let resumeList = [];

        for (let i = 1; i < totalSearchResults - 1; i++) {
            let candidate = {
                title: '',
                url: '',
                experience: '',
            };

            let resumeNode = document.querySelectorAll('.resume-serps .resume-search-item')[i];

            let titleText = resumeNode.querySelector('a.resume-search-item__name');
            candidate.title = titleText ? titleText.innerText : '';
            
            let rawUrl = resumeNode.querySelector('a.resume-search-item__name');
            candidate.url = rawUrl ? rawUrl.href : '';
            
            let experienceData = resumeNode.querySelector('div[data-qa="resume-serp__resume-excpirience-sum"]');
            candidate.experience = experienceData ? experienceData.innerText : '';
            

            resumeList.push(candidate);

        }

        
        // let doc1 = new Model({});
        
        // doc1.insertMany(resumeList, function(err, doc) {
        //   if (err) return console.error(err);
        //   console.log("Document inserted succussfully!");
        // });
        console.log(resumeList);
        return resumeList;
    });
    // Model.insertMany(result, function(err, doc) {
    //       if (err) return console.error(err);
    //       console.log("Document inserted succussfully!");
    //     });
    
    const data = JSON.stringify(result, null, 4);
    fs.writeFile('resumes.json', '', function(){console.log('cleared')});
    fs.writeFile('resumes.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    // browser.close();
}

module.exports.fetchResumeList = fetchResumeList;


// fetchResumeList(url);