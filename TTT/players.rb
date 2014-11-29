class HumanPlayer
  def move(game, _mark)
    board = game.board
    puts 'Enter the number of your space'
    posn = board.position_of(gets.chomp.to_i)
    if board.valid?(posn)
      posn
    else
      puts "Sorry, that's not valid"
    end
  end
end

class ComputerPlayer
  def move(game, mark)
    node = TicTacToeNode.new(game.board, mark)
    node.children.each do |child|
      return child.prev_move_pos if child.winning_node?(mark)
    end
    node.children.each do |child|
      return child.prev_move_pos unless child.losing_node?(mark)
    end
  end
end
