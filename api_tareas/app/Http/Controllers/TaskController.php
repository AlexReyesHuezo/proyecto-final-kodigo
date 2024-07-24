<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Exception;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        // Return the tasks in JSON format
        return response()->json($tasks);
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
        // Validate the request data
        try
        {
            Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'completed' => $request->completed,
                // Get the user ID from the authenticated user
                'user_id' => auth()->user()->id
            ]);
        }
        // Catch the QueryException that could be thrown when trying to save the task
        catch (QueryException $error){
            $errorMessage = $error->getMessage();
            // Get the SQL state
            $sqlState = $error->errorInfo[0];
            // Get the error code
            $errorCode = $error->errorInfo[1];

            return response()->json([
                'error' => 'Error al guardar la tarea. Por favor, verifique los datos e intentelo de nuevo.',
                'errorMessage' => $errorMessage,
                'sqlState' => $sqlState,
                'errorCode' => $errorCode
            ], 500);
        }
        // Catch any other exception that could be thrown
        catch (Exception $error)
        {
            return response()->json([
                'error' => 'Ocurrió un error inesperado. Por favor, intentelo más tarde.',
                'details' => $error->getMessage()
            ], 500);
        }
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
