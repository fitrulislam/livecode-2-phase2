# Bacaan Baik
REST API for Bacaan Baik App

API for Create and Read user using end-point ```user-api.roarized.com```

List of routes:

**Route** | **HTTP** | **Description**
--------- | -------- | ---------------
/book/create | POST | Create a book (for user only)
/book/read | GET | Read all book for home page
/book/readforacc | GET | Get all book based on login account
/book/findone/:id | GET | Get a single book (with review inside it)
/book/delete/:id | DELETE | Delete a book (for user only)

/review/create | POST | Create a review based on a book (for user only)
/review/read | GET | Read all review (for development only)
/review/delete/:id | DELETE | Delete a review (for user only)

## Usage
With only npm:

```
run 'npm install'
run 'npm run start'

```
