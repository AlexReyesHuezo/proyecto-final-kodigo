<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Repositories\TaskRepository;
use Illuminate\Database\QueryException;
use Exception;

class TaskService
{
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function getAllTasksForUser()
    {
        return $this->taskRepository->findByUserId(Auth::id());
    }

    public function createTask(array $taskData)
    {
        try
        {
            $taskData['user_id'] = Auth::id();
            return $this->taskRepository->create($taskData);
        }
        catch (QueryException $error)
        {
            $errorMessage = $error->getMessage();
            $sqlState = $error->errorInfo[0];
            $errorCode = $error->errorInfo[1];

            return response()->json([
                'error' => 'Error al guardar la tarea. Por favor, verifique los datos e intentelo de nuevo.',
                'errorMessage' => $errorMessage,
                'sqlState' => $sqlState,
                'errorCode' => $errorCode
            ], 500);
        }
        catch (Exception $error)
        {
            return response()->json([
                'error' => 'Ocurrió un error inesperado. Por favor, intentelo más tarde.',
                'details' => $error->getMessage()
            ], 500);
        }
    }

    public function updateTask(int $taskId, array $taskData)
    {
        $task = $this->taskRepository->findById($taskId);

        if ($task->user_id !== Auth::id())
        {
            return response()->json([
                'error' => 'No tienes permisos para actualizar esta tarea.'
            ], 403);
        }

        try
        {
            return $this->taskRepository->update($task, $taskData);
        }
        catch (QueryException $error)
        {
            $errorMessage = $error->getMessage();
            $sqlState = $error->errorInfo[0];
            $errorCode = $error->errorInfo[1];

            return response()->json([
                'error' => 'Error al actualizar la tarea. Por favor, verifique los datos e intentelo de nuevo.',
                'errorMessage' => $errorMessage,
                'sqlState' => $sqlState,
                'errorCode' => $errorCode
            ], 500);
        }
        catch (Exception $error)
        {
            return response()->json([
                'error' => 'Ocurrió un error inesperado. Por favor, intentelo más tarde.',
                'details' => $error->getMessage()
            ], 500);
        }

        return $task;
    }

    public function deleteTask(int $taskId)
    {
        $task = $this->taskRepository->findById($taskId);

        if ($task->user_id !== Auth::id())
        {
            return response()->json([
                'error' => 'No tienes permisos para eliminar esta tarea.'
            ], 403);
        }

        try
        {
            $this->taskRepository->delete($task);

            return response()->json([
                'message' => 'Tarea eliminada correctamente.'
            ], 200);
        }
        catch (QueryException $error)
        {
            $errorMessage = $error->getMessage();
            $sqlState = $error->errorInfo[0];
            $errorCode = $error->errorInfo[1];

            return response()->json([
                'error' => 'Error al eliminar la tarea. Por favor, intentelo de nuevo.',
                'errorMessage' => $errorMessage,
                'sqlState' => $sqlState,
                'errorCode' => $errorCode
            ], 500);
        }
        catch (Exception $error)
        {
            return response()->json([
                'error' => 'Ocurrió un error inesperado. Por favor, intentelo más tarde.',
                'details' => $error->getMessage()
            ], 500);
        }
    }

    public function markTaskAsCompleted(int $taskId)
    {
        $task = $this->taskRepository->findById($taskId);

        if ($task->user_id !== Auth::id())
        {
            return response()->json([
                'error' => 'No tienes permisos para marcar esta tarea como completada.'
            ], 403);
        }

        try
        {
            $task->completed = !$task->completed;
            $task->update();

            return response()->json([
                'message' => 'Tarea marcada como completada correctamente.'
            ], 200);
        }
        catch (QueryException $error)
        {
            $errorMessage = $error->getMessage();
            $sqlState = $error->errorInfo[0];
            $errorCode = $error->errorInfo[1];

            return response()->json([
                'error' => 'Error al marcar la tarea como completada. Por favor, intentelo de nuevo.',
                'errorMessage' => $errorMessage,
                'sqlState' => $sqlState,
                'errorCode' => $errorCode
            ], 500);
        }
        catch (Exception $error)
        {
            return response()->json([
                'error' => 'Ocurrió un error inesperado. Por favor, intentelo más tarde.',
                'details' => $error->getMessage()
            ], 500);
        }

        return $task;
    }
}

?>