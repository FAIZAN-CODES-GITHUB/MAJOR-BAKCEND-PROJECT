//This is for making utility of connecting to database for any error saves us from too much try/catch block

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export {asyncHandler}





//This is the second way of making async handler
// const asyncHandler = (fn) => async (req , res , next){
//     try {
//         await fn(req , res , next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success :false,
//             message: error.message
//         })
//     }
// }