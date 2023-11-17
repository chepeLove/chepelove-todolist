import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type {AppDispatch, AppRootStateType} from "../store"

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>() //для санок
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector