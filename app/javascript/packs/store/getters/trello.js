export default {
  nextListId: (state, getters) => {
    let maxId = 0;
    state.lists.forEach((list) => {
      if(list.id > maxId) maxId = list.id;
    });
    return ++maxId;
  },
  nextListOrder: (state, getters) => {
    return state.lists.length;
  },
  nextCardId: (state, getters) => (listOrder) => {
    let maxId = 0;
    state.lists[listOrder].cards.forEach((card) => {
      if(card.id > maxId) maxId = card.id;
    });
    return ++maxId;
  },
  nextCardOrder: (state, getters) => (listOrder) => {
    return state.lists[listOrder].cards.length;
  },
  getListIndexByListId: (state, getters) => (listId) => {
    let targetIndex = 0;
    state.lists.some((list, i) => {
      if(list.id === listId) {
        targetIndex = i;
        return true;
      }
    });

    return targetIndex;
  }
}
