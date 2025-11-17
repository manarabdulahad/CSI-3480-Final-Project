from flask import Flask, request, jsonify
from Func import db_get_salt, db_register_user

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "<p>Hello, World!</p>"

@app.route("/get-salt", methods=["GET"])
def get_salt():
  email = request.args.get("email")
  salt = db_get_salt(email)

  return jsonify({ "salt": salt })

@app.route("/register", methods=["POST"])
def register():
  data = request.json
  email = data["email"]
  salt = data["salt"]
  verifier = data["verifier"]

  success = db_register_user(email, salt, verifier)
  if success:
      return "", 201
  return "", 400

@app.route("/login", methods=["POST"])
def login():
  data = request.json
  email = data["email"]
  verifier = data["verifier"]

  return "", 200
