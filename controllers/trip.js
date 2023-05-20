import Model from "../models/Trip.js"
export const getAll=async(req,res)=>{
    try{
    Model.find({}).then(
            function (success) {
              if (success.length === 0) {
                return res
                  .status(203)
                  .send({ success: true, message: "No data found" });
              }
              return res
                .status(200)
                .send({ message: "Trip list retrieved", data: success });
            },
            function (reject) {
              return res
                .status(400)
                .send({ error: reject, message: "Can't retrieve trips data" });
            }
          );
        } catch (error) {
          next(error);
        }
}
export const get=async(req,res)=>{
    try{
        Model.find({_id:req.params.id}).then(
                function (success) {
                  if (success.length === 0) {
                    return res
                      .status(203)
                      .send({ success: true, message: "No data found" });
                  }
                  return res
                    .status(200)
                    .send({ message: "Trip retrieved", data: success });
                },
                function (reject) {
                  return res
                    .status(400)
                    .send({ error: reject, message: "Can't retrieve current trip" });
                }
              );
            } catch (error) {
              next(error);
            }
}
export const update=async(req,res)=>{
    try{
        Model.updateOne({_id:req.params.id}, req.body).then(
                function (success) {
                  if (success.length === 0) {
                    return res
                      .status(203)
                      .send({ success: true, message: "No data found" });
                  }
                  return res
                    .status(200)
                    .send({ message: "Trip retrieved", data: success });
                },
                function (reject) {
                  return res
                    .status(400)
                    .send({ error: reject, message: "Can't retrieve current trip" });
                }
              );
            } catch (error) {
              next(error);
            }
}
export const remove=async(req,res)=>{

}

export const add=async(req,res)=>{
    try{

    let newLine=new Model(
        req.body
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