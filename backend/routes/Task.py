from fastapi import APIRouter,HTTPException
from models.Task import Task as TaskModel , tranformTask
from config.db import db as MongoDB
import bson

taskCollection = MongoDB['task']

router = APIRouter(prefix="/api/v1")

# Todo: create new Task
@router.post("/create",tags=["Task"])
async def createTask(task:TaskModel):
    await taskCollection.insert_one(task.dict())

    return {
        "msg":"Task Created !"
    }



# Todo: Get All Task
@router.get("/get",tags=["Task"])
async def getAllTasks():
    docs = taskCollection.find({})
    tasks = []
    async for task in docs:
        tasks.append(tranformTask(task))
    return tasks

# Todo: update Task status By Id
@router.patch("/update/{id}",tags=["Task"])
async def updateTask(id:str):
    if(not bson.ObjectId.is_valid(id) ):
        raise HTTPException(400,"Id Not Valid")
    
    await taskCollection.update_one({"_id":bson.ObjectId(id)},{
        "$set":{
            "is_complete":True
        }
    })

    return {
        "msg":"Task Update"
    }






# Todo: delete Task By Id
@router.delete("/delete/{id}",tags=["Task"])
async def deleteTask(id:str):
    if(not bson.ObjectId.is_valid(id) ):
        raise HTTPException(400,"Id Not Valid")
    
    await taskCollection.delete_one({"_id":bson.ObjectId(id)})

    return {
        "msg":"Task Delete"
    }


# Todo: Get Task By Id
@router.get("/get/{id}",tags=["Todo"])
async def getById(id:str):
    pass


# Todo: update Task By Id
@router.put("/update/{id}",tags=["Todo"])
async def updateById(id:str):
    pass