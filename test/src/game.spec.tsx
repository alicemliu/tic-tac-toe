import Game from '../../src/game';

describe(Game.name, () => {
  // TODO
  it('should add X to board after clicking an open square');
  it('should fetch and display bot\'s move after user makes a valid move');
  it('should show loading icon while fetching bot\'s next move');
  it('should display an error message if fetching bot\'s move fails');
  it('should not allow user to click a filled square');

  it('should announce correct winner if three-in-a-row exists in board');
  it('should announce a draw if there is no three-in-a-row but board is full');
  it('should display Start New Game button if current game is complete');

  it('should highlight adjacent row and column upon hovering over an open square');
});
