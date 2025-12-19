// resources/js/Pages/Home/CreateDonorPost.jsx
import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function CreateDonorPost({ errors }) {
    const { data, setData, post, processing } = useForm({
        blood_group: '',
        location: '',
        description: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts/create/donor');
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/home"
                        className="inline-flex items-center text-gray-600 hover:text-brand-600 transition-colors mb-4 group"
                    >
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Feed
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Become a Donor</h1>
                    <p className="text-gray-600 text-lg">Share your availability and help save lives in your community.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Donor Information Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Donor Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="blood_group" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Blood Group <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="blood_group"
                                        name="blood_group"
                                        required
                                        value={data.blood_group}
                                        onChange={(e) => setData('blood_group', e.target.value)}
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                    {errors.blood_group && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.blood_group}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        placeholder="City, State"
                                    />
                                    {errors.location && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Availability Details Section */}
                        <div className="pt-6 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Availability Details
                            </h2>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    required
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Share your availability, preferred contact method, any restrictions, or additional information that might be helpful..."
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.description}
                                    </p>
                                )}
                                <p className="mt-2 text-sm text-gray-500">
                                    Maximum 1000 characters
                                </p>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Post Image
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        accept="image/*"
                                    />
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Link
                                    href="/home"
                                    className="flex-1 text-center px-6 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 flex justify-center items-center gap-2 py-3.5 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Post Availability
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="mt-6 space-y-4">
                    {/* Help Card */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-emerald-900 mb-1">Thank You for Being a Hero!</h3>
                                <p className="text-sm text-emerald-700">
                                    Your donation can save up to three lives. By posting your availability, you're making it easier for people in need to find you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Card */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-1">Your Privacy Matters</h3>
                                <p className="text-sm text-blue-700">
                                    Only your name, blood group, and location will be visible to others. Your contact information will only be shown to authenticated users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
