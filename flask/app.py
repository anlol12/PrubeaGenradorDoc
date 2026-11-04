from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hola mundo, desde Programación y más!'

if __name__ == "__main__":
    app.run(debug=True)