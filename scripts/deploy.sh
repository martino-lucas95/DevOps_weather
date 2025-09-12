#!/bin/bash

echo "🚀 Deploying Weather App..."

# Deploy blue version
echo "Deploying BLUE version..."
kubectl apply -f k8s/weather-app-blue.yaml

# Deploy green version
echo "Deploying GREEN version..."
kubectl apply -f k8s/weather-app-green.yaml

# Deploy main service (points to blue initially)
echo "Deploying main service..."
kubectl apply -f k8s/weather-app-main.yaml

echo "✅ Deployment completed!"
echo ""
echo "To check status: kubectl get pods"
echo "To see services: kubectl get services"
echo "To switch to green: ./scripts/switch-to-green.sh"
