from flask import Flask, request, render_template
from API import app

def valid_login(username, password):
    return username == "admin" and password == "Holder"

def log_the_user_in(username):
    return f"Welcome, {username}!"



@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['email'], request.form['verifier']):
            return log_the_user_in(request.form['email'])
    else:
        error = 'Invalid username/password'

        #below is used if the request was GET
        return render_template('login.html', error=error)
    

    @app.route('/register', methods=['POST', 'GET'])
    def register():
        #error = None
        if request.method == 'POST':
            if register_new_user(request.form['email'])
