import { useState } from 'react'
import api from '../utils/api'

export const useGame = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitGame = async (gameData) => {
    setLoading(true)
    try {
      const response = await api.post('/game/submit', gameData)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getStats = async () => {
    setLoading(true)
    try {
      const response = await api.get('/game/stats')
      setStats(response.data)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { stats, loading, error, submitGame, getStats }
}
