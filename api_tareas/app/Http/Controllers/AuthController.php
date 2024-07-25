<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        try{
        // Validate request for new user // POST
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'data' => $user,
            'message' => 'usuario registado correctamente'
        ],201);
            }catch(Exception $error){
                return $error->getMessage();
            }
    }

    public function login(Request $request){
        try{
            // Validates data that we need
            $request->validate([
                "email" => 'required|string|email',
                "password" => 'required|string|min:8'
            ]);
            // we get the request from the body request
            $credencials = $request->only('email','password');

            // If credentials are not correct, we sent message and return
            if(!Auth::attempt($credencials)){
                return response()->json(["message"=> 'usuario no autorizado'],401);
            }

            // If credentials are Ok, we get that user from the request
            $user = $request->user();

            // Creates a token for the user and then it logs the user in
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'type_token' => 'Bearer',
                
            ]);


        }catch(Exception $error){
            return $error->getMessage();
        }
    }

    public function logout(Request $request){
        try{
            // To logout and will delete credentials
            $request->user()->tokens()->delete();
            return response()->json(['message'=> 'Te deslogueaste pa']);

        }catch(Exception $error){
            return $error->getMessage();
        }
    }
}
