<?php

namespace App\Http\Controllers;

// ModelNotFoundException is a class that is thrown when a model is not found
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Exception;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try
        {
            $tasks = $this->taskService->getAllTasksForUser();
            return response()->json($tasks);
        }
        catch (Exception $error)
        {
            return response()->json([
                'error' => 'Ocurrió un error inesperado. Por favor, intentelo más tarde.',
                'details' => $error->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'completed' => 'required|boolean'
        ]);

        $taskData = [
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'completed' => $validatedData['completed']
        ];

        $this->taskService->createTask($taskData);

        return response()->json([
            'message' => 'Tarea guardada correctamente.'
        ], 201);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'completed' => 'required|boolean'
        ]);

        $taskData = [
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'completed' => $validatedData['completed']
        ];

        $this->taskService->updateTask($id, $taskData);

        return response()->json([
            'message' => 'Tarea actualizada correctamente.'
        ], 200);
    }

    /**
     * Mark a task as completed.
     * This method will be called when the user clicks the "Marcar como completada" button.
     */
    public function markAsCompleted(string $id)
    {
        $this->taskService->markTaskAsCompleted($id);

        return response()->json([
            'message' => 'Tarea marcada como completada.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->taskService->deleteTask($id);

        return response()->json([
            'message' => 'Tarea eliminada correctamente.'
        ], 200);
    }
}
