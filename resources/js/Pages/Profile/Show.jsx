import React, { useState } from 'react';
import { Head, usePage, Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Show({ user, posts }) {
    const { auth } = usePage().props;
    const isOwner = auth.user && auth.user.id === user.id;
    const [showEditModal, setShowEditModal] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        phone: user.phone,
        bio: user.profile?.bio || '',
        is_donor: user.is_donor || false,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/profile', {
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title={`${user.name} - Profile`} />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-400"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="flex items-end">
                                <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-md overflow-hidden">
                                    {user.profile?.image ? (
                                        <img
                                            src={`/storage/${user.profile.image}`}
                                            alt={user.name}
                                            className="h-full w-full rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-500">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-6 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                    <p className="text-gray-500 flex items-center gap-1.5 text-sm">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {user.location || 'Location not specified'}
                                    </p>
                                </div>
                            </div>
                            {isOwner && (
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="col-span-2 space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">About</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {user.profile?.bio || "This user hasn't added a bio yet."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Blood Group</span>
                                        <span className="text-xl font-bold text-gray-900">{user.blood_group || '-'}</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last Donation</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {user.last_donation_date
                                                ? new Date(user.last_donation_date).toLocaleDateString()
                                                : 'Never'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 space-y-4">
                                <div className="p-5 bg-brand-50 rounded-2xl border border-brand-100">
                                    <h3 className="font-bold text-brand-900 mb-1">Donor Status</h3>
                                    <p className="text-sm text-brand-700 mb-4">
                                        {user.is_donor
                                            ? "Available to donate blood."
                                            : "Currently unavailable to donate."}
                                    </p>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.is_donor
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {user.is_donor ? "Available" : "Unavailable"}
                                    </div>
                                </div>

                                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-2">Contact Info</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            {user.phone}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {posts.data.length > 0 ? (
                            posts.data.map(post => (
                                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide mb-2 ${post.type === 'request'
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                {post.type === 'request' ? 'Request' : 'Donor Pledge'}
                                            </span>
                                            <h3 className="font-bold text-gray-900 text-lg">
                                                {post.type === 'request'
                                                    ? `Requesting ${post.units_needed} bags of ${post.blood_group}`
                                                    : `Available to donate ${post.blood_group}`}
                                            </h3>
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{post.description}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                {post.likes_count}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                                {post.comments_count}
                                            </span>
                                        </div>
                                        <Link href="#" className="text-brand-600 hover:text-brand-700 font-semibold">View Details &rarr;</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <h3 className="text-lg font-medium text-gray-900">No activity yet</h3>
                                <p className="text-gray-500">Posts created by this user will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Profile Picture Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                                    accept="image/*"
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                                    required
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            {/* Bio Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                            </div>

                            {/* Donor Availability Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Available to Donate</h3>
                                    <p className="text-sm text-gray-500">Toggle your donor availability status</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setData('is_donor', !data.is_donor)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.is_donor ? 'bg-brand-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.is_donor ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
