'use client';

import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Lesson } from '@/server/routers/lessons';

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [search, setSearch] = useState('');
  const [courseId, setCourseId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    content: '',
    courseId: '',
    instructor: '',
    duration: undefined,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: listData, refetch } = trpc.lessons.list.useQuery({
    search: search || undefined,
    courseId: courseId || undefined,
  });

  const createMutation = trpc.lessons.create.useMutation({
    onSuccess: () => {
      refetch();
      setFormData({
        title: '',
        description: '',
        content: '',
        courseId: '',
        instructor: '',
        duration: undefined,
      });
      setIsModalOpen(false);
    },
  });

  const updateMutation = trpc.lessons.update.useMutation({
    onSuccess: () => {
      refetch();
      setFormData({
        title: '',
        description: '',
        content: '',
        courseId: '',
        instructor: '',
        duration: undefined,
      });
      setEditingId(null);
      setIsModalOpen(false);
    },
  });

  const deleteMutation = trpc.lessons.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (listData?.data) {
      setLessons(listData.data);
    }
  }, [listData?.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.courseId || !formData.instructor) {
      alert('Please fill in title, course ID, and instructor');
      return;
    }

    if (editingId) {
      const lessonToUpdate = lessons.find((l) => l._id === editingId);
      if (lessonToUpdate) {
        updateMutation.mutate({
          ...formData,
          _id: editingId,
          _rev: lessonToUpdate._rev,
          type: 'lesson',
        } as Lesson);
      }
    } else {
      createMutation.mutate({
        title: formData.title,
        description: formData.description || '',
        content: formData.content || '',
        courseId: formData.courseId,
        instructor: formData.instructor,
        duration: formData.duration,
        type: 'lesson',
      });
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setFormData(lesson);
    setEditingId(lesson._id!);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      courseId: '',
      instructor: '',
      duration: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Lessons Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Lesson
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 bg-slate-800 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Filter by course ID..."
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Lessons Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Course ID</th>
                <th className="px-6 py-3 text-left">Instructor</th>
                <th className="px-6 py-3 text-left">Duration (min)</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {lessons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-slate-400">
                    No lessons found
                  </td>
                </tr>
              ) : (
                lessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 font-medium">{lesson.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {lesson.description || '-'}
                    </td>
                    <td className="px-6 py-4">{lesson.courseId}</td>
                    <td className="px-6 py-4">{lesson.instructor}</td>
                    <td className="px-6 py-4">{lesson.duration ? `${lesson.duration}` : '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(lesson)}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(lesson._id!)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Lesson' : 'Add New Lesson'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Course ID *
                  </label>
                  <input
                    type="text"
                    value={formData.courseId || ''}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    value={formData.instructor || ''}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none h-24"
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg transition-colors"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
