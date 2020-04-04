
export const MODEL_NAME = 'USER'

enum types {
  CACHE_USER = 'CACHE_USER'
}

const initValue = {}

const model = (state = initValue, action) => {
  if (action.model !== MODEL_NAME) return state

  switch (action.type) {
    case types.CACHE_USER:
      return {
        ...state
      }
    default:
      return state
  }
}

export default model