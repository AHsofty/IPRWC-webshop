import requests
import json
import base64


def add_product():
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

	response = requests.post(url, files=files)

	print(response.text)


def update_by_id(id):
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
	response = requests.patch(url, files=files)



def get_all_products():
	url = 'http://localhost:8080/api/v1/product/all'
	r = requests.get(url)	
	print(r.content)


def get_product(UUID):
	url = f'http://localhost:8080/api/v1/product/{UUID}'
	r = requests.get(url)
	return r.content

def save_image(jsonbody):
	data = json.loads(jsonbody)
	base64_image_string = data["image"]	
	image_data = base64.b64decode(base64_image_string)
	with open('output_image.jpg', 'wb') as file:
	    file.write(image_data)
	    
def remove_by_id(id, amount):
	url = f'http://localhost:8080/api/v1/product/remove/{id}?amount={amount}'
	r = requests.post(url)	
	print(r)


def add_by_id(id, amount):
	url = f'http://localhost:8080/api/v1/product/add/{id}?amount={amount}'
	r = requests.post(url)	
	print(r)


