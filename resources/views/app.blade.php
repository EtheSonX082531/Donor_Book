<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap" rel="stylesheet" />

        @if(!app()->runningUnitTests())
            @viteReactRefresh
            @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @endif
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header class="bg-white/60 dark:bg-gray-900/60 backdrop-blur sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center gap-4">
                        <a href="/" class="inline-flex items-center gap-3">
                            <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center text-white font-bold">D</div>
                            <span class="font-semibold text-lg">{{ config('app.name', 'Donor Book') }}</span>
                        </a>
                    </div>
                    <nav class="hidden md:flex items-center gap-4">
                        <a href="/" class="text-sm hover:text-red-600">Home</a>
                        <a href="{{ route('home') }}" class="text-sm hover:text-red-600">Posts</a>
                        <a href="{{ route('profile') }}" class="text-sm hover:text-red-600">Profiles</a>
                    </nav>
                    <div class="flex items-center gap-3">
                        @if (Route::has('login'))
                            @auth
                                <a href="{{ url('/dashboard') }}" class="px-4 py-2 bg-gray-800 text-white rounded-md text-sm">Dashboard</a>
                            @else
                                <div class="hidden sm:flex items-center gap-2">
                                    <a href="{{ route('login') }}" class="text-sm">Log in</a>
                                    @if (Route::has('register'))
                                        <a href="{{ route('register') }}" class="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm">Register</a>
                                    @endif
                                </div>
                            @endauth
                        @endif

                        <!-- Mobile menu button -->
                        <button id="mobile-menu-button" class="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800" aria-expanded="false" aria-label="Open menu">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile menu, toggle via JS -->
                    <div id="mobile-menu" class="md:hidden hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div class="px-4 py-3 space-y-1">
                    <a href="/" class="block text-sm">Home</a>
                    		    <a href="{{ route('home') }}" class="block text-sm">Posts</a>
                    		    <a href="{{ route('profile') }}" class="block text-sm">Profiles</a>
                    @if (Route::has('login'))
                        @auth
                            <a href="{{ url('/dashboard') }}" class="block text-sm">Dashboard</a>
                        @else
                            <a href="{{ route('login') }}" class="block text-sm">Log in</a>
                            @if (Route::has('register'))
                                <a href="{{ route('register') }}" class="block text-sm">Register</a>
                            @endif
                        @endauth
                    @endif
                </div>
            </div>
        </header>

        <main class="min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                @inertia
            </div>
        </main>

        <footer class="bg-white/60 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800 mt-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 dark:text-gray-400">
                © {{ date('Y') }} {{ config('app.name', 'Donor Book') }} — Built with ♥
            </div>
        </footer>
    </body>
</html>
