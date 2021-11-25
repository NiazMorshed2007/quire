import React, { FC, useContext } from "react";
import { ITask } from "../../interfaces/TaskInterface";
import { IStatuses } from "../../interfaces/statusesInterface";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Orgs } from "../../context/orgs";
import {
  AiFillEyeInvisible,
  BsBox,
  BsPencil,
  BsThreeDots,
} from "react-icons/all";
import { Dropdown, Menu } from "antd";

const { SubMenu } = Menu;

interface props {
  statuses: IStatuses[];
  tasks: ITask[];
}

const Board: FC<props> = (props) => {
  const { statuses, tasks } = props;
  const { orgs, setOrgs } = useContext(Orgs);
  return (
    <>
      <div className="board h-100 custom-scrollbar">
        <DragDropContext
          onDragEnd={(...param) => {
            const srcI: number = param[0].source.index;
            const desI: any = param[0].destination?.index;
          }}
        >
          <Droppable droppableId={"droppable-1"}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="statuses-wrapper d-flex align-items-center gap-5"
              >
                {statuses.map((status, i) => (
                  <Draggable
                    key={status.id}
                    draggableId={"draggable-" + status.id}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        className="single-status border shadow-sm"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="status-head border-bottom bg-white d-flex align-items-center justify-content-between">
                          <div className="left gap-2 d-flex align-items-center">
                            <h5 className="text-silver m-0">{status.name}</h5>
                            <span className="text-silver status-list-length d-flex align-items-center justify-content-center">
                              {
                                tasks.filter(
                                  (task) => task.task_status === status.id
                                ).length
                              }
                            </span>
                          </div>
                          <div className="right">
                            <Dropdown
                              trigger={["click"]}
                              overlay={
                                <Menu>
                                  <Menu.Item
                                    key="hide"
                                    icon={<AiFillEyeInvisible />}
                                  >
                                    Hide Column
                                  </Menu.Item>
                                  <Menu.Item
                                    key="hide-everyone"
                                    icon={<AiFillEyeInvisible />}
                                  >
                                    Hide Column for everyone
                                  </Menu.Item>
                                  <Menu.Divider />
                                  <Menu.Item key="peekaboo" icon={<BsBox />}>
                                    Peekaboo all tasks in this column
                                  </Menu.Item>
                                  <Menu.Divider />
                                  <SubMenu
                                    key="edit-sub"
                                    icon={<BsPencil />}
                                    title={"Edit status"}
                                  >
                                    <Menu>{/*    */}</Menu>
                                  </SubMenu>
                                </Menu>
                              }
                            >
                              <i className="text-silver pointer">
                                <BsThreeDots />
                              </i>
                            </Dropdown>
                          </div>
                        </div>
                        <div className="status-lists-wrapper bg-silver custom-scrollbar overflow-auto">
                          <DragDropContext
                            onDragEnd={(...param) => {
                              const srcI: number = param[0].source.index;
                              const desI: any = param[0].destination?.index;
                            }}
                          >
                            <Droppable droppableId={"droppable-card-1"}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  className="status-inner-lists d-flex flex-column gap-2 justify-content-center"
                                >
                                  {tasks
                                    .filter((task, i) => {
                                      return task.task_status === status.id;
                                    })
                                    .map((task) => (
                                      <Draggable
                                        draggableId={"draggable-" + i}
                                        index={i}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            className="single-list w-100 border bg-white"
                                            key={task.task_id}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            {task.task_name}
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
