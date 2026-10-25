class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        
        row_map = {}
        col_map = {}
        subgrid_map = {}

        for row in range(0, 9):

            if row not in row_map:
                row_map[row] = set()

            for col in range(0, 9):

                curr_val = board[row][col]

                if curr_val == '.':
                    continue
                
                if col not in col_map:
                    col_map[col] = set()
                
                subgrid_key = (row // 3, col // 3)
                if subgrid_key not in subgrid_map:
                    subgrid_map[subgrid_key] = set()
                
                if curr_val in row_map[row] or curr_val in col_map[col] or curr_val in subgrid_map[subgrid_key]:
                    return False
                
                row_map[row].add(curr_val)
                col_map[col].add(curr_val)
                subgrid_map[subgrid_key].add(curr_val)

        return True