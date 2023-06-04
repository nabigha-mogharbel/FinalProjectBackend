import Model from "../models/Line.js"
export const getAll=async(req,res)=>{
    try{
        const busses= await Model.find({}).then(
            function (success) {
              if (success.length === 0) {
                return res
                  .status(203)
                  .send({ success: true, message: "No data found" });
              }
              return res
                .status(200)
                .send({ message: "Buses list retrieved", data: success });
            },
            function (reject) {
              return res
                .status(400)
                .send({ error: reject, message: "Can't retrieve lines data" });
            }
          );
        } catch (error) {
          next(error);
        }
}
const get=async(req,res)=>{

}
const update=async(req,res)=>{

}
export const remove=async(req,res)=>{

}

export const add=async(req,res)=>{
    try{
        console.log("batata")
        let data=req.body
        data.busStops=JSON.parse(data.busStops)
    let newLine=new Model(
       data
    );
   newLine.save().then(
    function (success) {
      return res
        .status(201)
        .send({ success: true, message: "New line added" });
    },
    function (reject) {
      return res.status(400).send({ msg: "Incorrect data", error: reject });
    }
  );
} catch (error) {
  next(error);
}
}

const controllers={add, getAll, get, update,remove}
export default controllers