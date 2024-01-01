import requests
import json
import base64


def add_product(token):
    url = 'http://localhost:8080/api/v1/product/create'
    product_data = {
        "productName": "Couch",
        "buyPrice": 10,
        "sellPrice": 15,
        "quantity": 11,
        "description": "A sick couch"
    }

    product_json = json.dumps(product_data)

    file_path = 'couche.jpg'
    files = {
        'image': ('image.jpg', open(file_path, 'rb'), 'image/jpeg'),
        'product': (None, product_json, 'application/json'),
    }

    headers = {'Authorization': f'Bearer {token}'}
    response = requests.post(url, files=files, headers=headers)
    # response = requests.post(url, files=files)
    print(response)
    print(response.text)


def update_by_id(id, token):
    url = f'http://localhost:8080/api/v1/product/update/{id}'
    product_data = {
        "productName": "Brick",
        "description": "A cool brick",
        "buyPrice" : 22
    }
    product_json = json.dumps(product_data)
    files = {
        'product': (None, product_json, 'application/json'),
    }
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.patch(url, files=files, headers=headers)
    print(response.text)



def get_all_products():
	url = 'http://localhost:8080/api/v1/product/all'
	r = requests.get(url)	
	print(r)


def get_product(UUID):
	url = f'http://localhost:8080/api/v1/product/{UUID}'
	r = requests.get(url)
	print(r)
	return r.content

def save_image(jsonbody):
	data = json.loads(jsonbody)
	base64_image_string = data["image"]	
	image_data = base64.b64decode(base64_image_string)
	with open('output_image.jpg', 'wb') as file:
	    file.write(image_data)
	    

def remove_by_id(id, amount, token):
    url = f'http://localhost:8080/api/v1/product/remove/{id}?amount={amount}'
    headers = {'Authorization': f'Bearer {token}'}
    r = requests.post(url, headers=headers)
    print(r.text)

def add_by_id(id, amount, token):
    url = f'http://localhost:8080/api/v1/product/add/{id}?amount={amount}'
    headers = {'Authorization': f'Bearer {token}'}
    r = requests.post(url, headers=headers)
    print(r.text)


def login(username, password):
    url = "http://localhost:8080/api/v1/auth/login"
    payload = {
        "username": username,
        "password": password
    }
    r = requests.post(url, json=payload)
    response_str = r.content.decode('utf-8')
    response_json = json.loads(response_str)
    token = response_json['payload']['token']
    return token

def register(username, password):

    url = "http://localhost:8080/api/v1/user/register"
    payload = {
          "username" : username,
          "password" : password
    }
    r = requests.post(url, json=payload)
    print(r)
    print(r.content)


# --------------------------------------------------------------


def add_product_v2(token):
    url = 'http://localhost:8080/api/v2/product/create'
    product_data = {
        "productName": "Couch",
        "buyPrice": 10,
        "sellPrice": 15,
        "quantity": 11,
        "description": "A sick couch"
    }

    product_json = json.dumps(product_data)

    file_path = 'couche.jpg'
    files = {
        'image': ('image.jpg', open(file_path, 'rb'), 'image/jpeg'),
        'product': (None, product_json, 'application/json'),
    }

    headers = {'Authorization': f'Bearer {token}'}
    response = requests.post(url, files=files, headers=headers)
    print(response)
    print(response.text)

def get_product_by_id_v2(UUID):
    url = f'http://localhost:8080/api/v2/product/{UUID}'
    r = requests.get(url)
    print(r)
    print(r.content)
    return r 

def get_image_by_id_v2(UUID):
    url = f'http://localhost:8080/api/v2/image/{UUID}'
    r = requests.get(url)
    print(r)
    print(r.content)
    return r 

def get_all_products_v2():
    url = 'http://localhost:8080/api/v2/product/all'
    r = requests.get(url)	
    print(r)
    print(r.content)
     


# x = login("admin", "admin")
# add_product_v2(x)

# get_product_by_id_v2("8d0cea24-adc6-4466-98fa-5f0d1505460f")

# get_image_by_id_v2("2d31e68a-ade1-48f0-a5dd-c5cd519ea7cc")

get_all_products_v2()