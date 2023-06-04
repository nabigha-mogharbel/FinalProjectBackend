import Model from "../models/Trip.js"
import Schedule from "../models/Schedule.js"
export const getUpcoming=async(req,res,next)=>{
  //try{

    // Schedule.find({}).then(
    //         function (success) {
    //           let arr=[]
    //           success.map(sched=> {
    //             let today = new Date();
    //             let startTime = sched.startTime;
    //             let endTime=sched.endTime;
    //             let day = today.getDate();
    //             let starttomorrow = new Date(today);
    //             let endtomorrow=new Date(today)
    //             //make date for tomorrow
    //             starttomorrow.setDate(day + 1);
    //             endtomorrow.setDate(day + 1);
    //             //take time of mongo schedule
    //             let startDate = new Date(startTime);
    //             let endDate=new Date(endTime)
    //             let starthours = startDate.getUTCHours();
    //             let startminutes = startDate.getUTCMinutes();
    //             let startseconds = startDate.getUTCSeconds();
    //             let endhours = endDate.getUTCHours();
    //             let endminutes = endDate.getUTCMinutes();
    //             let endseconds = endDate.getUTCSeconds();
    //             // Set the time components in starttomorrow
    //             starttomorrow.setUTCHours(starthours);
    //             starttomorrow.setUTCMinutes(startminutes);
    //             starttomorrow.setUTCSeconds(startseconds);
    //             endtomorrow.setUTCHours(endhours);
    //             endtomorrow.setUTCMinutes(endminutes);
    //             endtomorrow.setUTCSeconds(endseconds);
    //             let isostartTime=starttomorrow.toISOString();
    //             let isoendTime=endtomorrow.toISOString();
    //             console.log(isostartTime, isoendTime)
    //             let model= new Model({
    //               scheduleId: sched._id,
    //               totalPassenger: 0,
    //               emptySeats:30,
    //               date: isostartTime,
    //               lon:33.2211,
    //               lat:33.0154,
    //               bookedPassengers:[],
    //               busId: "647ad25305d6983741edc586",
    //               tripStatus:"scheduled",
    //               busStatus:"N/A",
    //               message:"The trip is scheduled",
    //               busManagerId:"647ad25305d6983741edc586",
    //               startTime:isostartTime,
    //               endTime:isoendTime,
    //             })
    //             arr.push(model)

    //           })
    //           Model.insertMany(arr).then(function(success){
    //             return res.status(201).send({data:success, message:"trips created"})
    //           }, function(reject){
    //             return res.status(400).send({data:reject})
    //           })

    //         },
    //         function (reject) {
    //           return res
    //             .status(400)
    //             .send({ error: reject, message: "Can't retrieve trips data" });
    //         }
    //       );
    //     } catch (error) {
    //       next(error);
    //     }
    try{
      const today = new Date(); // Assuming you have defined the 'today' and 'tomorrow' variables correctly
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
today.setHours(0)
tomorrow.setHours(23)

const transactions = await Model.find({
  startTime: {
    $gte: today,
    $lt: tomorrow
  }
});
return res.send({data:transactions})
    }catch(e){next(e)}
}
export const getAll=async(req,res, next)=>{
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
export const deleteBook=async(req,res, next)=>{
  try{
    console.log("body", req.body)
      Model.updateOne({_id:req.params.id}, { $pull: { "bookedPassengers": {"passengerId":req.body.id}} }).then(
              function (success) {
                console.log("body10")

                if (success.length === 0) {
                  return res
                    .status(203)
                    .send({ success: true, message: "No data found" });
                }
                return res
                  .status(200)
                  .send({ message: "Your booking is canceled", data: success });
              },
              function (reject) {
                console.log("body20")

                return res
                  .status(400)
                  .send({ error: reject, message: "Can't retrieve current trip" });
              }
            );
          } catch (error) {
            console.log("body30")

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
export const book=async(req,res, next)=>{
  try{
    console.log("body", req.body)
      Model.updateOne({_id:req.params.id}, { $push: { "bookedPassengers": {"passengerId":req.body.id, "status":"pending"}} }).then(
              function (success) {
                console.log("body10")

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
                console.log("body20")

                return res
                  .status(400)
                  .send({ error: reject, message: "Can't retrieve current trip" });
              }
            );
          } catch (error) {
            console.log("body30")

            next(error);
          }
}
export const manageBook=async(req,res)=>{
  console.log("req.headers")
  console.log(req.params.id, req.body)

  try{
      Model.findOneAndUpdate({ "_id": req.params.id, "bookedPassengers._id": req.body.id }, { $set: { "bookedPassengers.$.status": req.body.status}}).then(
              function (success) {
                if (success.length === 0) {
                  return res.status(203).send({ success: true, message: "No data found" });
                }
                return res.status(200).send({ message: "Trip retrieved", data: success });
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

const controllers={add, getAll, get, update,remove, book, manageBook}
export default controllers