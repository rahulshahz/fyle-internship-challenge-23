# Fyle Frontend Challenge
Welcome to the GitHub Repositories Listing App, a single-page application built with Angular 14+ as part of the Fyle Frontend Development Challenge.

## Deployment link
https://rahul-fyle-frontend-assignment.netlify.app/

## Overview
The GitHub Repositories Listing App is designed to offer a user-friendly interface for inputting a GitHub username and exploring the associated public repositories. This application goes beyond the basics by implementing server-side pagination, enabling users to customize the number of repositories displayed per page for a more tailored experience.

## Features
- **User Details:** Retrieve and display essential user information, such as the username, using the GitHub API.
- **Repositories:** Fetch and display public repositories for a specified user, implementing server-side pagination for efficient navigation.
- **Repository Topics:** Explore additional information about each repository, including multiple topics that provide context and categorization.
- **Loading Indicators:** Enhance user experience by displaying loading indicators during API calls, ensuring users are aware of ongoing processes.
- **Tailwind CSS Styling:** Leverage Tailwind CSS for styling, resulting in a clean and visually appealing interface.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js
- Angular CLI

### Install requirements
* Install angular cli [Ref](https://angular.io/cli)
* `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Testing
Execute the following command to run unit tests:  `ng test`

### 1. User Details Retrieval
- **Purpose:** Verifies that the application correctly retrieves and displays basic user details using the GitHub API.
- **Explanation:** The test sets a mock username, calls the `getUserDetails` method, and checks if the returned user details match the expected values.

### 2. User Repositories Retrieval
- **Purpose:** Ensures that the app fetches and displays public repositories for a given user with server-side pagination.
- **Explanation:** The test sets a mock username, page, and perPage values, calls the `getUserRepos` method, and checks if the returned repositories match the expected values.

### 3. Error Handling for User Details Retrieval
- **Purpose:** Validates that the app handles errors appropriately when retrieving user details.
- **Explanation:** The test uses a non-existent username, calls the `getUserDetails` method, and checks if the app appropriately handles the expected error response.

### 4. Error Handling for User Repositories Retrieval
- **Purpose:** Validates that the app handles errors appropriately when retrieving user repositories.
- **Explanation:** The test uses a valid username but induces an error in the API response, calls the `getUserRepos` method, and checks if the app appropriately handles the expected error response.

### 5. Network Error Handling for User Details Retrieval
- **Purpose:** Verifies that the app handles network errors gracefully when retrieving user details.
- **Explanation:** The test uses a valid username, initiates a network error, calls the `getUserDetails` method, and checks if the app appropriately handles the network error.

### 6. Network Error Handling for User Repositories Retrieval
- **Purpose:** Verifies that the app handles network errors gracefully when retrieving user repositories.
- **Explanation:** The test uses a valid username, initiates a network error, calls the `getUserRepos` method, and checks if the app appropriately handles the network error.

### 7. Repository Languages Retrieval
- **Purpose:** Ensures that the app fetches and displays languages for each repository.
- **Explanation:** The test sets a mock username and repository name, calls the `getRepoLanguages` method, and checks if the returned languages match the expected values for each repository.

### 8. App Component Functionality
- **Purpose:** Validates the functionality of the AppComponent.
- **Explanation:** The test sets up the AppComponent, simulates user interactions such as searching, changing pages, and changing repositories per page. It checks if the component behaves as expected, updating user details, repositories, and handling pagination appropriately.

### 9. App Component Change Page
- **Purpose:** Ensures that the App Component correctly changes the page when the user interacts with the pagination controls.
- **Explanation:** The test sets up the AppComponent, simulates a user changing the page, and checks if the page value is updated accordingly.

### 10. App Component Change Repositories Per Page
- **Purpose:** Validates that the App Component resets the page to 1 when the user changes the number of repositories per page.
- **Explanation:** The test sets up the AppComponent, simulates a user changing the repositories per page, and checks if the page is reset to 1 as expected.

### 11. App Component Fetch Repository Languages
- **Purpose:** Ensures that the App Component correctly fetches repository languages when searching for repositories.
- **Explanation:** The test sets up the AppComponent, simulates a user search, and checks if the component correctly fetches and displays repository languages.

