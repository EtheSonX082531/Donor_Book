// resources/js/Pages/Home/Index.jsx
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Home({ posts, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState({
        blood_group: filters.blood_group || '',
        location: filters.location || '',
        type: filters.type || '',
    });

    const [activeCommentId, setActiveCommentId] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleLike = (postId) => {
        if (!auth.user) {
            window.location = '/login';
            return;
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/posts/${postId}/like`;
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
    };

    const handleComment = (e, postId) => {
        e.preventDefault();
        if (processing || !commentContent.trim()) return;

        setProcessing(true);
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/posts/${postId}/comments`;
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        const contentInput = document.createElement('input');
        contentInput.type = 'hidden';
        contentInput.name = 'content';
        contentInput.value = commentContent;
        form.appendChild(contentInput);

        document.body.appendChild(form);
        form.submit();
    };

    const deleteComment = (commentId) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/comments/${commentId}`;
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';
        form.appendChild(methodInput);

        document.body.appendChild(form);
        form.submit();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        window.location = `/home?${new URLSearchParams(search).toString()}`;
    };

    return (
        <AppLayout>
            <div className="space-y-8">
                {/* Header & Quick Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Community Feed</h1>
                        <p className="text-gray-500 mt-1">Real-time blood requests and donor availability.</p>
                    </div>
                </div>

                {/* Search Bar Plugin */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            Filter Results
                        </h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Blood Group</label>
                                <div className="relative">
                                    <select
                                        value={search.blood_group}
                                        onChange={(e) => setSearch({ ...search, blood_group: e.target.value })}
                                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none"
                                    >
                                        <option value="">Any Blood Group</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={search.location}
                                    onChange={(e) => setSearch({ ...search, location: e.target.value })}
                                    placeholder="City or Area..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Type</label>
                                <div className="relative">
                                    <select
                                        value={search.type}
                                        onChange={(e) => setSearch({ ...search, type: e.target.value })}
                                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none"
                                    >
                                        <option value="">All Posts</option>
                                        <option value="request">Requests Only</option>
                                        <option value="donor">Donors Only</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full bg-brand-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-700 focus:ring-4 focus:ring-brand-500/20 transition-all shadow-md shadow-brand-500/20 flex justify-center items-center gap-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Posts */}
                    <div className="lg:col-span-2 space-y-6">
                        {posts.data.map(post => (
                            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                                {/* Post Header */}
                                <div className="flex justify-between items-start mb-5 pb-5 border-b border-gray-50">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg overflow-hidden">
                                            {post.user.profile?.image ? (
                                                <img
                                                    src={`/storage/${post.user.profile.image}`}
                                                    alt={post.user.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                post.user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-lg">{post.user.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${post.type === 'request'
                                        ? 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                        : 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                                        }`}>
                                        {post.type === 'request' ? 'Request' : 'Donor'}
                                    </div>
                                </div>

                                {/* Post Body */}
                                {post.type === 'request' && (
                                    <div className="mb-6 bg-red-50/50 rounded-xl p-5 border border-red-100/50">
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                            <div>
                                                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Hospital</span>
                                                <span className="font-bold text-gray-900">{post.hospital_name}</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Units</span>
                                                <span className="font-bold text-gray-900">{post.units_needed} Bags</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Urgency</span>
                                                <span className={`font-bold capitalize ${post.urgency === 'critical' ? 'text-red-600' :
                                                    post.urgency === 'high' ? 'text-orange-500' :
                                                        'text-emerald-500'
                                                    }`}>
                                                    {post.urgency}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</span>
                                                <span className="font-bold text-gray-900">{post.user.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className="flex items-start justify-between">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line flex-grow">{post.description}</p>
                                        <div className="ml-4 flex-shrink-0 text-center">
                                            <div className="bg-brand-50 text-brand-700 rounded-xl px-4 py-3 border border-brand-100">
                                                <div className="text-xs uppercase font-bold tracking-wide opacity-70">Group</div>
                                                <div className="text-2xl font-black">{post.blood_group}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {post.location}
                                    </div>

                                    {post.image && (
                                        <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-transform hover:scale-[1.01] duration-300">
                                            <img
                                                src={`/storage/${post.image}`}
                                                alt="Post attachment"
                                                className="w-full h-auto max-h-[500px] object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Actions Area */}
                                <div className="flex justify-between items-center pt-5 border-t border-gray-50">
                                    <div className="flex space-x-6">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center space-x-2 transition-colors group ${post.is_liked ? 'text-brand-600' : 'text-gray-500 hover:text-brand-600'}`}
                                        >
                                            <div className={`p-2 rounded-full transition-colors ${post.is_liked ? 'bg-brand-50' : 'bg-transparent group-hover:bg-brand-50'}`}>
                                                <svg className="w-5 h-5" fill={post.is_liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                            </div>
                                            <span className="font-medium text-sm">{post.likes_count} Support</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                                            className={`flex items-center space-x-2 transition-colors group ${activeCommentId === post.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                        >
                                            <div className={`p-2 rounded-full transition-colors ${activeCommentId === post.id ? 'bg-blue-50' : 'bg-transparent group-hover:bg-blue-50'}`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                            </div>
                                            <span className="font-medium text-sm">{post.comments_count} Comments</span>
                                        </button>
                                    </div>

                                    {auth.user && auth.user.id !== post.user.id && (
                                        <a
                                            href={`tel:${post.user.phone}`}
                                            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            Call Now
                                        </a>
                                    )}
                                </div>

                                {/* Comments Section */}
                                {activeCommentId === post.id && (
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="space-y-4 mb-6">
                                            {post.comments?.map(comment => (
                                                <div key={comment.id} className="flex space-x-3 group">
                                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        {comment.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-grow bg-gray-50 rounded-2xl px-4 py-2 relative">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm font-bold text-gray-900">{comment.user.name}</span>
                                                            <span className="text-[10px] text-gray-400">
                                                                {new Date(comment.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{comment.content}</p>

                                                        {auth.user?.id === comment.user_id && (
                                                            <button
                                                                onClick={() => deleteComment(comment.id)}
                                                                className="absolute -right-2 -top-2 p-1 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {post.comments?.length === 0 && (
                                                <p className="text-center text-sm text-gray-500 py-2">No comments yet. Be the first to respond!</p>
                                            )}
                                        </div>

                                        {auth.user ? (
                                            <form onSubmit={(e) => handleComment(e, post.id)} className="flex items-center space-x-3">
                                                <div className="flex-grow relative">
                                                    <input
                                                        type="text"
                                                        value={commentContent}
                                                        onChange={(e) => setCommentContent(e.target.value)}
                                                        placeholder="Write a comment..."
                                                        className="w-full px-4 py-2 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm transition-all"
                                                        disabled={processing}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={processing || !commentContent.trim()}
                                                    className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-700 disabled:opacity-50 transition-colors"
                                                >
                                                    Post
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="text-center p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-sm text-gray-500">
                                                    Please <Link href="/login" className="text-brand-600 font-bold hover:underline">login</Link> to join the conversation.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {posts.data.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 border-dashed">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    We couldn't find any posts matching your criteria. Try adjusting your filters.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Quick Actions Widget */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-lg shadow-brand-500/30">
                            <h3 className="text-xl font-bold mb-2">Needs Blood Urgently?</h3>
                            <p className="text-brand-100 mb-6 text-sm">Create a public request and notify nearby donors immediately.</p>
                            <Link
                                href="/posts/create/request"
                                className="block w-full text-center bg-white text-brand-700 font-bold py-3 rounded-xl hover:bg-brand-50 transition-colors"
                            >
                                Request Blood
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">You Can Help</h3>
                            <p className="text-gray-500 mb-6 text-sm">Join our list of available donors and help save lives in your community.</p>
                            <Link
                                href="/posts/create/donor"
                                className="block w-full text-center bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors"
                            >
                                Become a Donor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}