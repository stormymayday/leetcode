class NumMatrix:

    def __init__(self, matrix: list[list[int]]):

        # Edge Case: empty input
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return

        ROWS = len(matrix)
        COLS = len(matrix[0])

        self.prefix_sums = []

        for row in range(0, ROWS):
            new_row = []
            for col in range(0, COLS):
                new_row.append(0)
            self.prefix_sums.append(new_row)
        
        for row in range(0, ROWS):
            for col in range(0, COLS):
                curr = matrix[row][col]
                left = 0 if col - 1 < 0 else self.prefix_sums[row][col - 1]
                above = 0 if row - 1 < 0 else self.prefix_sums[row - 1][col]
                overlap = 0 if row - 1 < 0 or col - 1 < 0 else self.prefix_sums[row - 1][col -1]
                self.prefix_sums[row][col] = curr + left + above - overlap


    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        total = self.prefix_sums[row2][col2]
        left = 0 if col1 - 1 < 0 else self.prefix_sums[row2][col1 - 1]
        above = 0 if row1 - 1 < 0 else self.prefix_sums[row1 - 1][col2]
        overlap = 0 if row1 - 1 < 0 or col1 - 1 < 0 else self.prefix_sums[row1 - 1][col1 - 1]
        return total - (left + above) + overlap
        
# Your NumMatrix object will be instantiated and called as such:
# obj = NumMatrix(matrix)
# param_1 = obj.sumRegion(row1,col1,row2,col2)