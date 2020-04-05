
export const MODEL_NAME = 'USER'

enum types {
  CACHE_USER = 'CACHE_USER',
  USER_GUIDE_READ = 'USER_GUIDE_READ'
}

const initValue = {
  isReadGuide: false
}

const model = (state = initValue, action) => {
  if (action.model !== MODEL_NAME) return state

  switch (action.type) {
    case types.CACHE_USER:
      return {
        ...state
      }
    case types.USER_GUIDE_READ:
      return {
        ...state,
        isReadGuide: true
      }
    default:
      return state
  }
}

export default model