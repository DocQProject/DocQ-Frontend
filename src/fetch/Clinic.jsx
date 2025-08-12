import axios from "axios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NSwibG9naW5JZCI6IuyVhOydtOuUlCIsIm5hbWUiOiLshJzsp4Dsm5AiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTc1NTAyNDEzOSwiaWF0IjoxNzU0OTgwOTM5fQ.So70bfnAhTffjVLaFNHXXu2WNSOyNwK0FuqvI3WK6Vvd_lYvrPhvlU2kh9ZauYl9502nzxoezchhUdLibI6azQ"

export function fetchDepartments() {
    return axios.get(
        "http://localhost:8080/api/clinics/departments", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}