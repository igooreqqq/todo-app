package com.todo.todoapp.request;

public class AddTask {

    private String title;
    private String description;
    private boolean done;


    public AddTask(String title, String description, boolean done) {
        this.title = title;
        this.description = description;
        this.done = done;
    }

    public AddTask() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
