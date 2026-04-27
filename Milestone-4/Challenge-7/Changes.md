# Caching Fixes and Improvements

## Issues Identified
- Global cache key used for all data
- Promises stored in cache due to missing await
- No cache invalidation after DELETE/CREATE
- Null values cached permanently
- No TTL causing memory leaks
- Incorrect HTTP status codes
- Errors were swallowed without response

## Fixes Implemented
- Introduced namespaced cache keys:
  - tasks:list
  - task:{id}
- Added TTL to cache entries (60 seconds)
- Ensured all async operations use await
- Prevented caching of null/invalid data
- Implemented cache invalidation after:
  - task creation
  - task deletion
- Fixed HTTP status codes:
  - 200 (GET)
  - 201 (POST)
  - 204 (DELETE)
  - 404 (Not Found)
- Added proper error handling with responses

## Result
- Data is now consistent and up-to-date
- No stale or deleted tasks appear
- Memory usage controlled with TTL
- API behavior is predictable and reliable