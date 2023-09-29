import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

function App() {
  const [url, setUrl] = useState()
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [shortenSuccessMessage, setShortenSuccessMessage] = useState('none')
  const [shortenFailMessage, setShortenFailMessage] = useState('none')
  const [copiedSuccessMessage, setCopiedSuccessMessage] = useState('none')
  
  function showCopiedSuccessMessage() {
    setCopiedSuccessMessage('block')

    setTimeout(() => setCopiedSuccessMessage('none'), 2000)
  }

  function showShortenFailMessage() {
    setShortenFailMessage('block')

    setTimeout(() => setShortenFailMessage('none'), 2000)
  }

  const shortenUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      )
      const data = await response.json()
      setShortenedUrl(data.result.full_short_link)
      setShortenSuccessMessage('')
    } catch (e) {
      showShortenFailMessage()
    }
  }


  return (
    <div className='container h-screen flex shrink justify-center m-auto items-center'>
      <div className='text-center border-gray-400 rounded-md border-2 p-2'>
        <h1 className='text-sky-300 text-3xl p-5'>URL Shortener</h1>
        
        <form onSubmit={shortenUrl}>
          <input className='outline-none border-2 m-2 border-blue-500 rounded-md p-2' type='text' placeholder='Enter URL' value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
          <button className='bg-emerald-300 text-white font-semibold p-2 rounded-md'>Shorten URL</button>
        </form>

        <div className='p-2' style={{display: shortenSuccessMessage}}>
          <span class='p-2 border-sky-500 border-2 m-2 rounded-md'>{shortenedUrl}</span>
          <CopyToClipboard text={shortenedUrl}>
            <button className='bg-blue-500 text-white font-semibold p-2 rounded-md' onClick={() => showCopiedSuccessMessage()}>Copy to 📋</button>
          </CopyToClipboard>
          <span style={{display: copiedSuccessMessage}} class=' border-emerald-500 border-2 mt-2 rounded-md bg-emerald-200 bg-opacity-25'>Successfully copied!</span>
        </div>

        <span style={{display: shortenFailMessage}} class='border-red-500 border-2 mt-2 rounded-md bg-red-200 bg-opacity-25'>Invalid URL.</span>

      </div>
    </div>
  )
}

export default App

setTimeout(() => {
  this.useState({
    copiedSuccessMessage: 'none'
  })
}, 2000)
