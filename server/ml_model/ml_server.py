from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True)
model = load('model.sav')
# model = load('LSVC-cleanType.sav')
# model = load('LSVC-removeIntersectTop20.sav')

# nltk.download('stopwords')
# nltk.download('punkt')
# nltk.download('wordnet')
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
nltk.download('omw-1.4')
# Preprocess text
def preprocess_text(text):
    # lowercase
    text = text.lower()
    #remove tagged name
    text = re.sub(r'@\w+\s*', '', text)
    # remove numbers
    text = re.sub(r'\d+', '', text)
    # remove contractions
    text = re.sub(r'\b(\w+)(\'s|\'ve|\'d)\b', r'\1', text)
    # remove special characters
    text = re.sub(r'[_;:()]', '', text)
    #remove puncutation
    text = re.sub(r'[^\w\s]', '', text)
    # Tokenize words
    words = nltk.word_tokenize(text)
    # Lemmatize words
    lemmatized_words = [lemmatizer.lemmatize(word) for word in words]
    # remove stopword
    words = [word for word in lemmatized_words if word not in stop_words and word != '...']
    # join items in list into single string
    processed_text = ' '.join(words)
    print(processed_text)
    return processed_text

@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json()
    text = req['text']
    prediction = model.predict([preprocess_text(text)])
    prediction_list = prediction.tolist()
    return jsonify({'prediction': prediction_list})

if __name__ == '__main__':
    app.run(debug=True)





