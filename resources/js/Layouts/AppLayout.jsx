// resources/js/Layouts/AppLayout.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                                <span className="bg-brand-600 text-white p-1.5 rounded-lg group-hover:bg-brand-700 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </span>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                                    DonorBook
                                </span>
                            </Link>

                            {auth.user && (
                                <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                                    <NavLink href="/home" active={route().current('home')}>Home</NavLink>
                                    <NavLink href="/posts/create/request" active={route().current('posts.create.request')}>Request Blood</NavLink>
                                    <NavLink href="/posts/create/donor" active={route().current('posts.create.donor')}>Offer Donation</NavLink>
                                    {auth.user.role === 'admin' && (
                                        <NavLink href="/admin" active={route().current('admin.*')}>Admin</NavLink>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 border-2 border-brand-200">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span>{auth.user.name}</span>
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-gray-500 hover:text-brand-600 text-sm font-medium transition-colors"
                                    >
                                        Sign Out
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-brand-600 font-medium transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-5 py-2.5 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 shadow-md shadow-brand-500/30 hover:shadow-lg hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 animate-fade-in">
                    {children}
                </div>
            </main>

            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <span className="bg-brand-100 text-brand-600 p-1 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                            </span>
                            <span className="font-semibold text-gray-900">DonorBook</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} DonorBook. Connecting lives, one drop at a time.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all ${active
                ? 'border-brand-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
        >
            {children}
        </Link>
    );
}

// Helper to mock route() since it's a Laravel helper often not available in pure JS without a package
// In a real app key ziggy-js would be used. We'll rely on window.location for now or props.
function route() {
    return {
        current: (path) => {
            return window.location.pathname.startsWith(path === 'home' ? '/home' : path);
        }
    }
}