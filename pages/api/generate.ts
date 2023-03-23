// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  let user_input = req.body.user_input;
  console.log(user_input);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: user_input,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: [" Human:", " AI:"]
  });
  response.data.choices.forEach((choice) => {
    // console.log(response.data);
    console.log(choice.text);
  });

  res.status(200).json({ result: response.data.choices[0].text });
  // res.status(200).json({ result: response.data.choices });
}

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  return `Suggest three names for an animal that is a superhero.
    Animal: Cat
    Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    Animal: Dog
    Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    Animal: ${capitalizedAnimal}
    Names:
  `;
}