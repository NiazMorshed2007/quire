import React, { FC, FormEvent, useContext, useState } from "react";
import TreeSingleTask from "./TreeSingleTask";
import useClickOutside from "../../hooks/useClickOutside";
import { ITask } from "../../interfaces/TaskInterface";
import { setId } from "../../functions/SetId";
import { Orgs } from "../../context/orgs";
import { MyTasks } from "../../context/myTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// import {DragDropContext} from "react-beautiful-dnd";

interface Props {
  tasks: ITask[];
  type: "USER" | "PRJ";
}

const Tree: FC<Props> = ({ tasks, type }) => {
  const { orgs, setOrgs } = useContext(Orgs);
  const [taskText, setTaskText] = useState<string>("");
  const { myTasks, setMyTasks } = useContext(MyTasks);
  const globalTask = type === "PRJ" ? tasks : myTasks;
  const [priority, setPriority] = useState<string>("none");
  const handleAdd = (e: FormEvent): void => {
    e.preventDefault();
    if (taskText !== "") {
      const new_task: ITask = {
        task_name: taskText,
        task_id: setId(taskText),
        task_status: "todo",
        task_priority: "none",
      };
      if (type === "PRJ") {
        tasks.push(new_task);
        setOrgs([...orgs]);
      } else if (type === "USER") {
        myTasks.push(new_task);
        setMyTasks([...myTasks]);
      }
    }
    setTaskText("");
  };

  const handlePriority = (index: string): void => {
    if (type === "PRJ") {
      // eslint-disable-next-line array-callback-return
      tasks.filter((task) => {
        if (task.task_id === index) {
          console.log(priority);
          task.task_priority = priority;
        }
      });
    } else if (type === "USER") {
      // eslint-disable-next-line array-callback-return
      myTasks.filter((task) => {
        if (task.task_id === index) {
          task.task_priority = priority;
        }
      });
    }
    setOrgs([...orgs]);
  };

  const handleCompleted = (index: string): void => {
    if (type === "PRJ") {
      // eslint-disable-next-line array-callback-return
      tasks.filter((task) => {
        if (task.task_id === index) {
          task.task_status === "completed"
            ? (task.task_status = "todo")
            : (task.task_status = "completed");
        }
      });
    } else if (type === "USER") {
      // eslint-disable-next-line array-callback-return
      myTasks.filter((task) => {
        if (task.task_id === index) {
          task.task_status === "completed"
            ? (task.task_status = "todo")
            : (task.task_status = "completed");
        }
      });
    }
    setOrgs([...orgs]);
  };

  const handleDelete = (id: string): void => {
    const delete_index: number = tasks
      ? tasks.findIndex(({ task_id }) => task_id === id)
      : myTasks && myTasks.findIndex(({ task_id }) => task_id === id);
    if (type === "PRJ") {
      tasks.splice(delete_index, 1);
      setOrgs([...orgs]);
    } else if (type === "USER") {
      myTasks.splice(delete_index, 1);
      setMyTasks([...myTasks]);
    }
  };
  let addingRef = useClickOutside(() => {
    setShowAddingOptionInput(false);
  });
  const [showAddingOptionInput, setShowAddingOptionInput] =
    useState<boolean>(false);
  return (
    <div className="tree">
      <DragDropContext
        onDragEnd={(...param) => {
          const srcI: number = param[0].source.index;
          const desI: any = param[0].destination?.index;
          if (type === "PRJ") {
            tasks.splice(desI, 0, tasks.splice(srcI, 1)[0]);
            setOrgs([...orgs]);
          } else if (type === "USER") {
            myTasks.splice(desI, 0, myTasks.splice(srcI, 1)[0]);
            setOrgs([...orgs]);
          }
        }}
      >
        <Droppable droppableId={"droppable-1"}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="tasks-wrapper pb-3 d-flex flex-column"
              {...provided.droppableProps}
            >
              {globalTask.map((task, i) => (
                <Draggable
                  key={task.task_id + "-" + i}
                  draggableId={"draggable-" + task.task_id}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TreeSingleTask
                        completedFunc={() => handleCompleted(task.task_id)}
                        handlePriority={() => handlePriority(task.task_id)}
                        dltfunc={() => handleDelete(task.task_id)}
                        name={task.task_name}
                        status={task.task_status}
                        setPriority={setPriority}
                        priority={task.task_priority}
                        key={task.task_id + "-" + i}
                      ></TreeSingleTask>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div ref={addingRef} className="adding-option">
        {showAddingOptionInput ? (
          <form onSubmit={handleAdd} className="w-100">
            <input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="h-100"
              placeholder="Enter your task name"
              type="text"
            />
          </form>
        ) : (
          <p
            onClick={() => setShowAddingOptionInput(true)}
            className="m-0 pb-2 px-2 text-silver pointer"
          >
            Click here to add task
          </p>
        )}
      </div>
    </div>
  );
};

export default Tree;
