import React from 'react'

const Info = ({ apod }) => {
  return (
    <article className='info-container'>
      <h2 className="apod-about">About this image</h2>
      <p className='apod-explanation'>{apod?.explanation}</p>
      {apod.copyright && <p className='apod-copyright'><span>Copyright: </span>{apod.copyright}</p>}
      <a href={apod.url} target="_blank" rel="noreferrer noopener" className="apod-url">Open image in a new window</a>
    </article>
  )
}

export default Info