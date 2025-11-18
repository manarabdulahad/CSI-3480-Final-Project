from database import create_user, delete_user, get_salt, create_item, delete_item

def db_get_salt(email):
  response = get_salt(email)
  if response is None:
      return ""
  return response

def db_register_user(email, salt, verifier):
  return create_user(email, salt, verifier)


def db_delete_user(guid):
  return delete_user(guid)

def db_create_item(user_guid, name, username, password):
  return create_item(user_guid, name, username, password)