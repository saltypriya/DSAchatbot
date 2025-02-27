# Enhanced Prompt Engineering Guide

## Core Interaction Patterns
### 1. Phase-Based Tactics
| Phase         | Question Type          | Example                  | Output Format         |
|---------------|------------------------|--------------------------|-----------------------|
| Exploration   | Concept Clarification  | "What's the base case?"  | Principle → Hint      |
| Analysis      | Pattern Comparison     | "DFS vs BFS tradeoffs?"  | Tradeoff → Optimization Path |
| Implementation| Complexity Analysis    | "Bottleneck in O(n²)?"   | Framework → Action    |

### 2. Framework Implementation
**BOUNDS Edge Cases**
```javascript
function generateBoundsPrompt(problem) {
  return `Apply BOUNDS to ${problem}:
  1. Identify 2 critical boundary categories
  2. Propose test case for most likely oversight`; 
}


Performance Metrics
Conversation Depth: Average turns before solution hint

Student Engagement: Follow-up question rate

Concept Transfer: Similar problem success rate

Updated Example Flow
Student Input:
"Trying Two Pointer approach for Container Water problem"

Valid Response:
"What limits container height? (Pattern Comparison)
Consider min(left, right) → Does this handle all elevation cases?"

Invalid Response:
"The O(n) approach uses left and right pointers to calculate..."