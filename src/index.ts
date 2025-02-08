import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const app = express()
app.use(express.json())

import { UserModel } from './db'

app.post('/api/v1/signup', async (req, res) => {

    //zod validation and hash the password
    const username = req.body.username
    const password = req.body.password

    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "You are Signed Up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }

})

app.post('/api/v1/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password


})


app.post('/api/v1/content', (req, res) => {

})

app.get('/api/v1/content', (req, res) => {

})

app.delete('/api/v1/content', (req, res) => {

})

app.post('api/v1/brain/share', (req, res) => {

})

app.get('api/v1/brain/:shareLink', (req, res) => {

})

app.listen(3000)

