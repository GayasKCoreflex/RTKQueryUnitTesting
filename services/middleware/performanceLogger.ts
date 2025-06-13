import { Middleware } from '@reduxjs/toolkit'

const performanceLogger: Middleware = store => next => (action: any) => {
  const start = Date.now()
  console.log(`performanceLogger action-->: ${action.type}`)

  const result = next(action)

  const duration = Date.now() - start
  console.log(`performanceLogger duration--> ${action.type} took ${duration}ms`)
  return result
}

export default performanceLogger
