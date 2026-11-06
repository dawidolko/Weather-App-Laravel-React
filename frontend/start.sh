#!/bin/bash

rm -rf node_modules package-lock.json
npm cache clean --force


echo "================================="
echo "Starting Frontend Setup Script"
echo "================================="

if ! command -v node &> /dev/null
then
    echo "Error: Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

echo "Installing dependencies..."
npm install

echo "Installing axios..."
npm install axios
npm install cors
npm install -D sass
npm install react-icons
npm install framer-motion react-countup react-slick react-intersection-observer slick-carousel

# Instalacja react-router-dom
echo "Installing react-router-dom..."
npm install react-router-dom

echo "Building the project..."
npm run build

echo "Starting the development server..."
npm start
