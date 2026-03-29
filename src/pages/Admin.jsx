import { useState, useMemo } from 'react'
import { Shield, Trash2, Users, FileText, Loader2, AlertCircle, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

const Admin = ({ session, posts, setPosts }) => {
  const [deletingId, setDeletingId] = useState(null)
  
  const isAdmin = session?.user?.email === 'admin@example.com'

  const uniqueUsers = useMemo(() => {
    return new Set(posts.map(p => p.user_id)).size
  }, [posts])

  const deletePost = (id) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) return
    
    setDeletingId(id)
    setTimeout(() => {
      setPosts(posts.filter(p => p.id !== id))
      toast.success('Post removed by administrator')
      setDeletingId(null)
    }, 500)
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
          <AlertCircle className="text-red-500" size={40} />
        </div>
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-gray-400 max-w-md">This page is reserved for administrators only. If you believe this is an error, please contact support.</p>
        <button onClick={() => window.history.back()} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">Go Back</button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="text-primary" />
          Admin Dashboard
        </h1>
        <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg border border-primary/30 text-sm font-medium animate-pulse">
          Mock Data Mode
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<FileText />} label="Total Posts" value={posts.length} color="text-primary" />
        <StatCard icon={<Users />} label="Active Users" value={uniqueUsers} color="text-secondary" />
        <StatCard icon={<TrendingUp />} label="Support Signals" value={posts.reduce((acc, p) => acc + p.likes.length, 0)} color="text-pink-500" />
      </div>

      {/* Post Moderation Table */}
      <div className="glass-card overflow-hidden border border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold italic underline decoration-primary underline-offset-4">Content Moderation</h2>
          <span className="text-xs text-gray-500">Managing {posts.length} entries</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-gray-400 text-xs font-bold uppercase">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Content Snippet</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">Posted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <AnimatePresence mode="popLayout">
                {posts.map((post) => (
                  <motion.tr 
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-secondary truncate max-w-[120px]">
                      {post.user_id.split('-')[0]}...
                    </td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-1 text-gray-300 italic">"{post.content}"</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        post.feeling === 'Happy' ? 'bg-green-500/10 text-green-400' :
                        post.feeling === 'Angry' ? 'bg-red-500/10 text-red-400' :
                        post.feeling === 'Sad' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {post.feeling}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDistanceToNow(new Date(post.created_at))} ago
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deletePost(post.id)}
                        disabled={deletingId === post.id}
                        className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 disabled:opacity-50 transition-all"
                      >
                        {deletingId === post.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500 italic">
              No entries to moderate.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value, color }) => (
  <div className="glass-card p-8 border border-white/5 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
      <h3 className={`text-4xl font-black ${color}`}>{value}</h3>
    </div>
    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 ${color}`}>
      {icon}
    </div>
  </div>
)

export default Admin
