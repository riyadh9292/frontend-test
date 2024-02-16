# Frontdesk Bangladesh Limited Test Project

The FormFrame component is a React component designed to render a dynamic form inside an iframe. It dynamically fetches field data from an API endpoint and allows users to submit the form. This README provides documentation on how to use the FormFrame component, its props, and usage examples.

## Technologies Used

- React
- JavaScript
- HTML
- CSS

## Live Demo

Check out the live demo of the application [https://65cfa600a5c29806bc7c0c4a--legendary-babka-ddb9dc.netlify.app/](https://65cfa600a5c29806bc7c0c4a--legendary-babka-ddb9dc.netlify.app/).

### Prerequisites

- Node.js (version 16.13 or higher)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/riyadh9292/frontend-test.git
cd frontend-test
npm install

```

## Features

### 1. Dynamic Form Rendering

The project includes an index.html file located at the root of the project, which serves as the entry point.
The index.html file fetches form field data from an API endpoint.
Upon receiving the data, it dynamically sets the src attribute of an iframe embedded within the HTML page.

### 2. React Application Integration

The iframe source points to a React application.
The React application receives the form field data as query parameters.
It generates a dynamic form based on the received data, allowing users to input and validate their information.

### 3. Form Submission and Data Communication

The React application handles form submissions, validating the input data.
Upon successful validation, the application sends the form data back to the parent HTML page using the `window.parent.postMessage()` method.
The HTML page listens for messages from the iframe and displays the returned form values in a modal.

### 4. Modal Display

After receiving the form data from the React application, the HTML page displays a modal.
The modal contains the returned form values, providing users with feedback on their submitted information.

### 5. Integration Testing

The project has been thoroughly tested to ensure seamless communication between the HTML page and the React application.
Integration tests have been conducted to verify the functionality of form rendering, validation, submission, and data communication.
