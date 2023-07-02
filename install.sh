#!/bin/bash

# Funkcja do instalacji zależności
install_dependencies() {
  local folder=$1
  echo "Instalowanie zależności w folderze: $folder"
  cd "$folder"
  npm install
  cd ..
}

# Instalacja zależności w folderach api1, api2 i frontend
install_dependencies "api_1"
install_dependencies "api_2"
install_dependencies "frontend"
