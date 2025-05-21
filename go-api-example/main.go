
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type User struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	Role        string    `json:"role"`
	IsFirstLogin bool     `json:"isFirstLogin"`
	CreatedAt   time.Time `json:"createdAt"`
}

type Application struct {
	ID          string    `json:"id"`
	StudentName string    `json:"studentName"`
	Amount      float64   `json:"amount"`
	Purpose     string    `json:"purpose"`
	Status      string    `json:"status"` // pending, approved, rejected
	CreatedBy   string    `json:"createdBy"` // counselor ID
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	Decision    *Decision `json:"decision,omitempty"`
}

type Decision struct {
	ApprovedBy  string    `json:"approvedBy"` // approver ID
	Decision    string    `json:"decision"` // approved or rejected
	Reason      string    `json:"reason"`
	DecisionDate time.Time `json:"decisionDate"`
}

func main() {
	r := mux.NewRouter()

	// Auth endpoints
	r.HandleFunc("/api/auth/login", loginHandler).Methods("POST")
	r.HandleFunc("/api/auth/logout", logoutHandler).Methods("POST")
	r.HandleFunc("/api/auth/change-password", changePasswordHandler).Methods("POST")

	// User management endpoints (admin only)
	r.HandleFunc("/api/users", getUsersHandler).Methods("GET")
	r.HandleFunc("/api/users", createUserHandler).Methods("POST")
	r.HandleFunc("/api/users/{id}", updateUserHandler).Methods("PUT")
	r.HandleFunc("/api/users/{id}", deleteUserHandler).Methods("DELETE")

	// Application endpoints (counselor)
	r.HandleFunc("/api/applications", getApplicationsHandler).Methods("GET")
	r.HandleFunc("/api/applications", createApplicationHandler).Methods("POST")
	r.HandleFunc("/api/applications/{id}", getApplicationHandler).Methods("GET")
	r.HandleFunc("/api/applications/{id}", updateApplicationHandler).Methods("PUT")

	// Review endpoints (approver)
	r.HandleFunc("/api/applications/pending", getPendingApplicationsHandler).Methods("GET")
	r.HandleFunc("/api/applications/reviewed", getReviewedApplicationsHandler).Methods("GET")
	r.HandleFunc("/api/applications/{id}/review", reviewApplicationHandler).Methods("POST")

	// Start server
	log.Println("Server started on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": User{
			ID:          "1",
			Name:        "John Doe",
			Email:       "john@example.com",
			Role:        "counselor",
			IsFirstLogin: false,
		},
		"token": "mock-token",
	})
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusOK)
}

func changePasswordHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusOK)
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode([]User{
		{
			ID:          "1",
			Name:        "John Doe",
			Email:       "john@example.com",
			Role:        "admin",
			IsFirstLogin: false,
			CreatedAt:   time.Now(),
		},
		{
			ID:          "2",
			Name:        "Jane Smith",
			Email:       "jane@example.com",
			Role:        "counselor",
			IsFirstLogin: true,
			CreatedAt:   time.Now(),
		},
	})
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusCreated)
}

func updateUserHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusOK)
}

func deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusOK)
}

func getApplicationsHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode([]Application{
		{
			ID:          "1",
			StudentName: "Student One",
			Amount:      5000.00,
			Purpose:     "Tuition",
			Status:      "pending",
			CreatedBy:   "2",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
	})
}

func createApplicationHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusCreated)
}

func getApplicationHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Application{
		ID:          "1",
		StudentName: "Student One",
		Amount:      5000.00,
		Purpose:     "Tuition",
		Status:      "pending",
		CreatedBy:   "2",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	})
}

func updateApplicationHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusOK)
}

func getPendingApplicationsHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode([]Application{
		{
			ID:          "1",
			StudentName: "Student One",
			Amount:      5000.00,
			Purpose:     "Tuition",
			Status:      "pending",
			CreatedBy:   "2",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
	})
}

func getReviewedApplicationsHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode([]Application{
		{
			ID:          "2",
			StudentName: "Student Two",
			Amount:      7500.00,
			Purpose:     "Books and Supplies",
			Status:      "approved",
			CreatedBy:   "2",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			Decision: &Decision{
				ApprovedBy:   "3",
				Decision:     "approved",
				Reason:       "Student meets all requirements",
				DecisionDate: time.Now(),
			},
		},
	})
}

func reviewApplicationHandler(w http.ResponseWriter, r *http.Request) {
	// Implementation would go here
	w.WriteHeader(http.StatusOK)
}
