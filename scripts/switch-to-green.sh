#!/bin/bash

echo "🔄 Switching to GREEN version..."

# Update the main service to point to green
kubectl patch service weather-app-main -p '{"spec":{"selector":{"version":"green"}}}'

echo "✅ Switched to GREEN version!"
echo "Check status: kubectl get pods"
echo "Test the app: kubectl get services"
