require_relative 'board'
require_relative 'players'
require_relative 'ttt_node'

class Game
  attr_reader :board, :players, :current_player_mark

  def initialize(player_x, player_o)
    @board = Board.new
    @players = { x: player_x, o: player_o }
    @current_player_mark = :x
  end

  def play
    board.print
    play_turn until board.over?

    if board.won?
      puts "Player #{board.winner.to_s.capitalize} wins!"
    else
      puts 'Tie game!'
    end
  end

  def place_mark(posn)
    if board.valid?(posn)
      board[posn] = current_player_mark
      true
    else
      false
    end
  end

  def play_turn
    loop do
      posn = players[current_player_mark].move(self, current_player_mark)
      break if place_mark(posn)
    end
    board.print
    @current_player_mark = (current_player_mark == :x ? :o : :x)
  end
end
