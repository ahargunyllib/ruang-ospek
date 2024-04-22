<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
      $users = User::all();

      return Inertia::render('Users', [
        'users' => $users
      ]);
    }

    public function update(Request $request, $id)
    {
      $user = User::find($id);

      $user->name = $request->name;
      $user->email = $request->email;
      $user->role = $request->role;

      $user->save();

      return redirect()->route('users');
    }

    public function destroy($id)
    {
      $user = User::find($id);

      $user->delete();

      return redirect()->route('users');
    }
}
