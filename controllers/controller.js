const {User, Course, Lecture, Schedule, ProfilStudents} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const { Op } = require("sequelize");
class Controller {
    static async showlandingPage(req, res) {
        try {
            const dataCourse = await Course.findAll()
            res.render('landingPage', {dataCourse})
        } catch (error) {
            res.send(error.message);
        }
    }
    
    static async showRegisterPage(req, res) {
        try {
            let {error} = req.query
            if (!error) {
                error = []
            }else {
                error = error.split(',')
            }
            res.render('registerPage', {error})
        } catch (error) {
            res.send(error.message);
        }
    }

    static async registerPagePost(req, res){
        try {
            const {firstName, lastName, email, password} = req.body
            await User.create({ firstName, lastName, email, password });
            res.redirect('/login/users/role')
        } catch (error) {
            if (error.name = "SequelizeValidationError") {
                let errorMessage = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/users/register?error=${errorMessage}`)
        }else {
            res.send(error)
        }
        }
    }

    static async showLoginPage(req, res) {
        try {
            const {error} = req.query 
            res.render('loginPage', {error})
        } catch (error) {
            if (error.name = "SequelizeValidationError") {
                let errorMessage = error.errors.map(el => {
                    return el.message
                })
                res.send(errorMessage)
            }else {
                res.send(error)

            }  
        }
    }

    static async loginPagePost (req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where : { 
                    email: email
                }
            })
            if (user) {
                const isValidPass = comparePassword(password, user.password)
                if (isValidPass) {

                    req.session.userId = user.id
                    req.session.role = user.role 
                        if (req.session.role === "teacher") {
                            return res.redirect(`/users/landingPage/teacher/${user.id}`)
                        } else {
                            return res.redirect(`/users/landingPage/student/${user.id}`)   
                        }
                }else {
                    return res.redirect(`/login/users/role?error=${'Invalid Email or Password'}`)
                }
            }else{
                return res.redirect(`/login/users/role?error=${'Invalid Email or Password'}`)
            }
        } catch (error) {
         res.send(error.message);   
        }
    }

    static async teacherPage(req, res){
        try {
            const {id} = req.params
            const {search} = req.query
            // console.log(search);
            let dataStudent
            if (search) {
                dataStudent = await ProfilStudents.findAll({
                    include: User,
                    where : {
                        firstName : {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
            }else{
                dataStudent = await ProfilStudents.findAll()

            }
            const data = await User.findAll({
                where: {
                    id: id
                }
            })

            // console.log(dataStudent, "<<<");
            // res.send({data})
            let totalStudent = await ProfilStudents.getTotalStudent()
            // const totalStudents = dataStudent[0].dataValues.total;
            // console.log(totalStudent);
            res.render('teacherPage', {data, dataStudent, totalStudent})
        } catch (error) {
            res.send(error.message)
        }
    }
    
    static async studentPage(req, res){
        try {
            let id = req.params.id
            const dataCourse = await Course.findAll()
            // res.send({data})
            res.render('studentPage', {id, dataCourse})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async teacherCoursePage(req, res) {
        try {
            // const data = await Course.findAll()
            // res.send({data})
            res.render('teacherCoursePage')
        } catch (error) {
            res.send(error);
        }
    }

    static async contactServiceMaintenance(req, res) {
        try {
            res.render('contactService')
        } catch (error) {
            console.log(error);
        }
    }

    static async teacherCourseDetails(req, res) {
        try {
            // console.log(req.params, "<<<<<");
            const {CourseId} = req.params
            const data = await Course.findAll({
                include: {
                    model: Schedule,
                    where: {
                        CourseId: CourseId
                    }
                }
            })
            // res.send({data})
            res.render('teacherCourseDetails', {data})
        } catch (error) {
            res.send(error);
        }
    }

    static async addSchedule(req, res){
        try {
            const course = await Course.findAll()
            res.render('addSchedulePage', {course})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async addSchedulePost(req, res){
        try {
            const {scedule, CourseId} = req.body
            await Schedule.create({scedule, CourseId})
            res.redirect('/users/landingPage/teacher/course')
        } catch (error) {
            res.send('error.message')
        }
    }


    static async editProfile(req, res){
        try{
            let id = req.params.userId
            const user = await User.findOne({
                where : {
                    id : id
                }
            })
            res.render('editProfile', {user})
        }catch(error){
            res.send(error.message)
        }
    }

    static async editProfilePost(req, res){
        try {
            const {firstName, lastName, gender, bornYear, address, profilePicture, email, password, id} = req.body
            await User.update({ firstName, lastName, email}, {
                where: {
                  id: id
                }
              });
            await ProfilStudents.create({firstName, lastName, gender, bornYear, address, profilePicture, email, password, UserId : id })
            res.redirect(`/users/landingPage/student/${id}`)
        } catch (error) {
          res.send(error.message)  
        }
    }


    static async logout(req, res){
        try {
            req.session.destroy ((err) => {
                if (err) {
                    res.send(err)
                }else{
                    res.redirect('/')
                }
            })
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = Controller


