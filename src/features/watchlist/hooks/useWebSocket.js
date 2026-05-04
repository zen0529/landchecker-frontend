import { useState, useEffect, useRef, useCallback } from "react"
import { createConsumer } from "@rails/actioncable"
import { toast } from "sonner"
import { formatNumber } from "../utils/formatNumber"
import { humanize } from "../utils/humanize"

const WS_URL = import.meta.env.VITE_WS_URL

export const useWebSocket = ({ onInitialState, onPropertyUpdated, token  }) => {  // ← accept token
  const [wsConnected, setWsConnected] = useState(false)
  const [wsEvents, setWsEvents]       = useState([])
  const consumerRef     = useRef(null)
  const subscriptionRef = useRef(null)

  const requestPropertyUpdate = useCallback((propertyId) => {
    subscriptionRef.current?.perform("request_property_update", {
      property_id: propertyId
    })
  }, [])


  useEffect(() => {
    if (!token) return  // ← use prop, not localStorage
    

    consumerRef.current = createConsumer(`${WS_URL}/cable?token=${token}`)

    subscriptionRef.current = consumerRef.current.subscriptions.create(
      "WatchlistChannel",
      {
        connected()    { setWsConnected(true) },
        disconnected() { setWsConnected(false) },
        received(data) {
          console.log("received data ", data)
          if (data.message && data.event !== "error") {
            toast(data.message, {
              icon: data.type === "PRICE_DROP" ? "📉" : "🔔"
            })
            if (data.event !== "property_updated") {
              setWsEvents(prev => [...prev, data])
            }
          }


          switch (data.event) {
            case "initial_state":
              onInitialState?.(data.watchlist)
              break
            case "property_updated":
              handlePropertyUpdated(data)
              break
            case "error":
              console.error("WatchlistChannel error:", data.message)
              toast.error(data.message || "An error occurred with the Watchlist")
              break
            default:
              if (!data.message) console.warn("Unknown WS event:", data.event, data)
          }
        }
      }
    )

    return () => {
      subscriptionRef.current?.unsubscribe()
      consumerRef.current?.disconnect()
    }
  }, [token])  

  const handlePropertyUpdated = (data) => {
    const { property, changes } = data
    setWsEvents(prev => [...prev, data])
    onPropertyUpdated?.(property, changes)

    if (changes.price) {
      const diff    = changes.price.diff
      const diffAbs = Math.abs(diff)
      const sign    = diff < 0 ? "dropped" : "increased"
      toast(`${property.title} price ${sign} by $${formatNumber(diffAbs)}`, {
        icon:        diff < 0 ? "📉" : "📈",
        description: `$${formatNumber(changes.price.from)} → $${formatNumber(changes.price.to)}`
      })
    }

    if (changes.status) {
      toast(`${property.title} is now ${humanize(changes.status.to)}`, { icon: "🔔" })
    }
  }

  console.log("wsconnected", wsConnected)
  console.log("wsEvents", wsEvents)

  return { wsConnected, wsEvents, requestPropertyUpdate }
}