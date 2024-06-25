export const swaggerOptions = {
    definition:{
        openapi:"3.0..1",
        info:{
            title:"Documentation API ecommerce",
            description:"Documentation API ecommerce with swagger"
        }
    },
    apis:[`./src/docs/**/*yaml`]
}