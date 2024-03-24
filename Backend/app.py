from flask import Flask, jsonify, request,make_response
from flask_cors import CORS,cross_origin
from flask_pymongo import PyMongo
import bcrypt

app = Flask(__name__)
app.config["MONGO_DBNAME"]="Flask_React"
app.config["MONGO_URI"] = "mongodb://localhost:27017/Flask_React"
mongo = PyMongo(app)
CORS(app,supports_credentials=True)


@app.route("/")
@cross_origin()
def start():
    return "<p>Hello from backend</p>"


@app.route("/login", methods=['POST', 'OPTIONS'])
@cross_origin(origins=['http://localhost:3000'])
def login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Request data must be in JSON format"}), 400

        data = request.get_json()
        users = mongo.db.users
        login_user = users.find_one({'email': data['email']})
        if login_user:
            hashed_password = login_user['password']
            provided_password = data['password']
            if bcrypt.checkpw(provided_password.encode('utf-8'), hashed_password):
                return jsonify({login_user['firstName']}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    else:
        return jsonify({"error": "Method not allowed"}), 405


@app.route("/register", methods=['POST', 'OPTIONS'])
@cross_origin(origins=['http://localhost:3000'])
def register():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Request data must be in JSON format"}), 400

        data = request.get_json()
        users = mongo.db.users
        existing_user = users.find_one({'email': data['email']})
        if existing_user is None:
            hashpass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
            users.insert_one({
                'firstName': data['firstName'],
                'lastName': data['lastName'],
                'email': data['email'],
                'password': hashpass
            })
            return jsonify({"message": "Registered successfully"}), 200
        else:
            return jsonify({"message": "User already exists"}), 409
    else:
        return jsonify({"error": "Method not allowed"}), 405
   
if __name__ == "__main__":
    app.run(debug=True)
