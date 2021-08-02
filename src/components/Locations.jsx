
const Location = (props) => {
  const { title, active, children } = props
  return (
    <div className={`location ${active ? 'active' : ''}`}>
      <div className='location-title'>
        {title}
      </div>
      <div className='location-desc'>
        {children}
      </div>
    </div>
  )
}

export const Locations = (props) => {
  return (
    <div className='locations'>
      <div className='locations-content d-flex flex-row justify-content-end'>
        <Location active title='Ramen House'>
          {`Råsundavägen 126
169 50 Solna
Stockholm, Sweden `}
        </Location>
        <Location title='Ramen House'>
          {`Råsundavägen 126
169 50 Solna
Stockholm, Sweden `}
        </Location>
        <Location title='Ramen House'>
          {`Råsundavägen 126
169 50 Solna
Stockholm, Sweden `}
        </Location>
      </div>
    </div>
  )
}
