import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  function handleSubmit() {

  }

  return (
    <div className="flex flex-col bg-neutral-900 h-screen items-center justify-center">
      <div className="flex w-72 md:w-8/12 lg:w-1/2 flex-col gap-y-8">
        <div className="text-teal-50 uppercase font-bold">
          <h1 className="text-3xl">Encurte seu link</h1>
        </div>

        <form className="flex flex-col items-center gap-y-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="https://www.mylongurl.com"
            className="h-12 rounded-md outline-none flex w-full px-4 bg-neutral-600 placeholder:text-neutral-400 text-neutral-200 text-lg transition-colors hover:bg-neutral-700"
          />

          <input
            type="submit"
            value="Encurtar"
            className="h-12 rounded-md outline-none w-full bg-teal-600 text-neutral-100 text-lg uppercase font-bold cursor-pointer hover:bg-teal-700 transition-colors"
          />
        </form>
      </div>

      <footer className="flex items-center justify-between mx-auto w-full max-w-[600px] mt-16 text-teal-50/50 text-lg">
        <p>&copy; 2022 Url Shortener</p>
          

        <ul className="flex gap-20">
          <li><a href="https:/github.com/ermesonqueiroz/url-shortener-web" target="_blank">GitHub</a></li>
          <li><a href="https:/github.com/ermesonqueiroz/url-shortener" target="_blanki">API</a></li>
        </ul>    
      </footer>
    </div>
  )
}

export default App
