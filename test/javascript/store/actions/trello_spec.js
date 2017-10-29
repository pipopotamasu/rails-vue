import assert from 'power-assert'
import actions from '../../../../app/javascript/packs/store/actions/trello'
import sinon from 'sinon'

describe('Trello', () => {
  describe('actions', () => {
    it('ADD_LIST', () => {
      let context = {
        commit: sinon.stub(),
        getters: {
          nextListId: sinon.stub().returns(1)(),
          nextListOrder: sinon.stub().returns(0)(),
        }
      }

      const expectedArgs= { type: 'ADD_LIST', list: { id: 1, order: 0, title: 'New List', cards: [] } };
      actions.ADD_LIST(context);
      assert(context.commit.withArgs(expectedArgs).callCount === 1);
    });

    it('ADD_CARD', () => {
      const argList = { id: 1, order: 0 };
      let context = {
        commit: sinon.stub(),
        getters: {
          nextCardId: sinon.stub().withArgs(argList.order).returns(1),
          nextCardOrder: sinon.stub().withArgs(argList.order).returns(0),
        },
      }

      const expectedArgs= { type: 'ADD_CARD', card: { id: 1, list_id: 1, order: 0,name: 'New Task' }, list_index: argList.order };
      actions.ADD_CARD(context, argList);
      assert(context.commit.withArgs(expectedArgs).callCount === 1);
    });
  });
});
