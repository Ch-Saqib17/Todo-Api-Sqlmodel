from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, create_engine, Session, Field, select
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from typing import Annotated, Optional


load_dotenv()


class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str


class TodoCreate(SQLModel):
    name: str
    description: str


class TodoResponse(SQLModel):
    id: int
    name: str
    description: str


Url: str = os.getenv("DATABASE_URL")

engine = create_engine(Url)

app: FastAPI = FastAPI(
    title="Todo Api",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_data():
    with Session(engine) as session:
        yield session


@app.get("/")
def get_all(db: Annotated[Session, Depends(get_data)]):
    todos = db.exec(select(Todo)).all()
    return todos


@app.post("/todo/add", response_model=TodoResponse)
def create_todo(todo: TodoCreate, session: Annotated[Session, Depends(get_data)]):
    db_todo = Todo.model_validate(todo)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


@app.put("/todo/update/{id}", response_model=TodoResponse)
def update_todo(
    id: int, todo: TodoCreate, session: Annotated[Session, Depends(get_data)]
):
    db_todo = session.get(Todo, id)
    if db_todo:
        db_todo.name = todo.name
        db_todo.description = todo.description
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
        return db_todo
    return {"message": "Todo Update"}


@app.delete("/todo/delete/{id}")
def delete_todo(id: int, session: Annotated[Session, Depends(get_data)]):
    db_todo = session.get(Todo, id)
    if db_todo:
        session.delete(db_todo)
        session.commit()
        return {"message": "Todo deleted successfully"}
    return {"message": "Todo not found"}
