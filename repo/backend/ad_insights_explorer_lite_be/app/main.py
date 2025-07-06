import pandas as pd
from fastapi import FastAPI

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",  # Your React app's origin
    "http://localhost:8000",  # Your React app's origin
    # Add other origins if needed for deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/general/posts')
async def posts():
       
    json_url = "https://jsonplaceholder.typicode.com/posts"
    try:
        df = pd.read_json(json_url)
        transponded = df.T
        print(transponded)
        return transponded.to_dict()
    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}

@app.get('/anomalies/same_user_and_title')
async def anomalies():
    json_url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        df = pd.read_json(json_url)
        df['title'] = df['title'].astype('str')
        anomalies = pd.DataFrame({'count': df.groupby(["userId","title"]).size()}).reset_index()
        result = anomalies[anomalies['count'] > 1]
        transpond = result.T
        print(result)
        return transpond.to_dict()
    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}


@app.get('/anomalies/same_user_and_title_greater_than_5')
async def anomalies():
    json_url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        df = pd.read_json(json_url)
        anomalies = pd.DataFrame({'count': df.groupby(["userId","title"]).size()}).reset_index()
        result = anomalies[anomalies['count'] > 5]
        transpond = result.T
        return transpond.to_dict()
    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}

@app.get('/anomalies/titles_less_than_15')
async def anomalies():
    json_url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        df = pd.read_json(json_url)
        df['title'] = df['title'].astype('str')
        
        mask = df["title"].str.len()<15
        df = df.loc[mask]
        transpond = df.T
        return transpond.to_dict()
    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}
    
@app.get('/summary/max_title_words')
async def summary():
    json_url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        df = pd.read_json(json_url)

        df['word_count'] = df['title'].str.split().apply(len)
        df_sorted = df.sort_values(by='word_count', ascending=False)
        transponded = df_sorted.T
        print(transponded)
        return transponded.to_dict()

    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}

@app.get('/summary/top_title_words')
async def summary():
    json_url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        df = pd.read_json(json_url)

        word_count = {}
        for index, row in df.iterrows():
            for word in row['title'].split():
                word_count[word] = word_count.get(word, 0) + 1
        sorted_words_by_occurrence = sorted(word_count.items(), key=lambda x:x[1], reverse=True)
        
        df = pd.DataFrame.from_dict(sorted_words_by_occurrence)
        df.columns=["word", "count"]
        new_column_order = ["count", "word"]

        df_swapped = df[new_column_order]
        transponded = df_swapped.T
        return transponded.to_dict()
    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}
    
@app.get('/summary/top_3_users')
async def summary():
    json_url = "https://jsonplaceholder.typicode.com/posts"
    
    try:
        df = pd.read_json(json_url)
        df['word_count'] = df['title'].str.split().apply(len)
        df_sorted = df.sort_values(by='word_count', ascending=False)
        df_distinct_user_id = df_sorted.drop_duplicates(subset='userId', keep='first')
        top_3_distinct_user_id = df_distinct_user_id.head(3)
        transposed = top_3_distinct_user_id.T
        dict_data = transposed.to_dict()
        return dict_data

    except Exception as e:
        return {"Error Reading JSON from URL": str(e)}
