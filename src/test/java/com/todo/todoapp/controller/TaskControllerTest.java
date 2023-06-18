package com.todo.todoapp.controller;

import com.todo.todoapp.entity.Task;
import com.todo.todoapp.repository.TaskRepository;
import com.todo.todoapp.request.AddTask;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskController underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void addTask() {
        // Given
        AddTask addTask = new AddTask();
        addTask.setTitle("Task Title");
        addTask.setDescription("Task Description");

        // When
        underTest.addTask(addTask);

        // Then
        verify(taskRepository, times(1)).save(any(Task.class));

        ArgumentCaptor<Task> taskCaptor = ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskCaptor.capture());
        Task savedTask = taskCaptor.getValue();

        assertEquals(addTask.getTitle(), savedTask.getTitle());
        assertEquals(addTask.getDescription(), savedTask.getDescription());
        assertFalse(savedTask.isDone());
    }

    @Test
    void updateTask() {
        // Given
        Long taskId = 1L;
        Task existingTask = new Task();
        existingTask.setId(taskId);
        existingTask.setTitle("Task Title");
        existingTask.setDescription("Task Description");

        Task newTaskData = new Task();
        newTaskData.setTitle("Updated Task");
        newTaskData.setDescription("Updated Description");

        when(taskRepository.findById(taskId)).thenReturn(java.util.Optional.of(existingTask));
        when(taskRepository.save(existingTask)).thenReturn(existingTask);

        // When
        Task updatedTask = underTest.updateTask(newTaskData, taskId);

        // Then
        verify(taskRepository, times(1)).findById(taskId);
        verify(taskRepository, times(1)).save(existingTask);
        assertEquals(newTaskData.getTitle(), updatedTask.getTitle());
        assertEquals(newTaskData.getDescription(), updatedTask.getDescription());
    }
}
