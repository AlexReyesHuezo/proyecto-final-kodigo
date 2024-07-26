<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskRepository
{
  // ?Task is a nullable object of type Task
  public function findById(int $id): ?Task
  {
    try
    {
      return Task::findOrFail($id);
    }
    catch (ModelNotFoundException $error)
    {
      throw new ModelNotFoundException($error->getMessage());
    }
  }

  public function findByUserId(int $userId)
  {
    // Return all tasks that belong to the user with the given ID
    return Task::where('user_id', $userId)->get();
  }

  // Create a new task, this method returns a Task object
  public function create(array $taskData): Task
  {
    return Task::create($taskData);
  }

  // Update a task, this method recieves a Task object and an array with the new task data
  public function update(Task $task, array $taskData): Task
  {
    $task->update($taskData);
    return $task;
  }

  public function delete(Task $task): void
  {
    $task->delete();
  }
}

?>