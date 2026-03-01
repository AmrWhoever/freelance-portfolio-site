<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Improvement: root view is now configured in HandleInertiaRequests middleware to keep a single source of truth.
    }
}