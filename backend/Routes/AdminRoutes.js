const { login } = require("../Controllers/AdminControllers")
const {checkAdmin} = require("../Middlewares/AdminMiddlewares")

const router = require("express").Router()

router.post("/",checkAdmin)
router.post("/login",login)

module.exports = router
