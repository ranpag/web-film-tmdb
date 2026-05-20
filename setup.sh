#!/bin/bash
 
echo "========================================"
echo "           PROJECT SETUP"
echo "========================================"
echo ""
 
# Step 1: npm install
echo "[1/3] Installing npm dependencies..."
npm i
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi
echo "Done."
echo ""
 
# Step 2: Copy .env.example to .env
echo "[2/3] Copying .env.example to .env..."
if [ ! -f ".env.example" ]; then
    echo "ERROR: .env.example not found!"
    exit 1
fi
cp ".env.example" ".env"
echo "Done."
echo ""
 
# Step 3: Input API Key
echo "[3/3] Configure API Key..."
echo "Get your API KEY from https://developer.themoviedb.org/reference/intro/getting-started"
echo ""
while true; do
    read -p "Enter your API Key: " API_KEY
    if [ -n "$API_KEY" ]; then
        break
    fi
    echo "ERROR: API Key cannot be empty! Please try again."
done
 
# Replace or append API_KEY in .env
if grep -q "^TMDB_API_KEY=" ".env"; then
    sed -i "s|^TMDB_API_KEY=.*|TMDB_API_KEY=$API_KEY|" ".env"
else
    echo "TMDB_API_KEY=$API_KEY" >> ".env"
fi

echo ""
echo "========================================"
echo "  Setup complete! .env is ready."
echo "========================================"
