# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_post():
    response = client.get("/general/posts")
    assert response.status_code == 200 

def test_read_anomalies_user_title():
    response = client.get("/anomalies/same_user_and_title")
    assert response.status_code == 200
    
def test_read_anomalies_greater_than_5():
    response = client.get("/anomalies/same_user_and_title_greater_than_5")
    assert response.status_code == 200

def test_read_anomalies_user_title_less_than_15():
    response = client.get("/anomalies/titles_less_than_15")
    assert response.status_code == 200
    
def test_read_summary_max_words():
    response = client.get("/summary/max_title_words")
    assert response.status_code == 200

def test_read_summary_top_title_words():
    response = client.get("/summary/top_title_words")
    assert response.status_code == 200
    
def test_read_summary_top_3():
    response = client.get("/summary/top_3_users")
    assert response.status_code == 200