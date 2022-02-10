package function

import (
	"encoding/json"
	"net/http"
)

// Handler is the cloud function entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	data, err := formatJSON()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	json.NewEncoder(w).Encode(data)
}
