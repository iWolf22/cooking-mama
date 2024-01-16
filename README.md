# Cooking Mama - Hack The North 2023

---

## Inspiration
Everyone knows the agony of their painstaking home cooking going awry when just that one instruction in the recipe slips their mind. For the longest time, cooking up new recipes has continued to be fraught with challenges; from squinting at recipes on the phone screen to inadvertently burning a meal by cooking longer than intended, difficulties in the kitchen could arise at the drop of a hat. As people who are all too aware of this, we wanted to develop a tool at Hack the North 2023 that eliminates the inconveniences within the kitchen, making cooking comfortable and enjoyable for everyone.

---

## What it does
Cooking Mama is a virtual cooking assistant that utilizes OpenAI to guide anyone through their favourite online recipes. Even if the user is tackling an entirely novel recipe, our tool ensures ease of cooking by going through the cooking instructions and answering any questions that may come its way. From the required ingredients and clarification on certain instructions to the exact temperature a cake needs to be baked, Cooking Mama leaves no aspects of a recipe neglected and no doubts in anyone making use of its assistance.

![alt text](https://i.ibb.co/HBhz1Cq/gallery.jpg)

^ Website Front Page ^

![alt text](https://i.ibb.co/LtZ0Dmg/gallery-1.jpg)

^ Webscrapped and AI Interpreted Data ^

---

## How we built it
We built Cooking Mama mainly using Node.js. A web scraper was built using Cheerio and Puppeteer to get html elements from the links of online recipes. Using OpenAI, the collected information was processed to output cooking instructions. Additionally, we used Google's text-to-speech and built in Web Speech API for communication between the user and Cooking Mama.

---

## Challenges we ran into
Our lack of experience was our biggest challenge while creating this project for Hack the North 2023. Our determination to make this project a reality inspired us to use new tools and different frameworks that we had never even heard of before. While this meant that we were often stuck troubleshooting, in combination with the fact that our entire team was new to OpenAI, we used our resources to the best of our abilities and were able to create a project implementing this technology.

---

## Accomplishments that we're proud of
Although certain aspects could have been better implemented, we are proud to have stepped outside of our comfort zone and built a functional program using tools that we were not familiar with.

---

## What we learned
From our experience building Cooking Mama, we have learned to implement a variety of functionality and frameworks in our web application. Among these are OpenAI and text-to-speech, which are tools that we may incorporate into our future projects.

---

## What's next for Hottie Cooler
The future of Cooking Mama is a cooking assistance application that makes browsers obsolete. Our next step is to expand to mobile apps on phones. This would allow for users to use the communication features of the app in the background, even when their screens are turned off.

---

## Built With
 - cheerio
 - google-web-speech-api
 - html
 - css
 - javascript
 - bootstrap
 - node.js
 - express.js
 - openai
 - puppeteer

---

## Presentation

![alt text](https://i.ibb.co/4YV6QNG/project.jpg)

---

## Contributors

- Daniel Eskiocak <karad0012@wrdsb.ca>
- Jacob Bakker <jacalebak@gmail.com>
- Joshua Dierickse <joshua.dierickse@gmailcom>
- Peter Song <petersong1113@gmail.com>

---

## License & Copyright

- © Daniel Eskiocak, Laurel Heights Secondary School
- © Jacob Bakker, Waterloo Collegiate Institute
- © Joshua Dierickse, Waterloo Collegiate Institute
- © Peter Song, Laurel Heights Secondary School
