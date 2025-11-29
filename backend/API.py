from flask import Flask, request, jsonify
from Func import (
    db_get_salt, db_create_user, db_delete_user,
    db_create_item, db_delete_item, db_get_all_user_items,
    db_login_user
)

app = Flask(__name__)

@app.route("/")
def hello():
    return "API running"


@app.route("/get-salt", methods=["GET"])
def get_salt_route():
    email = request.args.get("email")
    salt = db_get_salt(email)
    return jsonify({"salt": salt}), 401 if salt == "" else 200


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data["email"]
    salt = data["salt"]
    verifier = data["verifier"]

    guid = db_create_user(email, verifier, salt)

    if guid is None:
        return "", 400

    return jsonify({"guid": guid}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    verifier = data["verifier"]

    guid = db_login_user(email, verifier)

    if guid is None:
        return jsonify({"error": "invalid login"}), 403

    return jsonify({"guid": guid}), 200


@app.route("/item/create", methods=["POST"])
def create_item_route():
    data = request.json

    user_guid = data["user_guid"]
    name = data["name"]
    username = data["username"]
    password = data["password"]

    guid = db_create_item(user_guid, name, username, password)

    if guid is None:
        return {"error": "could not save item"}, 500

    return {"guid": guid}, 201


@app.route("/item/delete/<item_guid>", methods=["DELETE"])
def delete_item_route(item_guid):
    success = db_delete_item(item_guid)

    if success:
        return "", 204

    return {"error": "item not found"}, 404


@app.route("/item/list", methods=["GET"])
def get_items_route():
    user_guid = request.args.get("user_guid")

    items = db_get_all_user_items(user_guid)

    if items is None:
        return {"error": "could not retrieve items"}, 500

    return jsonify({"items": items}), 200
