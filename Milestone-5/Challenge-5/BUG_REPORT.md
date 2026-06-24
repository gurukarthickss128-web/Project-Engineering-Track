# BUG REPORT

## Bug #1: Empty Submission

Root Cause:
The validate() function always returned true, allowing empty forms to submit.

---

## Bug #2: Multiple Submission

Root Cause:
The loading state was never used, so users could click Submit multiple times.

---

## Bug #3: Form Not Reset

Root Cause:
The form state was never cleared after a successful submission.

---

## Bug #4: Silent Server Errors

Root Cause:
The catch block swallowed errors and never showed them to the user.

---

## Bug #5: Missing Field Validation Messages

Root Cause:
Validation errors were never rendered in the UI.

---

## Bug #6: Invalid Steps Count

Root Cause:
The form accepted zero and negative values because no validation existed.
