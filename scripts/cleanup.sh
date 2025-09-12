#!/bin/bash

echo "🧹 Cleaning up Weather App..."

kubectl delete -f k8s/weather-app-blue.yaml
kubectl delete -f k8s/weather-app-green.yaml
kubectl delete -f k8s/weather-app-main.yaml

echo "✅ Cleanup completed!"
