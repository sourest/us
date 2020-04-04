
export const MODEL_NAME = 'GLOBAL'

export enum types {
  SET_USER_TOUCH = 'SET_USER_TOUCH'
}

const initValue = {
  isUserTouched: false
}

const model = (state = initValue, action) => {
  if (action.model !== MODEL_NAME) return state

  switch (action.type) {
    case types.SET_USER_TOUCH:
      return {
        ...state,
        isUserTouched: true
      }
    default:
      return state
  }
}

export default model