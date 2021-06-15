import axios from "axios";
import { v1 } from "uuid";


export type noteType = {
    title:string
    id:string
}
export type tagType ={
    tagName:string
    id:string
}




export const notesAPI = {
    getNotes() {
        return axios.get<noteType[]>('/notes')
    },
    createNote(title:string) {
        return axios.post<noteType>('/notes',{title,id:v1()})
    },
    updateNote(id:string,title:string) {
        return axios.put(`/notes/${id}`,{title})
    },
    deleteNode(id:string) {
        return axios.delete(`/notes/${id}`)
    }
}
export const tagsAPI = {
    getTags() {
        return axios.get<tagType[]>('/tags')
    },
    createTag(tagName:string) {
        return axios.post<tagType>('/tags',{tagName,id:v1()})
    },
    deleteTag(id:string) {
        return axios.delete<tagType>(`/tags/${id}`)
    }
}
