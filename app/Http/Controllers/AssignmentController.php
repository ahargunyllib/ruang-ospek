<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Assignment;

class AssignmentController extends Controller
{
    public function index(){
      $assignments = Assignment::query()
        ->orderBy('created_at', 'desc')
        ->get();

      return Inertia::render('Assignments', [
        'assignments' => $assignments
      ]);
    }

    public function store(Request $request){
      $deadline = date('Y-m-d H:i:s', strtotime($request->deadline));

      Assignment::create([
        'title' => $request->title,
        'description' => $request->description,
        'deadline' => $deadline,
        'slug' => Str::slug($request->title)
      ]);

      return redirect()->back();
    }

    public function show($slug){
      $assignment = Assignment::query()
        ->where('slug', $slug)
        ->first();

      return Inertia::render('Assignment', [
        'assignment' => $assignment
      ]);
    }
}
