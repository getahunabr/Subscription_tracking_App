import aj from"../config/arcjet.js"

const arcjetMiddleware=async (req,res,next)=>{
    try{
        const descion= await aj.protect(req,{requested:1})
        if(descion.isDenied()){
            if(descion.reason.isRateLimit()){
                return res.status(429).send({error:"Rate Limit exceeded"})
                if(descion.isBot())return res.status(403).send({error:"Bot is detected"})

             return   res.status(403).json({error:"Access Denied"})
            }
        }
next()
    }catch(error){
        console.log(`Arcjet middleware: ${error}`);
        next(error)
    }
}
export default arcjetMiddleware