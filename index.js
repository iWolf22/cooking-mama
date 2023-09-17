const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { load } = require('cheerio');

var body = {
	ingredients: "",
	instructions: ""
};
var computerResponseList = [];
var humanResponeList = [];
var summary = "";
var ingredients = "";
var instructions = "";

const config = new Configuration({
	apiKey: "",
});
const openai = new OpenAIApi(config);

const app = express();
app.use(express.static('public'))
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    let data = {
        recipeName: "null",
		userInput: "false"
    }
    res.render("index.ejs", data);
});


app.post("/submit", async (req, res) => {

	// Web scraper
	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 900,
			height: 900,
		}
		});
	
	const page = await browser.newPage();
	await page.goto(req.body["inputtedRecipe"]);
	
	await page.screenshot({ path: "public/image.png"});
	
		const pageData = await page.evaluate(() => {
	return {
		html: document.documentElement.innerHTML,
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	}
	})

	const $ = load(pageData.html);

	const headings = $("h2, h3").get();

	for (const _heading of headings) {
	const heading = $(_heading).text();
		if (heading.includes("Ingredients") || heading.includes("ingredients")) {
				const parentBody = $(_heading).parent();
				//console.log($(parentBody).text());
				body.ingredients = $(parentBody).text();
		}
		if (heading.includes("Instructions") || heading.includes("instructions") || heading.includes("Preparation")) {
				const parentBody = $(_heading).parent();
				body.instructions = $(parentBody).text();
				//add instructions and everything into array together before feeding to openAI
		}
	}

	//console.log("Ingredients: " + body.ingredients + " Instructions: " + body.instructions);
	await browser.close();

	// Chat GPT

	
    var prompt = `
    Complete the following three tasks:
	First, create an eloquent 200 word summary describing the food that is being prepared.
	Second, create a comprehensive list of all the ingredients involved in preparing the food.
	Third, create a through step by step guide on how to prepare the food.
	Add the character $ after every list item.
	Number each list item.
	Return the response in the following parsable JSON format:

    {
        "First": "create an eloquent 200 word summary describing the food that is being prepared",
        "Second": "create a comprehensive list of all the ingredients involved in preparing the food",
		"Third": "create a through step by step guide on how to prepare the food"
    }

	Create the 3 responses based on the data below: 
	Ingredients - ` + body.ingredients + `
	Instructions - ` + body.instructions + `
	`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });

    const parsableJSONresponse = response.data.choices[0].text;
    const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log(parsedResponse)

    console.log("First: ", parsedResponse.First);
    console.log("Second: ", parsedResponse.Second);
	console.log("Third: ", parsedResponse.Third);

	var ing = parsedResponse.Second;
	var temp = "";
	var ing_list = [];
	for (var i = 0; i < ing.length - 1; i++) {
		if (ing[i] === "$") {
			ing_list.push(temp);
			temp = "";
		}
		else {
			temp = temp + ing[i];
		}
	}

	var ins = parsedResponse.Third;
	var temp = "";
	var ins_list = [];
	for (var i = 0; i < ins.length - 1; i++) {
		if (ins[i] === "$") {
			ins_list.push(temp);
			temp = "";
		}
		else {
			temp = temp + ins[i];
		}
	}

	summary = parsedResponse.First;
	ingredients = ing_list;
	instructions = ins_list;

	// Sending info to front end, req.body["inputtedRecipe"]
	let data = {
		userInput: "true",
		summary: summary,
		ingredients: ingredients,
		instructions: instructions,
		computerResponseList: computerResponseList,
		humanResponeList: humanResponeList
	}
	res.render("index.ejs", data)


});

app.post("/text", async (req, res) => {

	var prompt = `
    Answer the question about cooking: ` + req.body["inputtedSpeech"] + `
	Given the recipe ingredients: ` + body.ingredients + `
	And given the recipe instructions: ` + body.instructions;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });

    var computerResponse = response.data.choices[0].text;
	computerResponseList.push(computerResponse);

	humanResponeList.push(req.body["inputtedSpeech"]);

	console.log(humanResponeList);
	console.log(computerResponseList);

	let data = {
		userInput: "true",
		summary: summary,
		ingredients: ingredients,
		instructions: instructions,
		computerResponseList: computerResponseList,
		humanResponeList: humanResponeList
	}

	res.render("index.ejs", data);

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});