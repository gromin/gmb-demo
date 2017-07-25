export const search = (state = '', action) => {

  switch (action.type) {

    case 'SEARCH_UPDATE':
      return action.search

    default:
      return state
  }
}
