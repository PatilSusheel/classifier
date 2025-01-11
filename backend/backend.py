from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import io

app = Flask(__name__)
CORS(app)
MODEL_PATH = 'C:/projects/classifier/backend/cat_dog_classifier.h5'
model = load_model(MODEL_PATH)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        image = image.resize((128, 128))  
        image = img_to_array(image) / 255.0  
        image = np.expand_dims(image, axis=0)  

        prediction = model.predict(image)
        pred = "Dog" if prediction[0] > 0.5 else "Cat"
        confidence_score = float(prediction[0][0]) if pred == "Dog" else float(1 - prediction[0][0])

        return jsonify({
            'message': 'File processed successfully',
            'predicted_class': pred,
            'confidence': confidence_score
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
