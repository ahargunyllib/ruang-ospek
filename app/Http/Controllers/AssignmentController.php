<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function index(){
      return Inertia::render('Assignments');
    }
}
