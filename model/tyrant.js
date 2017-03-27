var mongoose = require('mongoose');
var tyrantScheema = mongoose.Schema({
    id:String,
    level:Number,
    mesos:Number,
    fails: Number
});
var tyrantUser = mongoose.model('tyrant', tyrantScheema);
module.exports = tyrantUser;
