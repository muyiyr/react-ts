import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState, useEffect } from "react"
import * as qs from "qs"
import { cleanObject } from "../../utils"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {

    const [param, setParam] = useState({
        name: '',
        personId:''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    useEffect(() => {
        // console.log(apiUrl)
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])
    useEffect(() =>{
    fetch(`${apiUrl}/users`).then(async response => {
        if (response.ok) {
            setUsers(await response.json())
        }
    })
},[param])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}