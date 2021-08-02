
import { useState, useEffect, useCallback } from 'react'
import Axios from 'axios'
import config from './config'

function getWindowDimensions () {
  if (window !== undefined) {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  } else {
    return {
      width: 0,
      height: 0
    }
  }
}

export function useWindowDimensions () {
  const [windowDimensions, setWindowDimensions] = useState({})

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())
    function handleResize () {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export function useAuth () {
  const [token] = useLocalStorage('token', '')
  const [user, setLoggedUser] = useState()
  const check = useCallback(async () => {
    try {
      const res = await Axios.get(`${config.PUBLIC_API_URL}/admin/check`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data && res.data.user) {
        setLoggedUser(res.data.user)
      }
      return res.data.user
    } catch (e) {
    }
    return false
  }, [token, setLoggedUser])

  useEffect(() => {
    check()
  }, [check])
  return user
}

// Hook
export function useLocalStorage (key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  }

  return [storedValue, setValue]
}
