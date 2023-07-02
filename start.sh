#!/bin/bash

# Uruchomienie api1
echo "Uruchamianie api1..."
cd api_1
node server.js &
cd ..

# Uruchomienie api2
echo "Uruchamianie api2..."
cd api_2
node server.js &
cd ..

# Uruchomienie frontendu
echo "Uruchamianie frontendu..."
cd frontend
npm start &
cd ..

# Uruchomienie kontenera z Keycloakiem
echo "Uruchamianie kontenera z Keycloakiem..."
docker compose -f konteneryzacja/docker-compose.yaml up -d

# Funkcja do zatrzymania aplikacji
stop_apps() {
  # Zatrzymanie api1 i api2
  echo "Zatrzymywanie api1 i api2..."
  pkill -f "node server.js"

  # Zatrzymanie frontendu
  echo "Zatrzymywanie frontendu..."
  pkill -f "npm start"

  # Zatrzymanie kontenera z Keycloakiem
  echo "Zatrzymywanie kontenera z Keycloakiem..."
  docker compose -f konteneryzacja/docker-compose.yaml down
}

# Przechwycenie sygnałów zatrzymania skryptu
trap stop_apps EXIT

# Oczekiwanie na zakończenie skryptu (może być nieskończone)
while true; do
  sleep 1
done
