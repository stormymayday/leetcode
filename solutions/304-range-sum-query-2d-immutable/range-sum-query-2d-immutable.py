class NumMatrix:

    def __init__(self, matrix: list[list[int]]):

        self.prefix_sums: list[list[int]] = []

        for row in range(0, len(matrix)):
            self.prefix_sums.append([])
            for col in range(0, len(matrix[0])):
                
                curr_matrix_val = matrix[row][col]
                left = (self.prefix_sums[row][col - 1] if col > 0 else 0)
                above = (self.prefix_sums[row - 1][col] if row > 0 else 0)
                intersection = (self.prefix_sums[row - 1][col - 1] if row > 0 and col > 0 else 0)

                self.prefix_sums[row].append(
                    curr_matrix_val
                    + left
                    + above
                    - intersection
                )
        

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:

        return (
            self.prefix_sums[row2][col2] # bottom-right
            - (self.prefix_sums[row2][col1 - 1] if col1 > 0 else 0) # bottom-left
            - (self.prefix_sums[row1 - 1][col2] if row1 > 0 else 0) # top-right
            + (self.prefix_sums[row1 - 1][col1 - 1] if row1 > 0 and col1 > 0 else 0) # intersection
        )
        


# Your NumMatrix object will be instantiated and called as such:
# obj = NumMatrix(matrix)
# param_1 = obj.sumRegion(row1,col1,row2,col2)