import React, {FC, useEffect} from 'react'
import styles from './tag.module.scss'
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import {deleteTag, requestTags} from "../../bll/tagReducer/tagReducer";

type TagPropsType = {
    tagName:string
    id:string
}
export const Tag:FC<TagPropsType> = ({tagName,id}) => {
    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(deleteTag(id))
    }

    // const onClickfilter = () => {
    //     if()
    // }
    return (
        <div className={styles.tag} >
            {tagName}
            <div className={styles.deleteButton} onClick={onClickHandler}>
                <RiCloseLine/>
            </div>

        </div>
    )
}
