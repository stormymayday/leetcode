function allPathsSourceTarget(graph: number[][]): number[][] {

   const n = graph.length;
   const target = n - 1;
   const result: number[][] = [];
   
   // Queue stores complete paths: each element is an array representing a path
   const queue: number[][] = [[0]]; // Start with path containing only node 0
   
   while (queue.length > 0) {
       const currentPath = queue.shift(); // Remove from front of queue
       const currentNode = currentPath[currentPath.length - 1]; // Last node in current path
       
       // If we reached the target, add this path to results
       if (currentNode === target) {
           result.push(currentPath);
           continue;
       }
       
       // Explore all neighbors of the current node
       for (const neighbor of graph[currentNode]) {
           // Create new path by extending current path with neighbor
           const newPath = [...currentPath, neighbor];
           queue.push(newPath);
       }
   }
   
   return result;
}