import {Dispatch} from "redux";

import { tagsAPI, tagType} from "../../dal/notesAPI";




export const SET_TAGS= 'tagsReducer/SET_NOTES' as const;
export const CREATE_TAG = 'tagsReducer/CREATE_TAG' as const;
export const DELETE_TAG = 'tagsReducer/DELETE_TAG' as const;

type InitialStateType = {
   tags:tagType[]
}

export const initialState: InitialStateType = {
    tags: [] as tagType[],
}



type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof tagsActions>>


export const tagsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_TAGS:{
            return ({
                ...state,
                tags:action.payload.tags
            })
        }
        case CREATE_TAG:{
            const newTag:tagType = {
                tagName:action.payload.tagName,
                id:''
            }
            return ({
                ...state,
                tags:[...state.tags,newTag]
            })
        }
        case DELETE_TAG:{
            return ({
                ...state,
                tags:state.tags.filter(tag => tag.id !== action.payload.id)
            })
        }
        default:
            return state
    }
}

export const tagsActions = {
    getTags(tags:tagType[]) {
        return ({
            type:SET_TAGS,
            payload:{
                tags
            }
        })
    },
    addTag(tagName:string) {
        return ({
            type:CREATE_TAG,
            payload:{
                tagName
            }
        })
    },
    deleteTag(id:string) {
        return ({
            type:DELETE_TAG,
            payload:{
                id
            }
        })
    }
}
export const requestTags = () => async (dispatch: Dispatch) => {
    try {
        const res = await tagsAPI.getTags()
        dispatch(tagsActions.getTags(res.data))
    }
    catch (err) {
    }
}
export const createTag = (tagName:string) => async (dispatch: Dispatch) => {
    try {
        const res = await tagsAPI.createTag(tagName)
        dispatch(tagsActions.addTag(tagName))
    }
    catch (err) {
    }
}
export const deleteTag = (id:string) => async (dispatch: Dispatch) => {
    try {
        const res = await tagsAPI.deleteTag(id)
        dispatch(tagsActions.deleteTag(id))
    }
    catch (err) {
    }
}










