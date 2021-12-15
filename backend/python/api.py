from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlsplit, parse_qs
from csv import reader
from json import dumps

host_name = ""
host_port = 8080
data_path = 'data.txt'

def get_data():
	data = {}
	with open(data_path, encoding='utf-8') as data_file:
		data_reader = reader(data_file, delimiter=';', quotechar="|")
		for row in data_reader:
			data[row[0]] = row[1:]
	return data

def get_food(food_id):
	data = get_data()
	food = ""
	try:
		food = data[food_id]
	except:
		print("Food not found")
	return food
	
def get_all():
	data = get_data()
	return data

class MyServer(BaseHTTPRequestHandler):
	def do_GET(self):

		food_id = urlsplit(self.path).path[1:]
		if food_id == '':
			content = get_all()
		else:
			content = get_food(food_id)
		
		response = dumps(content)

		self.send_response(200)
		self.send_header('Content-type', 'application/json')
		self.send_header('Access-Control-Allow-Origin', '*')
		self.end_headers()

		self.wfile.write(response.encode())

def main():
	myServer = HTTPServer((host_name, host_port), MyServer)
	print("Server running on port ", host_port)
	try:
		myServer.serve_forever()
	except KeyboardInterrupt:
		print("Exiting...")
		myServer.server_close()

if __name__ == "__main__":
	main()