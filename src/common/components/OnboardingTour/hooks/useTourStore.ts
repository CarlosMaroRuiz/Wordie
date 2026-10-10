import { create } from 'zustand'
import { TOUR_SEEN_KEY } from '@common/layouts/MainLayout/tourSteps'

function readSeen() {
  try {
    return localStorage.getItem(TOUR_SEEN_KEY) === 'true'
  } catch {
    return false
  }
}

function persistSeen() {
  try {
    localStorage.setItem(TOUR_SEEN_KEY, 'true')
  } catch {
    return
  }
}

type TourState = {
  open: boolean
  seen: boolean
  start: () => void
  close: () => void
}

export const useTourStore = create<TourState>(set => ({
  open: false,
  seen: readSeen(),
  start: () => set({ open: true }),
  close: () => {
    persistSeen()
    set({ open: false, seen: true })
  },
}))
