<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureIsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function() {
      return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::controller(UserController::class)->group(function () {
      Route::get('/users', [UserController::class, 'index'])->name('users')->middleware(EnsureIsAdmin::class);
      Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
      Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
  });

  Route::controller(AssignmentController::class)->group(function () {
    Route::get('/assignments', [AssignmentController::class, 'index'])->name('assignments');
    Route::post('/assignments', [AssignmentController::class, 'store'])->name('assignments.store');
  });
});

require __DIR__.'/auth.php';
