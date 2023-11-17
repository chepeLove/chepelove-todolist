import {
     updateTaskTC,
    createTaskTC, deleteTaskTC,
    setTasksTC,
} from "../../../reducers/tasks-reducer";
import {useCallback, useEffect} from "react";
import {FilterValuesType} from "../../../reducers/todolists-reducer";
import {TasksStatuses, TaskType} from "../../../api/api";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/hooks";

export const useTask = (todolistId:string) => {

    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    }, []);

    const addTask= useCallback((taskTitle:string)=>{
        dispatch(createTaskTC(todolistId, taskTitle))
    },[dispatch])

    const removeTask = useCallback((id: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const changeTaskStatus = useCallback((status: TasksStatuses, id: string) => {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, [dispatch])

    const changeTitleTask = useCallback((title: string, id: string) => {
        dispatch(updateTaskTC(todolistId, id, {title}))
    }, [dispatch])

    const getTaskForRender = (tasks: TaskType[], filter: FilterValuesType) => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => task.status === TasksStatuses.New)
            case 'completed':
                return tasks.filter(task => task.status === TasksStatuses.Completed)
            default:
                return tasks
        }
    }

    return {
        tasks,
        removeTask,
        changeTaskStatus,
        changeTitleTask,
        addTask,
        getTaskForRender
    }
}