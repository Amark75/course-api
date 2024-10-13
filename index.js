const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let courses = [
    { id: 1, title: 'Mathematics 101', description: 'Basic concepts of mathematics', duration: '3 months' },
    { id: 2, title: 'Physics 101', description: 'Introduction to physics principles', duration: '4 months' }
];

app.get('/', (req, res) => {
    res.send('Hello, Welcome to the Course.');
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.duration = req.body.duration || course.duration;

    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    courses.splice(courseIndex, 1);
    res.json({ message: 'Course deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
