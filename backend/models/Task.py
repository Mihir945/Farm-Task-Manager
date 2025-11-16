from datetime import datetime

from pydantic import BaseModel,Field
from typing import Union

class Task(BaseModel):
    title:str  = Field(...)
    desc:str  = Field(...)
    is_complete:Union[bool,None] = False 
    created_at:datetime = Field(default=datetime.now())


def tranformTask(Task):
    Task["_id"] = str(Task['_id'])
    return Task