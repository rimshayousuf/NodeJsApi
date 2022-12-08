//import 
const jwt =  require('jsonwebtoken');
const settings = require('../../appConfig');
const useragent = require('useragent');
const _ = require('lodash');


useragent(true);

//middleware
module.exports.checkAuth = (req,res,next) =>{
const agent = useragent.parse(req.headers['user-agent']);
let token = req.headers["x-access-token"]!=undefined? req.headers["x-access-token"]: req.headers["authorization"];
 if(token.startsWith('Bearer ')){
    token = token.slice(7,token.length);
 }

 let verifyvalues = {
    Session: req.headers.Session,
    OS: agent.os.toString(),
    WebBrowser: agent.toString(),
    Ver: agent.toVersion(),
    HardWare: agent.device.toString(),
 };

 jwt.verify(token, settings.JWT_KEY,verifyvalues, function(err,res){
   if(err){
    //203 error for Non-Authoritative Information response

    res.json({message: err.message});
   }
   else{
       var decoded = jwt.decode(token);
//iat(issueAt(time))
       delete decoded.iat;
       delete decoded.exp;
       delete verifyvalues.Session

       if(_.isEqual(decoded,verifyvalues)){
        req.data = res;
        next();
       }
       else{
        res.json({message: "Server session Expired"});
       }
   }
 });
 
};