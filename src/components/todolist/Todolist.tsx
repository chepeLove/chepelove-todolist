import React from 'react';
import {Task} from '../task/Task';
import {Button} from "../button/Button";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {TodolistDomainType} from "../../reducers/todolists-reducer";
import {useTodolist} from "./hooks/useTodolist";
import {useTask} from "../task/hooks/useTask";
import {TaskDomainType} from "../../reducers/tasks-reducer";
import s from './Todolist.module.css'
import {useAppSelector} from "../../store/hooks/hooks";
import {RequestStatusType} from "../../reducers/app-reducer";
import {TaskSkeleton} from "../task/taskSkeleton/TaskSkeleton";


type TodolistPropsType = {
    todolist: TodolistDomainType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolist}) => {

        const {id, title, filter, entityStatus} = todolist

        const {removeTodolist, changeTitleTodolist, changeFilterTodolist} = useTodolist()

        const {tasks, getTaskForRender, addTask} = useTask(id)

         const status = useAppSelector<RequestStatusType>(state => state.app.status)

        const tasksForTodolist: TaskDomainType[] = getTaskForRender(tasks, filter)



        const tasksList =
              tasks.length ?
                <ul>
                    {tasksForTodolist?.map(task => {
                        return (
                            <Task
                                key={task.id}
                                todolistId={id}
                                {...task}
                            />
                        )
                    })}
                </ul>
                :
                  status != 'loading' &&  <span>Your task list is empty</span>

        return <div className={s.todolist}>
            <div>
                <Button name={'X'} callBackButton={() => removeTodolist(id)} disabled={entityStatus === 'loading'}/>
                <h3>
                    <EditableSpan
                        value={title}
                        onChangeTitleCallback={(title) => changeTitleTodolist(id, title)}
                        disabled={entityStatus === 'loading'}
                    />
                </h3>
            </div>
            <div>
                <AddItemForm
                    addItem={(title) => addTask(title)}
                    disabled={todolist.entityStatus === 'loading'}
                />
            </div>
            {status === 'loading' && tasks.length === 0 && <TaskSkeleton count={3} />}
            {tasksList}
            <div>
                <Button className={filter === 'all' ? s.buttonTaskFilterActive : s.buttonTaskFilter}
                        name={'All'}
                        callBackButton={() => changeFilterTodolist(id, 'all')}
                />
                <Button className={filter === 'active' ? s.buttonTaskFilterActive  : s.buttonTaskFilter}
                        name={'Active'}
                        callBackButton={() => changeFilterTodolist(id, 'active')}
                />
                <Button className={filter === 'completed' ? s.buttonTaskFilterActive  : s.buttonTaskFilter}
                        name={'Completed'}
                        callBackButton={() => changeFilterTodolist(id, 'completed')}
                />
            </div>
        </div>
    }
)
