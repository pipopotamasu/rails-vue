import assert from 'power-assert'
import store from '../../../../../app/javascript/packs/store/modules/vuex_practice/trello'
import sinon from 'sinon'

const mutations = store.mutations;
const actions = store.actions;


describe('trello store', () => {
  describe('mutations', () => {
    it('ADD_LIST', () => {
      // mock state
      const state = {
        lists: []
      }
      const list = {
        id: 1,
        order: 0,
        title: 'test1',
        cards: []
      }
      mutations.ADD_LIST(state, { list });
      assert(state.lists[0] === list);
    });

    it('SORT_LIST_ORDER', () => {
      // mock state
      const state = {
        lists: [
          {
            id: 1,
            order: 2,
            title: 'test1',
            cards: []
          },
          {
            id: 2,
            order: 0,
            title: 'test2',
            cards: []
          },
          {
            id: 3,
            order: 1,
            title: 'test3',
            cards: []
          }
        ]
      }

      const expected_lists = [
                                {
                                  id: 1,
                                  order: 0,
                                  title: 'test1',
                                  cards: []
                                },
                                {
                                  id: 2,
                                  order: 1,
                                  title: 'test2',
                                  cards: []
                                },
                                {
                                  id: 3,
                                  order: 2,
                                  title: 'test3',
                                  cards: []
                                }
                              ]
      mutations.SORT_LIST_ORDER(state);
      assert.deepEqual(state.lists, expected_lists);
    });

    it('DELETE_LIST', () => {
      // mock state
      const state = getState();
      const expected_lists = [
                                {
                                  id: 1,
                                  order: 0,
                                  title: 'test1',
                                  cards: []
                                },
                                {
                                  id: 3,
                                  order: 1,
                                  title: 'test3',
                                  cards: []
                                }
                              ]
      mutations.DELETE_LIST(state, { list: { order: 1 } });
      assert.deepEqual(state.lists, expected_lists);
    });

    it('UPDATE_LIST', () => {
      // mock state
      const state = getState();
      const expected_lists = [
                                {
                                  id: 1,
                                  order: 0,
                                  title: 'test1',
                                  cards: []
                                },
                                {
                                  id: 2,
                                  order: 1,
                                  title: 'updated',
                                  cards: []
                                },
                                {
                                  id: 3,
                                  order: 2,
                                  title: 'test3',
                                  cards: []
                                }
                              ]
      mutations.UPDATE_LIST(state, { list: { id: 2, order: 1, title: 'updated', cards: [] } });
      assert.deepEqual(state.lists, expected_lists);
    });

    it('ADD_CARD', () => {
      // mock state
      const state = getState();
      const expected_cards = [
                                {
                                  id: 1,
                                  list_id: 1,
                                  order: 0,
                                  title: 'test1_1'
                                }
                              ];
      mutations.ADD_CARD(state, { list_index: 0, card: { id: 1, list_id: 1, order: 0, title: 'test1_1' } });
      assert.deepEqual(state.lists[0].cards, expected_cards);
    });
  });
})

function getState() {
  return {
    lists: [
      {
        id: 1,
        order: 0,
        title: 'test1',
        cards: []
      },
      {
        id: 2,
        order: 1,
        title: 'test2',
        cards: []
      },
      {
        id: 3,
        order: 2,
        title: 'test3',
        cards: []
      }
    ]
  }
}
