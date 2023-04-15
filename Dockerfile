# Wybieramy obraz bazowy, np. oficjalny obraz Node.js
FROM node:16

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki z projektu do katalogu roboczego
COPY . /app

# Instalujemy zależności
RUN npm install

# Budujemy projekt
RUN npm run build

# Określamy port, na którym będzie działać aplikacja
EXPOSE 3000

# Uruchamiamy aplikację
CMD ["npm", "run", "start"]
