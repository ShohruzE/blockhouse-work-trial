---
sidebar_position: 2
---

# Project Setup Guide

This guide will help you set up and run the Crypto Price Tracker project locally. Visit the following **[GitHub Repository](https://github.com/ShohruzE/blockhouse-work-trial).**

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ShohruzE/blockhouse-work-trial.git
```

## Setup and Run the Next.js Web App

Navigate to the web app directory and install dependencies:

```bash
# Navigate to the web app directory
cd web-app

# Install dependencies
npm install
# OR
yarn install
```

Start the development server:

```bash
# Start the development server
npm run dev
# OR
yarn dev
```

The web app should now be running at [http://localhost:3000](http://localhost:3000).

## Build for Production

To build the app for production:

```bash
# Build the project
npm run build
# OR
yarn build

# Start the production server
npm start
# OR
yarn start
```

## Setup and Run Documentation

The documentation is built with Docusaurus. To run it locally:

```bash
# Navigate to the documentation directory
cd ../docs

# Install dependencies
npm install
# OR
yarn install

# Start the documentation site
npm start
# OR
yarn start
```

All set!
