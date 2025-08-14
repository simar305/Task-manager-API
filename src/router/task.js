const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        const tasks = await task.save();
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/counts', auth, async (req, res) => {
    try {
        const taskCount = await Task.countDocuments({});
        res.send(taskCount)
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

//limit skip
router.get('/tasks', auth, async (req, res) => {
    const match = { owner: req.user._id };
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const [field, order] = req.query.sortBy.split(':');
        sort[field] = order === 'desc' ? -1 : 1;
    }

    try {
        const tasks = await Task.find(match)
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(sort);

        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) return res.status(404).send()
        res.send(task);
    } catch {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send('Wrong operation')
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send();

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) return res.status(404).send('No task found');
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router