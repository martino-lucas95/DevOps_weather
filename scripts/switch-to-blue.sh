#!/bin/bash

echo "🔄 Switching to BLUE version..."

# Update the main service to point to blue
kubectl patch service weather-app-main -p '{"spec":{"selector":{"version":"blue"}}}'

echo "✅ Switched to BLUE version!"
echo "Check status: kubectl get pods"
echo "Test the app: kubectl get services"
