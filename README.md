Sure, here is the complete README content with all the details:

# School Management System API

This project is a School Management System API designed to handle various administrative and operational tasks within a school setting. The API is built using Node.js, Express, and MongoDB, and includes functionalities such as learner management, attendance tracking, fee structure management, logistics and supply chain management, and procurement management. The API is documented using Swagger UI.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Learner Management**: Add, read, update, and delete learner information.
- **Attendance Tracking**: Track attendance records for learners and classrooms.
- **Fee Structure Management**: Manage fee structures and automatically update learner fee records based on promotions.
- **Logistics and Supply Chain Management**: Track inventory levels, manage stock, coordinate procurement and purchasing processes, manage vendor relationships and contracts, and monitor supply chain performance.
- **Procurement Management**: Manage purchase requests and approvals, track procurement orders and deliveries, monitor procurement budgets, and generate procurement reports.
- **Swagger Documentation**: Interactive API documentation using Swagger UI.

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/new_hope_academy_api.git
    cd new_hope_academy_api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```
    MONGODB_URI=your_mongodb_uri
    PORT=4500
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

### Running the Server

To start the server, run the following command:
```sh
npm start
```

The server will run on `http://localhost:4500` by default.

### API Endpoints

The API endpoints are organized based on functionalities. For a complete list of endpoints and their usage, refer to the Swagger documentation.

## API Documentation

The API documentation is generated using Swagger. To access the documentation, start the server and navigate to:
```
http://localhost:4500/nha
```

## Folder Structure

```
new_hope_academy_api
├── config
│   ├── authConfig
│   ├── DB
│   └── swaggerConfig
├── controllers
├── handlers
├── middleware
├── model
├── routes
│   ├── admin.router.js
│   ├── auth.router.js
├── utils
├── .env
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
```

This single-file README provides a detailed description of the functionalities and setup instructions for the School Management System API, ensuring it is easy to follow and comprehensive.
