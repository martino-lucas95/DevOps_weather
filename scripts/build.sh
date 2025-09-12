#!/bin/bash

echo "🏗️  Building Weather App Docker images..."

# Build blue version (main branch)
echo "Building BLUE version (main branch)..."
git checkout main
docker build -t weather-app:blue .

# Build green version (feat/pluscode branch)  
echo "Building GREEN version (feat/pluscode branch)..."
git checkout feat/pluscode
docker build -t weather-app:green .

echo "✅ Images built successfully!"
echo "  - weather-app:blue (main branch)"
echo "  - weather-app:green (feat/pluscode branch)"
