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
        //validar el request
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
            'message' => 'usuario registado correcamente'
        ],201);
            }catch(Exception $error){
                return $error->getMessage();
            }
    }

    public function login(Request $request){
        try{
            //validaos los datos que necesitamos
            $request->validate([
                "email" => 'required|string|email',
                "password" => 'required|string|min:8'
            ]);
            //sacams del body de la peticion las credenciales
            $credencials = $request->only('email','password');

            //si las credenciales NO son correctas enviamos el mensaje, terminamos ejecucion
            if(!Auth::attempt($credencials)){
                return response()->json(["message"=> 'usuario no autorizado'],401);
            }

            //si las credenciales si son correctas vamos a obtener ese usuario de el request
            $user = $request->user();

            //crear un token para el usuario y lo logeamos
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
            //es para deslogearse basicamente borra las credenciales
            $request->user()->tokens()->delete();
            return response()->json(['message'=> 'Te deslogeastes pa']);

        }catch(Exception $error){
            return $error->getMessage();
        }
    }
}
