class Board
  attr_reader :rows

  def initialize(rows = Board.new_board)
    @rows = rows
  end

  def self.new_board
    Array.new(3) { Array.new(3) }
  end

  def cols
    @rows.transpose
  end

  def diags
    [[self[0, 0], self[1, 1], self[2, 2]], [self[0, 2], self[1, 1], self[2, 0]]]
  end

  def [](posn)
    row, col = posn
    @rows[row][col]
  end

  def []=(posn, mark)
    fail 'That space is occupied' unless empty?(posn)

    row, col = posn
    @rows[row][col] = mark
  end

  def empty?(posn)
    self[posn].nil?
  end

  def index_of(posn)
    row, col = posn
    row * 3 + col + 1
  end

  def position_of(index)
    row = (index - 1) / 3
    col = (index - 1) % 3
    [row, col]
  end

  def winner
    (rows + cols + diags).each do |triplet|
      return :x if triplet.all? { |posn| posn == :x }
      return :o if triplet.all? { |posn| posn == :o }
    end
    nil
  end

  def won?
    !winner.nil?
  end

  def tied?
    rows.flatten.none? { |posn| empty?(posn) }
  end

  def over?
    won? || tied?
  end

  def dup
    self.class.new(rows.map(&:dup))
  end

  def print
    board_state = rows.flatten.each_with_index.map do |val, i|
      val ? val.to_s.upcase : i + 1
    end
    new_rows = board_state.each_slice(3).to_a.map do |row|
      row.join(' | ').insert(0, ' ')
    end
    puts new_rows.join("\n" + '-' * 11 + "\n")
  end
end
