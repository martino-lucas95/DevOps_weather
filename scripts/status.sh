#!/bin/bash

echo "📊 Weather App Status:"
echo "======================"

echo ""
echo "Pods:"
kubectl get pods -l app=weather-app

echo ""
echo "Services:"
kubectl get services

echo ""
echo "Current active version:"
kubectl get service weather-app-main -o jsonpath='{.spec.selector.version}'
echo ""
