// resources/js/Pages/Home/CreateRequest.jsx
import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' },
];

export default function CreateRequest({ errors }) {
    const { data, setData, post, processing } = useForm({
        blood_group: '',
        units_needed: '',
        hospital_name: '',
        location: '',
        urgency: '',
        description: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts/create/request');
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Request Blood</h1>
                    <p className="text-gray-600 text-lg">Create an urgent request and notify nearby donors in your area.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Blood Requirements Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Blood Requirements
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
                                    <label htmlFor="units_needed" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Units Needed <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="units_needed"
                                        name="units_needed"
                                        type="number"
                                        min="1"
                                        required
                                        value={data.units_needed}
                                        onChange={(e) => setData('units_needed', e.target.value)}
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        placeholder="e.g., 2"
                                    />
                                    {errors.units_needed && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.units_needed}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Urgency Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        required
                                        value={data.urgency}
                                        onChange={(e) => setData('urgency', e.target.value)}
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Urgency</option>
                                        {urgencyLevels.map(level => (
                                            <option key={level.value} value={level.value}>{level.label}</option>
                                        ))}
                                    </select>
                                    {errors.urgency && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.urgency}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location Details Section */}
                        <div className="pt-6 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Location Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="hospital_name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Hospital Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="hospital_name"
                                        name="hospital_name"
                                        type="text"
                                        required
                                        value={data.hospital_name}
                                        onChange={(e) => setData('hospital_name', e.target.value)}
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        placeholder="e.g., City General Hospital"
                                    />
                                    {errors.hospital_name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.hospital_name}
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

                        {/* Additional Information Section */}
                        <div className="pt-6 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Additional Information
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
                                    placeholder="Provide any additional details about the blood requirement, patient condition, or special instructions..."
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Post Request
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Help Card */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-1">Need Help?</h3>
                            <p className="text-sm text-blue-700">
                                Your request will be visible to all donors in your area. Make sure to provide accurate information to help donors reach you quickly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
