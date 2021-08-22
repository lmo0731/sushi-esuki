
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
const Location = (props) => {
  const { title, selected, children, style, itemId, onClick } = props
  const active = selected === itemId
  const visibility = useContext(VisibilityContext)
  const visibles = visibility.visibleItemsWithoutSeparators
  const last = parseInt(visibles[visibles.length - 1] || '0')
  const visible = itemId < last ? visibility.isItemVisible(itemId) : true
  const ref = useRef()
  useEffect(() => {
    if (active) {
      visibility.scrollToItem(ref.current)
    }
  }, [active])
  return (
    <div
      className={`location ${active ? 'active' : ''} ${visible ? 'visible' : 'hidden'}`}
      style={style}
      onClick={(item) => {
        onClick(visibility, item.target)
      }}
      ref={ref}
    >
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
  const { storage } = props
  const { sites: locations = [] } = storage || {}

  const [selected, setSelected] = useState(0)
  const [interval, setInterval] = useState()
  const router = useRouter()

  const onClick = (itemId) => (visibility) => {
    console.log('clicked Item ', itemId)
    if (selected === itemId) {
      router.push(`/home/${itemId}`)
    }
    setSelected(itemId)
  }
  const onScroll = (visibility) => {
    // const [first] = visibility.visibleItemsWithoutSeparators
    // const select = visibility.visibleItemsWithoutSeparators.reduce((v, ret) => {
    //   return ret || v === 'selected'
    // }, false)
    // if (select) {
    //   const d = parseInt(first)
    //   if (d !== selected) {
    //     console.log('selecting scroll', d, selected)
    //     setSelected(d)
    //   }
    // }
  }
  useEffect(() => {
    if (interval !== undefined) {
      console.log('clear', interval)
      clearTimeout(interval)
    }
    const timeout = setTimeout(() => {
      setSelected((selected + 1) % locations.length)
    }, 4000)
    setInterval(timeout)
  }, [selected])

  const [showChild, setShowChild] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) {
    return <div />
  }
  return (
    <div
      className='locations' style={{
        maxWidth: 600,
        width: '100%'
      }}
    >
      <ScrollMenu
        onWheel={onWheel}
        onScroll={onScroll}
      >
        {locations.map((location, i) => {
          return (
            <Location
              key={i} itemId={i} title={location.restaurantName} selected={selected}
              onClick={onClick(i)}
            >
              {location.addressLine1}<br />
              {location.addressLine2}
            </Location>
          )
        })}
      </ScrollMenu>
      <div className='location-pager'>
        {locations.map((locations, i) => {
          return (
            <div
              key={i} className={`location-page ${selected === i ? 'active' : ''} `} onClick={onClick(i)}
            />
          )
        })}
      </div>
    </div>
  )
}

function onWheel (apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext()
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev()
  }
}
