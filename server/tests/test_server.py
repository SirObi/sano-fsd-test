import requests

def test_get_studies():
    studies = requests.get('http://localhost:5000/studies').json()
    assert studies
    assert 'description' in studies[0].keys() and 'researcher_email' in studies[0].keys()
