# Pre-Refactor Audit - Dev Confessions API

## 1. Monolithic Function
The function `handleAll()` is doing too many responsibilities:
- Request validation
- Data creation
- Fetching all data
- Fetching single record
- Filtering by category
- Deleting data

This makes the code hard to read, test, and maintain.

---

## 2. Poor Variable Naming
Several variables are not descriptive:
- d → request body but unclear meaning
- r → request params but not readable
- x → unclear counter variable
- res2 → unclear temporary result variable

This reduces readability and increases confusion.

---

## 3. Lack of Architecture (No MVC)
All logic exists in a single file:
- Routes
- Business logic
- Data handling
- Response formatting

There is no separation of concerns.

---

## 4. Hardcoded Data
- Category list is repeated in multiple places
- No centralized configuration
- No environment variables used

This leads to duplication and maintenance issues.

---

## 5. Nested Conditional Logic
The code has deeply nested if-else conditions:
- Makes flow hard to understand
- Increases risk of bugs
- Difficult to extend functionality

---

## 6. No Separation of Concerns
- Request handling, validation, and data logic are mixed
- No controllers or services layer

---

## 7. Global State Handling
- Confessions array and ID counter are globally managed in the same file
- No proper data abstraction layer

---

## 8. Poor Code Scalability
- Adding new features would require modifying the same large function
- Code is not modular

---

## Summary
The code works but is not maintainable. Major refactoring is required to:
- Improve structure
- Separate logic into modules
- Improve readability
- Prepare for scalability