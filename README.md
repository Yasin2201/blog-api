# Blog API
Blog API is the back-end server for the [Blog CMS](https://github.com/Yasin2201/blog-cms) and [Blog Client](https://github.com/Yasin2201/blog-client) applications. 

## Functionality
* Allow users to GET, POST, PUT, DELETE comments and posts
* Validate and sanitise inputs with express-validator
* Secure users sessions using JWT (JSON Web Tokens)
* Secure and hash users passwords when sign-up with BcryptJS - note: user sign-ups for Blog CMS currently restricted.
* Authentication with PassportJS

## Built With:
* NodeJS
* Express
* MongoDB
* Mongoose
* Express-Validator
* BcryptJS