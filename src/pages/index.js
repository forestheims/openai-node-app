import { Inter } from 'next/font/google'
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from 'react';
import process from 'process';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [response, setResponse] = useState("");
  const [responsePrompt, setResponsePrompt] = useState("");
  const [userInput, setUserInput] = useState("")

  
  const submitForm = async (e) => {
    e.preventDefault();
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    console.log('https://github.com/openai/openai-node/issues/6#issuecomment-1123176877');
    const openAi = new OpenAIApi(configuration);
    console.log(userInput);
    const completion = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "system", "content": "You are a helpful assistant."}, { role: 'user', content: userInput }],
    });
    setResponsePrompt(userInput);
    setResponse(completion.data.choices[0].message.content);
    setUserInput("");
  }

  return (
  <>
    <main className="flex min-h-screen flex-col items-center justify-start gap-20 p-24">
      <h1>simple openai node app</h1>
      <form onSubmit={(e) => submitForm(e)}>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex gap-40">
        <p className="fixed left-0 top-0 flex w-full items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by typing a prompt:&nbsp;
          <input type="text" className="font-mono font-bold p-2 rounded-full text-black" value={userInput} onChange={(e) => setUserInput(e.target.value)}></input>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <input type="submit"
            className="hover:bg-zinc-100 hover:underline cursor-pointer flex place-items-center gap-2 p-8 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >
          </input>
        </div>
      </div>
      </form>

      {response && <div className="relative flex flex-col gap-10 place-items-center">
        <p>
            Prompt:
        </p>
        <p>
            {responsePrompt}
            {userInput}
        </p>
        <p>
            Response:
        </p>
        <p>
            {response}
        </p>
      </div>}

    </main>
    <footer className='flex items-center justify-center gap-2 p-2'>created by{' '}<a className='hover:underline' href='https://github.com/forestheims' target='_blank'>forestheims</a></footer>
  </>
  )
}
