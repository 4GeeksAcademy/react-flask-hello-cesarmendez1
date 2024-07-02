"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/usuario', methods=['GET'])
@jwt_required()
def get_user():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg":"usuario no encontrado"}),400
    return jsonify({"user":user.serialize()}),200

   

   

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
@api.route('/login', methods=['POST'])
def login():
    email=request.json.get("email",None)
    password=request.json.get("password",None)
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg":"usuario no encontrado"}),404
    valid_password=current_app.bcrypt.check_password_hash(user.password,password)
    if valid_password is None:
        return jsonify({"msg":"password invalido"}),404
    access_token=create_access_token(identity=email)
    return jsonify(access_token=access_token),200