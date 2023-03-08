import dotenv from "dotenv"
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

import {App} from '@slack/bolt';

const slackConfiguration = require('./package.json');


const app = new App({
    token:process.env.SLACK_BOT_TOKEN,
    appToken:"xapp-1-A04RS79BD8U-4876245731603-8445ffbfd8a7f3b8840ac9dcd2b7fc3a2683c05c567e0d288985861463c38b3b",
    signingSecret:"980de505c7388d26f6a1985adcdc7cfa",
    socketMode: true,
});
 

app.command('/gpt', async ({ command, ack, say }) => {
    await ack();
    console.log("Someone ask question!");
    const response = await askGpt(command.text);
    say(response);
});


const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const askGpt = async (userPrompt: string): Promise<string>=> {
    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        temperature: 0.6,
        frequency_penalty: 1.5,
        presence_penalty: 1.2,
        max_tokens: 4000,
        prompt: userPrompt,
        });
        return completion.data.choices[0].text ? completion.data.choices[0].text: 'Not working, SORRY!!!';
    }


(async ()=> {
    console.log('BOLT IS RUNING');
    await app.start(process.env.PORT || 3000);
})();
