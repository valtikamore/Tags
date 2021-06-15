import {Dispatch} from "redux";

import {notesAPI, noteType} from "../../dal/notesAPI";


export const SET_NOTES = 'notesReducer/SET_NOTES' as const;
export const CREATE_NODE = 'notesReducer/CREATE_NODE' as const;
export const UPDATE_NODE = 'notesReducer/UPDATE_NODE' as const;
export const DELETE_NODE = 'notesReducer/DELETE_NODE' as const;



type InitialStateType = {
    notes:noteType[]
}
export const initialState: InitialStateType = {
    notes: [] as noteType[],
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof notesActions>>


export const notesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_NOTES:{
            return ({
                ...state,
                notes: action.payload.notes,
            })
        }
        case CREATE_NODE:{
            const newNote = {
                title:action.payload.title,
                id:''
            }
            return ({
                ...state,
                notes:[...state.notes,newNote]
            })
        }
        case UPDATE_NODE:{
            return ({
                ...state,
               notes : state.notes.map(note => note.id === action.payload.id ? {...note,title:action.payload.title} : note)
            })
        }
        case DELETE_NODE:{
            return ({
                ...state,
                notes:state.notes.filter(n => n.id !== action.payload.id)
            })
        }
        default:
            return state
    }
}

export const notesActions = {
    setNotes(notes: noteType[]) {
        return ({
            type: SET_NOTES,
            payload: {
                notes
            }
        })
    },
    addNote(title:string) {
        return ({
            type:CREATE_NODE,
            payload:{
                title
            }
        })
    },
    updateNoteTitle(id:string,title:string) {
        return ({
            type:UPDATE_NODE,
            payload:{
                id,
                title
            }
        })
    },
    deleteNote(id:string) {
        return ({
            type:DELETE_NODE,
            payload:{
                id
            }
        })
    },

}

export const requestNotes = () => async (dispatch: Dispatch) => {
    try {
        const res = await notesAPI.getNotes()
        dispatch(notesActions.setNotes(res.data))
    }
    catch (err) {
    }
}
export const createNote = (title:string) => async (dispatch: Dispatch) => {
    let res = await notesAPI.createNote(title)
    try {
        dispatch(notesActions.addNote(title))
    }
    catch (err) {
    }
}
export const updateNote = (id:string, title:string) => async (dispatch: Dispatch) => {
    let res = await notesAPI.updateNote(id,title)
    try {
        dispatch(notesActions.updateNoteTitle(id,title))
    }
    catch (err) {
    }
}
export const deleteNote = (id:string) => async (dispatch: Dispatch) => {
    let res = await notesAPI.deleteNode(id)
    try {
        dispatch(notesActions.deleteNote(id))
    }
    catch (err) {
    }
}









