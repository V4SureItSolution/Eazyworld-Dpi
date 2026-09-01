from flask import Blueprint, jsonify

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return jsonify({
        "message": "Flask backend is working!"
    })

@main.route("/api/test")
def test():
    return jsonify({
        "message": "API is working!"
    })