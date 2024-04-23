<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assignment;
use App\Models\Submission;

class SubmissionController extends Controller
{
  public function store(Request $request, String $slug){
    $request->validate([
      'url' => 'required|url'
    ]);

    $assignment = Assignment::query()
      ->where('slug', $slug)
      ->first();

    Submission::create([
      'assignment_id' => $assignment->id,
      'user_id' => auth()->id(),
      'url' => $request->url
    ]);

    return redirect()->route('assignments');
  }
}
