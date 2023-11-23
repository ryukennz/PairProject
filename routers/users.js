const express = require('express')
const Controller = require('../controllers/controller')
const user = express.Router()
const {isLogin} = require('../helpers/midleware')

// Routing Register
user.get('/users/register', Controller.showRegisterPage)
user.post('/users/register', Controller.registerPagePost)

// Routing Login
user.get('/login/users/role', Controller.showLoginPage)
user.post('/login/users/role', Controller.loginPagePost)

user.get('/users/logout', Controller.logout)

// user.use(isLogin)

// Routing Private Teacher
user.get('/users/landingPage/teacher/:id', Controller.teacherPage)
user.get('/users/landingPage/teacher/course', Controller.teacherCoursePage)
user.get('/users/add/schedule', Controller.addSchedule)
user.post('/users/add/schedule', Controller.addSchedulePost)
user.get('/users/:CourseId/landingPage/teacher/course/courseDetails', Controller.teacherCourseDetails)
user.get('/users/teacher/course/maintenance', Controller.teacherCoursePage)
user.get('/users/teacher/course/contactMaintenance', Controller.contactServiceMaintenance)
// Routing Private Student
user.get('/users/landingPage/student/:id', Controller.studentPage )


user.get('/users/role/addCourse')
user.post('/users/role/addCourse')


user.get('/users/edit/profile/:userId', Controller.editProfile)
user.post('/users/edit/profile/:userId', Controller.editProfilePost)
user.get('/users/role/delete/course')

module.exports = user