import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    setNewNoteTitle: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.setNewNoteTitle(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ?    <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <div onDoubleClick={activateEditMode}>{props.value}  <button onClick={activateEditMode}>update</button></div>
});
