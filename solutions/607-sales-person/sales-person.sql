-- Write your PostgreSQL query statement below
SELECT salesperson.name
FROM salesperson
WHERE salesperson.sales_id NOT IN (
    SELECT orders.sales_id
    FROM orders
    LEFT JOIN company ON orders.com_id = company.com_id
    WHERE company.name = 'RED'
);