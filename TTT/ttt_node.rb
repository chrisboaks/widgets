class TicTacToeNode

  attr_reader :board, :next_player_mark, :prev_move_pos

  def initialize(board, next_player_mark, prev_move_pos = nil)
    @board = board
    @next_player_mark = next_player_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(player)
    if board.won? && player != board.winner
      true
    elsif board.over? && (player == board.winner || board.winner.nil?)
      false
    elsif (player == next_player_mark) && (children.all? { |child| child.losing_node?(player) })
      true
    elsif (player != next_player_mark) && (children.any? { |child| child.losing_node?(player) })
      true
    end
  end

  def winning_node?(player)
    if player == board.winner
      true
    elsif board.over? && (player != board.winner || board.winner.nil?)
      false
    elsif player == next_player_mark && children.any? { |child| child.winning_node?(player) }
      true
    elsif player != next_player_mark && children.all? { |child| child.winning_node?(player) }
      true
    end
  end

  def children
    all_children = []
    next_mark = (next_player_mark == :x ? :o : :x)
    (0..2).each do |row|
      (0..2).each do |col|
        next unless board.empty?([row, col])
        child_board = board.dup
        child_board[[row, col]] = next_player_mark
        all_children << TicTacToeNode.new(child_board, next_mark, [row, col])
      end
    end
    all_children
  end
end
