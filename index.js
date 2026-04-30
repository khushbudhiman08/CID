import express from 'express';
const app = express();
const port = 3000;
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
const verifyToken = (req,res,next) => {
    const bearertoken = req.headers['authorization'];
    const token = bearertoken && bearertoken.split(' ')[1];
    if(!token){
        return res.status(403).json({message:'No token provided'});
    }
    jwt.verify(token,'xyzabc',(err,decoded) =>{
        if(err){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.userId = decoded.id;
        next();
    });
}
app.get('/',(req,res) => {
    res.send('Hello World!');

});
const user =[{ id: 1, username:'testuser'},
    { id: 2, username: 'testuser2'},
    { id: 3, username: 'testuser3'}
];
app.post('/login',(req,res) => {
    //mock user auth
    //generate a jwt token
    const {id,username} = req.body;
    const foundUser = user.find(u => u.id === id && u.username ===username);
    if(!foundUser)
        return res.status(401).json({message:'invalid req'});
    const token = jwt.sign({id,username},'xyzabc',{expiresIn:'1h'});
    res.json({ token });
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})