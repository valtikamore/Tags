import React, {FC, useCallback, useState} from 'react'
import { useDispatch } from 'react-redux';

import {deleteNote} from "../../bll/notesReducer/notesReducer";



type note = {
    changeNoteTitle:(id:string,newTitle:string) => void
    id:string
    title:string
}
export const Note:FC<note> = ({changeNoteTitle,id,title}) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('');

    const changeNoteTitleHandler = useCallback((title: string) => {
        changeNoteTitle(title,id)
    }, [id,changeNoteTitle])

    const onClickHandler = () => {
        dispatch(deleteNote(id))
    }
    const onChangehandler = (e:any) => {
        setText(e.currentTarget.value)
    }
    const onBlurHandler = (e:any) => {
        changeNoteTitle(id,text)
    }
    return (
        <div>
            <div>{title}</div>
            <input type="text"
                   onBlur={onBlurHandler}
                   value={text} onChange={onChangehandler}/>
            <button onClick={onClickHandler}>remove</button>
        </div>
    )
}
