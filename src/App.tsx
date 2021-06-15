import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './App.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {createNote, requestNotes, updateNote} from './bll/notesReducer/notesReducer';
import {AppStateType} from "./bll/store";
import {noteType, tagType} from "./dal/notesAPI";
import {createTag, requestTags} from "./bll/tagReducer/tagReducer";
import {Tag} from "./components/tag/tag";
import {Note} from "./components/notes/note";



export const App = () => {
    const notes = useSelector<AppStateType,noteType[]>(state => state.notesReducer.notes)
    const tags = useSelector<AppStateType,tagType[]>(state => state.tagsReducer.tags)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestNotes())
    },[])
    useEffect(()=>{
        dispatch(requestTags())
    },[])



    const [title, setTitle] = useState<string>('');
    const [tag, setTag] = useState<string>('#');

    const onBlurHandler = () => {
        const AllTags = tags.map(el => {
            return [el.tagName]
        })
        if(title.split('').includes()) {
            dispatch(createNote(title))
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)


    }
    const onHashHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTag(e.currentTarget.value)
    }
    const onBlurHashHandler = () => {
        dispatch(createTag(tag))
    }
    const changeNoteTitle = useCallback((id: string,newTitle: string) => {
        dispatch( updateNote(id, newTitle ))
    }, [dispatch])


  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.inner}>
            <input type="text"
                   onBlur={onBlurHandler}
                   value={title} onChange={onChangeHandler}/>
            <div className={styles.notesWrapper}>
                {notes.map(note => {
                    return <Note
                        id={note.id}
                        title={note.title}
                        changeNoteTitle={changeNoteTitle}/>
                })}
            </div>
            <div className={styles.tagsWrapper}>
                {tags.map((tag) => {
                    return <Tag key={tag.id} tagName={tag.tagName} id={tag.id}/>
                })}
            </div>
            <div>
                add hash tag
            </div>
            <input type="text" value={tag}
                   onBlur={onBlurHashHandler}
                   onChange={onHashHandler}/>
        </div>
      </div>
    </div>
  );
}


