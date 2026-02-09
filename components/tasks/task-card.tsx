'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Clock, Trash2, Edit, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { TaskFormDialog } from './task-form-dialog'
import { formatDate, formatTime } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description?: string | null
  category: string
  priority: string
  status: string
  estimatedTime?: number | null
  actualTime?: number | null
  dueDate?: string | null
  subtasks?: Task[]
}

interface TaskCardProps {
  task: Task
  onUpdate: () => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [updating, setUpdating] = useState(false)

  const toggleStatus = async () => {
    setUpdating(true)
    try {
      const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      onUpdate()
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setUpdating(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Health': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Learning': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'Finance': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={toggleStatus}
            disabled={updating}
            className="mt-1"
          >
            {task.status === 'COMPLETED' ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={`font-medium ${task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {task.description}
                  </p>
                )}
              </div>
              
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={getCategoryColor(task.category)}>
                {task.category}
              </Badge>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              {task.estimatedTime && (
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(task.estimatedTime)}
                </Badge>
              )}
              {task.dueDate && (
                <Badge variant="outline">
                  📅 {formatDate(task.dueDate)}
                </Badge>
              )}
            </div>

            {/* Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  {task.subtasks.length} subtask{task.subtasks.length !== 1 ? 's' : ''}
                </button>
                
                {expanded && (
                  <div className="ml-8 mt-2 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    {task.subtasks.map((subtask) => (
                      <TaskCard
                        key={subtask.id}
                        task={subtask}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Add Subtask Button */}
            <div className="mt-3">
              <TaskFormDialog
                parentId={task.id}
                onTaskCreated={onUpdate}
                trigger={
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Subtask
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}