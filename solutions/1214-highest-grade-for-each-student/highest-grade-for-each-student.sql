-- Write your PostgreSQL query statement below
SELECT DISTINCT ON (student_id) student_id, course_id, grade
FROM Enrollments
ORDER BY student_id, grade DESC, course_id;