// SPDX-License-Identifier: MIT 
pragma solidity >=0.8.0 <0.9.0;

contract GlieceTasks {

    uint public taskCounter = 0;

    struct Task {
        uint id;
        string title;
        string description;
        bool realized;
        uint  createdAt;
    }

    event TaskCreated(
        uint id,
        string title,
        string description,
        bool realized,
        uint createdAt
    );

    event TaskDone(uint id, bool realized);

    mapping(uint=> Task) public tasks;

    constructor (){
        createTask("Mi primer tarea de ejemplo","jovenes millonarios");
    }

    function createTask(string memory _title , string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter,_title,_description,false,block.timestamp);
        emit TaskCreated(taskCounter, _title,_description,false, block.timestamp);
    }

    function  taskDone(uint _id) public{
        Task memory _task= tasks[_id];
        _task.realized = !_task.realized;
        tasks[_id] = _task;
        emit TaskDone(_id,_task.realized);
    }


    



}