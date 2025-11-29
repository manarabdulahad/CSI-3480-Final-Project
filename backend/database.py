def login_user(email, verifier):
    users_ref = db.collection('users')
    user_docs = users_ref.where('email', '==', email).get()

    if not user_docs:
        print(f" No user found with email {email}.")
        return None
    
    user_data = user_docs[0].to_dict()

    if user_data.get("verifier") != verifier:
        print(f" Verifier does not match for {email}.")
        return None

    print(f" User with email {email} logged in successfully.")
    return user_docs[0].id
