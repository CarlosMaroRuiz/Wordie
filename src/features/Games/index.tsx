import { Outlet, useLocation } from 'react-router-dom'
import GamesHub from './components/GamesHub'

export default function GamesModule() {
  const location = useLocation()
  const isRoot = location.pathname === '/games' || location.pathname === '/games/'

  if (isRoot) {
    return <GamesHub />
  }

  return <Outlet />
}
