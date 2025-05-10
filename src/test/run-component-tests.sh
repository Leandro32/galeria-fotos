#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running component tests for photo gallery...${NC}"

# Run all component tests with yarn
yarn test "albums-table|daily-performance|main-nav|mini-chart|photos-table|sales-chart|stat-card|theme-provider|user-nav"

# Check if tests passed
if [ $? -eq 0 ]; then
  echo -e "${GREEN}All component tests passed!${NC}"
else
  echo -e "${RED}Some tests failed. Check the output above for details.${NC}"
  exit 1
fi

# Run specific component test groups if needed
run_specific() {
  if [ "$1" == "charts" ]; then
    echo -e "${YELLOW}Running chart component tests only...${NC}"
    yarn test "mini-chart|sales-chart"
  elif [ "$1" == "ui" ]; then
    echo -e "${YELLOW}Running UI component tests only...${NC}"
    yarn test "albums-table|daily-performance|photos-table|stat-card|user-nav"
  elif [ "$1" == "navigation" ]; then
    echo -e "${YELLOW}Running navigation component tests only...${NC}"
    yarn test "main-nav"
  elif [ "$1" == "theme" ]; then
    echo -e "${YELLOW}Running theme component tests only...${NC}"
    yarn test "theme-provider"
  else
    echo -e "${RED}Unknown test group: $1${NC}"
    echo "Available groups: charts, ui, navigation, theme"
    exit 1
  fi
}

# If a specific group is specified, run it
if [ ! -z "$1" ]; then
  run_specific $1
fi 