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
    system('clear') || system('cls')
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
    system('clear') || system('cls')
    board.print
    @current_player_mark = (current_player_mark == :x ? :o : :x)
  end
end

def start_game
  puts 'Who wants to play Tic Tac Toe?'
  puts '1. Human v. Human'
  puts '2. Human v. Computer'
  puts '3. Computer v. Human'
  puts '4. Computer v. Computer'
  print 'Enter your selection:  '
  case gets.chomp.to_i
  when 1
    Game.new(HumanPlayer.new, HumanPlayer.new).play
  when 2
    Game.new(HumanPlayer.new, ComputerPlayer.new).play
  when 3
    Game.new(ComputerPlayer.new, HumanPlayer.new).play
  when 4
    Game.new(ComputerPlayer.new, ComputerPlayer.new).play
  else
    puts "Sorry, I didn't understand that"
    start_game
  end
end

start_game if __FILE__ == $PROGRAM_NAME
