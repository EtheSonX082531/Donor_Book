// resources/js/Pages/Home/Landing.jsx
import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Landing() {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-brand-100 text-sm font-medium mb-6 animate-fade-in">
                            Community Blood Donation Platform
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight animate-fade-in">
                            Donate Blood. <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 to-white">Save a Life Today.</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-brand-50 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in">
                            Connect directly with blood donors and recipients in your community.
                            Simple, fast, and potentially life-saving.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-700 rounded-full text-lg font-bold hover:bg-brand-50 hover:scale-105 transform transition-all shadow-xl shadow-brand-900/20"
                            >
                                Become a Donor
                            </Link>
                            <Link
                                href="/login"
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                            >
                                Find Blood
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Wave Separator */}
                <div className="absolute bottom-0 w-full leading-none text-white transform translate-y-px">
                    <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </div>

            {/* Features / How it Works */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Process</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            How It Works
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Three simple steps to make a difference in someone's life.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { title: 'Register', desc: 'Create a secure account with your blood group and location.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                            { title: 'Connect', desc: 'Search for donors or requests near you using smart filters.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                            { title: 'Save Lives', desc: 'Donate blood locally or receive help when urgently needed.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-brand-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                                <div className="relative w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section with Glass Effect */}
            <div className="py-20 relative bg-brand-900 border-t border-brand-800">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Active Donors', value: '1,000+' },
                            { label: 'Lives Saved', value: '500+' },
                            { label: 'Cities Covered', value: '50+' },
                            { label: 'Support Available', value: '24/7' },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
                                <div className="text-brand-200 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}