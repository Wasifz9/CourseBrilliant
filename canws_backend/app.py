import datetime
import os
import json
from src import create_app
from db.db import db_init, db_destroy
from flask_cors import CORS


app = create_app()
CORS(app)

db_init()

if __name__ == "__main__":
    app.run(debug=True, port=5001)
   # db_destroy()
