import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    BehaviorTracker?: {
      track: (eventName: string) => void
    }
  }
}

// tracker.js が読み込み時に最初の pageview を送信するため、
// 初回の location 変化はスキップしてページ遷移(SPA内の擬似遷移)のみ送信する
export function RouteTracker() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.BehaviorTracker?.track('pageview')
  }, [location])

  return null
}
