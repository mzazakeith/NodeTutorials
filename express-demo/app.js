const express = require('express');
const Joi = require("joi");
const app = express();
app.use(express.json());

const courses =[
    {id:1, name:"Science"},
    {id:2, name:"Math"},
    {id:3, name:"English"}
]

app.get('/', (req,res)=>{
    res.send("Hello World!!!");
});
app.get('/api/courses', (req,res)=>{
    res.send(courses);
});
app.post('/api/courses', (req,res)=>{

    const result =  validateCourse(req.body);
    const {error} = result;
    if(error){
        res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length +1,
        name:req.body.name
    };
    courses.push(course);
    res.status(201).send(course);
});
app.put('/api/course/:id', (req,res)=>{
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with id ${req.params.id} was not found`);

    const result =  validateCourse(req.body);
    const {error} = result;
    if(error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;
    res.send(course);
});

app.get('/api/courses/:id/:year', (req,res)=>{
   // res.send(req.params);
    res.send(req.query);
});
app.get('/api/courses/:id', (req,res)=>{
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with id ${req.params.id} was not found`);
    res.send(course);
});
app.delete('/api/course/:id', (req,res)=>{
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with id ${req.params.id} was not found`)
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(`course ${course.name} has been deleted`);
});


const port = process.env.PORT || 3002;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.....`)
})

const validateCourse = (course) =>{
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(course);
}
