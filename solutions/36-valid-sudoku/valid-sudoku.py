class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:

        if len(board) == 0 or len(board[0]) == 0:
            return false

        ROWS = len(board)
        COLS = len(board[0])
        
        rows = {}
        cols = {}
        sub_grids = {}

        for row in range(0, ROWS):
            for col in range(0, COLS):
                curr_val = board[row][col]

                if curr_val == '.':
                    continue
                
                # rows
                if row not in rows:
                    rows[row] = set()
                
                if curr_val in rows[row]:
                    return False
                else:
                    rows[row].add(curr_val)
                
                # cols
                if col not in cols:
                    cols[col] = set()
                
                if curr_val in cols[col]:
                    return False
                else:
                    cols[col].add(curr_val)
                
                # sub_grids
                sub_grid = (row // 3, col // 3)
                if sub_grid not in sub_grids:
                    sub_grids[sub_grid] = set()
                
                if curr_val in sub_grids[sub_grid]:
                    return False
                else:
                    sub_grids[sub_grid].add(curr_val)

        return True