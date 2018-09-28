const initialState = { ScoreGame: [] }

function saveScore(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'NEW_SCORE': 
        if(state.ScoreGame.length == 5){
          console.log('Supprimer le dernier score')
            state.ScoreGame.shift();
            nextState = {
              ...state,
              ScoreGame: [...state.ScoreGame, action.value]
            }
        }else{
          nextState = {
            ...state,
             
            ScoreGame: [...state.ScoreGame, action.value]
          }
        }
      return nextState || state
  default:
    return state
  }
}

export default saveScore