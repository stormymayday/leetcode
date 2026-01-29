-- Write your PostgreSQL query statement below
SELECT uni.unique_id, e.name
FROM employees e
LEFT JOIN employeeuni uni
ON e.id = uni.id;