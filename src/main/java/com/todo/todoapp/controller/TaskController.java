package com.todo.todoapp.controller;

import com.todo.todoapp.exception.TaskNotFoundException;
import com.todo.todoapp.entity.Task;
import com.todo.todoapp.repository.TaskRepository;
import com.todo.todoapp.request.AddTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@CrossOrigin("http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    private final AtomicInteger requestCounter = new AtomicInteger(0);

    @PostMapping("/task")
     public void addTask(@RequestBody AddTask addTask) {
        Task task = new Task();

        task.setTitle(addTask.getTitle());
        task.setDescription(addTask.getDescription());
        task.setDone(false);

        taskRepository.save(task);
        incrementRequestCounter();
    }

    @GetMapping("/tasks")
    public List<Task> fetchTasksList() {
        incrementRequestCounter();
        return taskRepository.findAll();
    }

    @GetMapping("/task/{id}")
    public Task getTaskById(@PathVariable Long id) {
        incrementRequestCounter();
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @PutMapping("/task/{id}")
    public Task updateTask(@RequestBody Task newTask, @PathVariable Long id) {
        incrementRequestCounter();
        return taskRepository.findById(id).map(task ->{
            task.setTitle(newTask.getTitle());
            task.setDescription(newTask.getDescription());

            return taskRepository.save(task);
        }).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @PostMapping("/task/done/{id}")
    public void toogleDone(@PathVariable Long id) {
        incrementRequestCounter();
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));

        task.setDone(true);
        taskRepository.save(task);
    }

    @PostMapping("/task/notdone/{id}")
    public void toogleNotDone(@PathVariable Long id) {
        incrementRequestCounter();
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));

        task.setDone(false);
        taskRepository.save(task);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable Long id) {
        incrementRequestCounter();
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));

        taskRepository.delete(task);
    }

    @GetMapping("/api/requests")
    public int getRequestCount() {
        return requestCounter.get();
    }

    private void incrementRequestCounter() {
        requestCounter.incrementAndGet();
    }
}
