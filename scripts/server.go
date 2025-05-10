package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (
	PORT    = 3000
	DIST_DIR = "./dist"
)

// SpaHandler implements a handler for SPA (Single Page Application)
// It serves static files and falls back to index.html for routes not found
type SpaHandler struct {
	staticPath string
	indexPath  string
}

func (h SpaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Get the absolute path to prevent directory traversal
	path := filepath.Join(h.staticPath, r.URL.Path)

	// Check if file exists
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		// File doesn't exist, check if it's a known extension
		// If it has an extension, it should be a 404
		if len(filepath.Ext(path)) > 0 {
			log.Printf("File not found: %s", path)
			http.Error(w, "File not found", http.StatusNotFound)
			return
		}

		// No extension means it's likely a route path, serve index.html
		log.Printf("Route request, serving index: %s", r.URL.Path)
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	}

	// If we have a directory, serve index.html
	if err == nil {
		fi, err := os.Stat(path)
		if err == nil && fi.IsDir() {
			path = filepath.Join(path, h.indexPath)
		}
	}

	// Otherwise, just serve the file
	log.Printf("Serving: %s", r.URL.Path)
	http.ServeFile(w, r, path)
}

func main() {
	// Check if DIST_DIR exists
	if _, err := os.Stat(DIST_DIR); os.IsNotExist(err) {
		log.Fatalf("Directory '%s' does not exist! Please run 'yarn build' first.", DIST_DIR)
	}

	// Create the SPA handler for all routes
	spa := SpaHandler{staticPath: DIST_DIR, indexPath: "index.html"}
	
	// Create routing
	http.Handle("/", spa)
	
	// Set up server address
	serverAddr := fmt.Sprintf("localhost:%d", PORT)
	
	distDir, err := filepath.Abs(DIST_DIR)
	if err != nil {
		distDir = DIST_DIR
	}
	
	// Start server
	log.Printf("Server running at http://%s/", serverAddr)
	log.Printf("Serving files from: %s", distDir)
	
	if err := http.ListenAndServe(serverAddr, nil); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
} 