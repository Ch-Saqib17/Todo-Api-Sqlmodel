import pytest
from fastapi.testclient import TestClient
from main import app, engine, Todo, TodoCreate


@pytest.fixture(scope="module")
def test_db():
    Todo.metadata.create_all(engine)
    yield
    Todo.metadata.drop_all(engine)


@pytest.fixture
def client(test_db):
    with TestClient(app) as c:
        yield c


def test_create_todo(client):
    todo_data = {"name": "Test Todo", "description": "Test Description"}
    response = client.post("/todo/add", json=todo_data)
    assert response.status_code == 200
    assert response.json()["name"] == todo_data["name"]
    assert response.json()["description"] == todo_data["description"]


def test_get_all_todos(client):
    response = client.get("/todo")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_todo(client):
    todo_data = {"name": "Updated Todo", "description": "Updated Description"}
    response_create = client.post("/todo/add", json=todo_data)
    assert response_create.status_code == 200
    todo_id = response_create.json()["id"]

    updated_todo_data = {"name": "New Updated Todo", "description": "New Updated Description"}
    response_update = client.put(f"/todo/update/{todo_id}", json=updated_todo_data)
    assert response_update.status_code == 200
    assert response_update.json()["name"] == updated_todo_data["name"]
    assert response_update.json()["description"] == updated_todo_data["description"]


def test_delete_todo(client):
    todo_data = {"name": "Delete Test Todo", "description": "Delete Test Description"}
    response_create = client.post("/todo/add", json=todo_data)
    assert response_create.status_code == 200
    todo_id = response_create.json()["id"]

    response_delete = client.delete(f"/todo/delete/{todo_id}")
    assert response_delete.status_code == 200
    assert response_delete.json()["message"] == "Todo deleted successfully"


def test_get_nonexistent_todo_returns_404(client):
    response = client.get("/todo/999")
    assert response.status_code == 404
