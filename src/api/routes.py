"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/registro', methods=['POST'])
def create_user():
    body=json.loads(request.data)
    newuser=User(
        email=body["email"],
        name=body["name"],
        username=body["username"],
        password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8'),
    )
    db.session.add(newuser)
    db.session.commit()
    return jsonify({"msg":"usuario creado con exito"}),200