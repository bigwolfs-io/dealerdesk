# DealersDesk API

Welcome to the documentation for the **DealersDesk** app. This document aims to provide you with an overview of the project structure, its components, and how to get started.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the App](#running-the-app)
6. [Exploring Additional Improvements](#exploring-additional-improvements)

## Project Overview

The **DealersDesk** app is an integral part of the **Nx Monorepo** project, meticulously crafted to exemplify a robust setup for constructing applications using the Nx monorepo architecture. This project harnesses the capabilities of NestJS, MongoDB, React Native, and Nx to craft an application that is both scalable and easily maintainable.

Here are the list of technologies used in it.

1. Nx monorepo to manage packages
2. React Native with expo.
3. NestJS with mongoDB as the database.
4. RTK query for caching, querying and invalidation.

and more.

Here is an overview of the project's structural components:

```
├── apps
│  ├── api      -> Backend Application
│  └── native   -> Native Mobile App
├── libs
│  ├── native   -> Libraries for the Native Mobile App
│  │  ├── core    -> Core Features
│  │  ├── screens -> Screens for the React Native App
│  │  └── types   -> Types for the React Native App
│  ├── shared
│  │  └── types   -> Shared Types between the Frontend and Backend
│  └── ui         -> Shared User Interface Components
```

This structural breakdown showcases the clear separation and organization of the various components that constitute the **DealersDesk** app, facilitating ease of development and maintenance.

## Features

1. **Modular Architecture**: The application boasts a modular architecture designed to maximize modularity and reusability across the entire technology stack. This modularity extends to the extent that the application logic can be effortlessly reused in a React web application as well.

2. **Default Security Measures**: By default, all routes within the application are fortified with robust security measures. Any route that needs to be made accessible to the public requires explicit permission.

3. **Adherence to Security Best Practices**: The project adheres to industry-best security practices. Authentication is handled with OAuth 2 in conjunction with Firebase, ensuring a secure and trustworthy authentication process.

4. **Efficient Caching Strategies**: To minimize the number of requests and optimize performance, the project implements caching best practices. This is accomplished through the utilization of RTK Query, ensuring efficient data retrieval and management.

## Installation

**Before You Begin**

Before you start, make sure you have the following prerequisites installed on your system:

- Node.js
- A MongoDB instance running locally (A Docker file is already configured), or it should be accessible remotely.

**Installation Steps**

Follow these steps to set up the project:

1. Start the MongoDB instance using Docker and Docker Compose:

   ```bash
   docker compose up -d
   ```

2. Install project dependencies:

   ```bash
   yarn
   ```

## Configuration

**Backend API Configuration**

Optionally, you can configure MongoDB by providing the `MONGODB_URI` as an environment variable. If not provided, a default configuration is used, leveraging the Docker file.

```bash
export MONGODB_URI='mongodb://localhost:27017/your-database-name'
```

If you are running the backend locally, you also need to add Firebase admin credentials. To obtain the credentials file, refer to this [link](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).

```bash
export FIREBASE_SERVICE_ACCOUNT_KEY='<json-file-content-here>'
```

Alternatively, you can add these credentials to a `.env` at the root of project.

**React Native Configuration**

For React Native, you can optionally configure `BASE_URL` by providing it in `libs/native/core/src/libs/config.ts` if running locally. When you run expo app, it gives following message `Metro waiting on exp://192.168.10.5:8081`

The `BASE_URL` would include the IP address and look like this. After combining, it should look something like this.

`http://192.168.10.5:3000/api`

## Running the App

To start the NestJS app, use the following command:

```bash
npx nx serve api
```
Visit `http://localhost:3000/docs` in your browser to access the OpenAPI docs.

To run the react-native app run the following command.

```bash
npx nx start native
```

You can open the app using `expo go` app.

## Exploring Additional Improvements
Here are several avenues for further enhancement:

- Leveraging the `config` package from NestJS to validate configuration preemptively, prior to database initialization.
- Abstracting the data access layer into a distinct library for improved modularity.
- Introduce web application where the logic can be shared with native app.
- Better integration with firebase auth, with refresh tokens for long running auth and more options like google auth.
- Implement better Strategies for configuration for early failure.
- Improving OpenAPI docs
