#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Installing Forkaway...${NC}"

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo -e "${RED}❌ Node.js is required but not installed.${NC}"
    echo -e "${BLUE}Please install Node.js (v18 or higher) from:${NC}"
    echo -e "${GREEN}https://nodejs.org${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d "v" -f 2)
if [ "$(printf '%s\n' "18.0.0" "$NODE_VERSION" | sort -V | head -n1)" = "18.0.0" ]; then
    echo -e "${GREEN}✓ Node.js version $NODE_VERSION detected${NC}"
else
    echo -e "${RED}❌ Node.js version 18 or higher is required${NC}"
    exit 1
fi

# Create installation directory
INSTALL_DIR="$HOME/.forkaway"
mkdir -p "$INSTALL_DIR"

# Download latest version
echo -e "${BLUE}⬇️  Downloading latest version...${NC}"
npm install -g forkaway

# Check if installation was successful
if command -v forkaway >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Forkaway installed successfully!${NC}"
    echo -e "${BLUE}To get started, run:${NC}"
    echo -e "${GREEN}forkaway${NC}"
else
    echo -e "${RED}❌ Installation failed${NC}"
    exit 1
fi