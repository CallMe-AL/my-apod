const ApodExp = ({ activeApod }) => {

  if (!activeApod) {
    return (
      <div className="info-div-cont">
        <p>Click "info" on any image to display it's information here!</p>
      </div>
    )
  }
  return (
    <div className="info-div-cont">
      <h2 className="__title">{activeApod.title}</h2>
      <p className="__explanation">{activeApod.explanation}</p>
      {activeApod.copyright && <p className="__copyright"><span>Copyright: </span>{activeApod.copyright}</p>}
      <a href={activeApod.url} className="__url">Click to open image in window</a>
    </div>
  )
}

export default ApodExp
