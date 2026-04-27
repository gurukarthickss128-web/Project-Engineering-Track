const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const cache = new Map();

// helper for TTL
const setCache = (key, value, ttl = 60) => {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), ttl * 1000);
};

// GET /tasks
app.get('/tasks', async (req, res) => {
  const cacheKey = 'tasks:list';

  try {
    if (cache.has(cacheKey)) {
      console.log('Serving from cache');
      return res.status(200).json(cache.get(cacheKey));
    }

    // ✅ FIX: await added
    const tasks = await prisma.task.findMany();

    // ✅ cache only valid data
    if (tasks) {
      setCache(cacheKey, tasks, 60);
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `task:${id}`;

  try {
    if (cache.has(cacheKey)) {
      return res.status(200).json(cache.get(cacheKey));
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    // ✅ FIX: handle null
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // ✅ cache only valid data
    setCache(cacheKey, task, 60);

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title, description, price } = req.body;

  try {
    // ✅ basic validation
    if (!title || !price) {
      return res.status(400).json({ message: 'Title and price required' });
    }

    const newTask = await prisma.task.create({
      data: { title, description, price: parseFloat(price) }
    });

    // ✅ FIX: invalidate list cache
    cache.delete('tasks:list');

    // ✅ correct status code
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    // ✅ FIX: invalidate cache
    cache.delete('tasks:list');
    cache.delete(`task:${id}`);

    // ✅ correct status code
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Fixed Server running on http://localhost:${PORT}`);
});