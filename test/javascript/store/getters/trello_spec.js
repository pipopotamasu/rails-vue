import assert from 'power-assert'
import getters from '../../../../app/javascript/packs/store/getters/trello'

describe('Trello', () => {
  describe('getters', () => {
    it('nextIdList return 3', () => {
      const state = {
        lists: [
          { id: 1 },
          { id: 2 }
        ]
      };

      assert(getters.nextListId(state, getters) === 3);
    });

    it('nextCardOrder return 2', () => {
      const state = {
        lists: [
          {
            id: 1, cards: [
                            { id: 1, order: 0},
                            { id: 2, order: 1},
                          ]
          }
        ]
      };

      const listOrder = 0;
      assert(getters.nextCardOrder(state, getters)(listOrder) === 2);
    });
  });
});
