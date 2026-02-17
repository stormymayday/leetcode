-- Write your PostgreSQL query statement below
WITH all_dates AS (
    SELECT user_id, visit_date
    FROM UserVisits

    UNION

    SELECT user_id, DATE '2021-01-01'
    FROM UserVisits
),
gaps AS (
    SELECT
        user_id,
        next_visit - visit_date AS diff
    FROM (
        SELECT
            user_id,
            visit_date,
            LEAD(visit_date) OVER (
                PARTITION BY user_id
                ORDER BY visit_date
            ) AS next_visit
        FROM all_dates
    ) t
    WHERE next_visit IS NOT NULL
)
SELECT user_id, MAX(diff) AS biggest_window
FROM gaps
GROUP BY user_id
ORDER BY user_id;