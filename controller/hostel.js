
const PS = require('../models/PSschema');
const hostels = require('../models/hostel');
const psRegister = async (req, res) => {
    try
    {
        
        const check = await PS.findOne({psName:req.body.psName,hostel:req.user._id});
        if(check){
            res.sendStatus(299); //frontend using this err code 
            return;
        }
        else
        {
            const ps = new PS({
                psName:req.body.psName,
                hostel:req.user._id,
                hostelName:req.user.username,
                studentsData:req.body.participants
            });
            await ps.save();
            res.sendStatus(201);
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

const findPS = async (req,res)=>{
    try{
        const ps = await PS.findOne({psName:req.body.psName, hostel:req.user._id});
       
            if(ps){
                res.status(200).send({ps})
                return;
            }
            else
            {
                res.sendStatus(201);
            }

    }
    catch(err){
        console.log(err);
        res.send(500,err)
    }
}

const getHostel = async (req,res)=>{
    try{
        const hostel = await hostels.findById(req.user._id);
        res.json(hostel).status(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(403);
    }
};

module.exports = {psRegister,getHostel, findPS};