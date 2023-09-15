# Favorite NPM Packages App
This is a simple web application that allows users to search for NPM packages, add their favorite packages to a list with a reason, view their favorite packages, and remove them if needed. The app is built using React, TypeScript, and styled with Tailwind CSS.

##Features
Search for NPM Packages: Users can search for NPM packages by entering text in the search input field. The app fetches package information from the NPM registry and displays the results.

Add to Favorites: Users can add their favorite packages to a list. They need to provide a unique package name and a reason why it's their favorite. Validation checks ensure that both fields are filled correctly.

View Favorites: Users can navigate to a separate route to view their list of favorite packages. The app uses React Router for routing and useEffect to fetch and display the list of favorites.

Remove from Favorites: Users can remove a package from their favorites. A confirmation modal is displayed to confirm the deletion.

Styling with Tailwind CSS: The app is styled using Tailwind CSS, providing a clean and modern user interface.

##Getting Started
Follow these steps to get the app up and running on your local machine:

Clone the repository to your local machine:
###`git clone https://github.com/your-username/favorite-npm-packages-app.git`

Navigate to the project directory:
###`cd favorite-npm-packages-app`

Install dependencies
### `npm install`

Start the development server:
### `npm start`

Open your web browser and access the app at http://localhost:3000.

##Usage
Start by entering the name of an NPM package in the search input field and click "Search."

Search results will be displayed. Select your favorite package by clicking the "Add to Favorites" button. Provide a unique package name and a reason for it being your favorite.

To view your list of favorite packages, click on the "Favorites" link in the navigation.

To remove a package from your favorites, click the "Delete" button next to the package. A confirmation modal will appear before deletion.

Deployment
Deployed on Netlify.


Technologies Used
React: A modern JavaScript library for building user interfaces.
TypeScript: Adds static typing to JavaScript for improved code quality and tooling.
Tailwind CSS: A utility-first CSS framework for styling web applications.
React Router: A routing library for React applications.
