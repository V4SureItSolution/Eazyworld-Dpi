from flask import Blueprint, jsonify, request
import random
import string

main = Blueprint("main", __name__)

# User database seed
users_db = {
    "admin1": {
        "username": "admin1",
        "name": "SANTHOSH K",
        "firstName": "SANTHOSH",
        "lastName": "K",
        "email": "santhosh.k@eazyworldengineering.com",
        "role": "Admin",
        "status": "active",
        "access": "Full (Admin)",
        "fullAccess": True,
        "password": "password123"
    },
    "admin": {
        "username": "admin",
        "name": "RAMA KRISHNAN",
        "firstName": "RAMA",
        "lastName": "KRISHNAN",
        "email": "ramakrishnan@eazyworldengineering.com",
        "role": "Admin",
        "status": "active",
        "access": "Full (Admin)",
        "fullAccess": True,
        "password": "password123"
    }
}

# View Evaluation Database Seed
evaluations_list_db = [
    {
        "id": 1,
        "formTitle": "SAFE OPERATION OF CRANE",
        "operator": "BABA NAIK.J",
        "evaluationDate": "2026-04-10"
    }
]

@main.route("/")
def home():
    return jsonify({"message": "Flask backend is working!"})

@main.route("/api/test")
def test():
    return jsonify({"message": "API is working!"})

# Auth routes
@main.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    username = data.get("username") or data.get("name") or (email.split("@")[0] if email and "@" in email else email)
    name = data.get("name") or username

    user_obj = {
        "username": username,
        "name": name,
        "email": email,
        "role": "Admin",
        "status": "active",
        "access": "Full (Admin)",
        "password": str(password)
    }
    users_db[username] = user_obj
    users_db[email] = user_obj

    return jsonify({"message": "User registered successfully", "user": user_obj}), 201

@main.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    user = users_db.get(email) or users_db.get(email.lower())
    if not user or str(user["password"]) != str(password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "username": user.get("username", email),
            "email": user.get("email", email),
            "name": user.get("name", "User")
        }
    }), 200

# User Management Endpoints
@main.route("/api/users", methods=["GET"])
def get_users():
    unique_users = {u["username"]: u for u in users_db.values()}
    return jsonify(list(unique_users.values())), 200

# Evaluations List Endpoints
@main.route("/api/evaluations-list", methods=["GET"])
def get_evaluations_list():
    return jsonify(evaluations_list_db), 200