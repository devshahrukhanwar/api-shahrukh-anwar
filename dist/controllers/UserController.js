export class UserController {
    static async welcome(req, res) {
        res.json({
            message: "Welcome to the User API",
            documentation: "<API documentation link>",
        });
    }
}
