from database import create_user, delete_user, get_salt, create_item, delete_item, get_all_user_items, login_user

def db_get_salt(email):
    response = get_salt(email)
    return "" if response is None else response


def db_create_user(email, verifier, salt):
    try:
        return create_user(email, verifier, salt)
    except Exception as e:
        print(f"error creating user: {e}")
        return None


def db_delete_user(guid):
    try:
        return delete_user(guid)
    except Exception as e:
        print(f"error deleting user: {e}")
        return False


def db_create_item(user_guid, name, username, password):
    try:
        guid = create_item(user_guid, name, username, password)
        return guid
    except Exception as e:
        print(f"error creating item: {e}")
        return None


def db_delete_item(item_guid):
    try:
        return delete_item(item_guid)
    except Exception as e:
        print(f"error deleting item: {e}")
        return False


def db_get_all_user_items(user_guid):
    try:
        items = get_all_user_items(user_guid)
        return items
    except Exception as e:
        print(f"error getting user items: {e}")
        return None


def db_login_user(email, verifier):
    try:
        return login_user(email, verifier)
    except Exception as e:
        print(f"error logging in user: {e}")
        return None

      user_data = user_doc.to_dict()

      if user_data["verifier"] != verifier:
          print(f" The verifier does not match.")
          return None
      
      return user_doc.id
   except Exception as e:
      print(f"error logging in user: {e}")
      return None
      
