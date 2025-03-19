// File: packages/frontend/src/modules/tasks/services/TaskDataAdapter.js

/**
 * Adapter class for transforming raw API data to application models
 * and handling data transformation
 */
class TaskDataAdapter {
  /**
   * Transform raw task data to application model
   *
   * @param {Object} rawTask - Raw task data from API
   * @returns {Object} Transformed task
   */
  transformTask(rawTask) {
    if (!rawTask) return null;

    return {
      id: rawTask.id,
      title: rawTask.title || '',
      description: rawTask.description || '',
      status: rawTask.status || 'NOT_STARTED',
      priority: rawTask.priority || 'MEDIUM',
      dueDate: rawTask.dueDate ? new Date(rawTask.dueDate) : null,
      completionPercentage: rawTask.completionPercentage || 0,
      assignedTo: rawTask.assignedTo,
      assignedToId: rawTask.assignedToId || (rawTask.assignedTo ? rawTask.assignedTo.id : null),
      assignedToName: rawTask.assignedToName || (rawTask.assignedTo ? rawTask.assignedTo.name : null),
      teamId: rawTask.teamId,
      teamName: rawTask.teamName,
      parentTaskId: rawTask.parentTaskId,
      parentTaskTitle: rawTask.parentTaskTitle,
      estimatedHours: rawTask.estimatedHours,
      actualHours: rawTask.actualHours,
      createdAt: rawTask.createdAt ? new Date(rawTask.createdAt) : null,
      updatedAt: rawTask.updatedAt ? new Date(rawTask.updatedAt) : null,
      completionDate: rawTask.completionDate ? new Date(rawTask.completionDate) : null,
      module: rawTask.module || 'GLOBAL',
      relatedObjects: (rawTask.relatedObjects || []).map(obj => this.transformRelatedObject(obj))
    };
  }

  /**
   * Transform a list of raw tasks
   *
   * @param {Array} rawTasks - Array of raw task data
   * @returns {Array} Transformed tasks
   */
  transformTasks(rawTasks) {
    if (!Array.isArray(rawTasks)) return [];
    return rawTasks.map(task => this.transformTask(task));
  }

  /**
   * Transform related object data
   *
   * @param {Object} relatedObject - Raw related object data
   * @returns {Object} Transformed related object
   */
  transformRelatedObject(relatedObject) {
    if (!relatedObject) return null;

    return {
      id: relatedObject.id,
      objectId: relatedObject.objectId,
      objectType: relatedObject.objectType,
      objectName: relatedObject.objectName
    };
  }

  /**
   * Transform data for creating/updating a task
   *
   * @param {Object} formData - Form data from UI
   * @returns {Object} API-compatible data
   */
  prepareTaskDataForApi(formData) {
    return {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? formData.dueDate.toISOString() : null,
      assignedToId: formData.assignedToId,
      teamId: formData.teamId,
      parentTaskId: formData.parentTaskId,
      estimatedHours: formData.estimatedHours,
      actualHours: formData.actualHours,
      completionPercentage: formData.completionPercentage,
      module: formData.module,
      // Remove any undefined or null properties
      ...Object.entries(formData)
        .filter(([key, value]) => value !== undefined && value !== null && !['title', 'description', 'status', 'priority', 'dueDate', 'assignedToId', 'teamId', 'parentTaskId', 'estimatedHours', 'actualHours', 'completionPercentage', 'module'].includes(key))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    };
  }

  /**
   * Transform task filter for API format
   *
   * @param {Object} filter - UI filter object
   * @returns {Object} API-compatible filter
   */
  prepareFilterForApi(filter) {
    const apiFilter = {};

    if (filter.status && filter.status.length > 0) {
      apiFilter.status = filter.status;
    }

    if (filter.priority && filter.priority.length > 0) {
      apiFilter.priority = filter.priority;
    }

    if (filter.startDate) {
      apiFilter.startDate = filter.startDate instanceof Date
        ? filter.startDate.toISOString()
        : filter.startDate;
    }

    if (filter.endDate) {
      apiFilter.endDate = filter.endDate instanceof Date
        ? filter.endDate.toISOString()
        : filter.endDate;
    }

    if (filter.assignee !== undefined) {
      apiFilter.assigneeId = filter.assignee;
    }

    if (filter.showCompleted !== undefined) {
      apiFilter.includeCompleted = filter.showCompleted;
    }

    if (filter.searchText) {
      apiFilter.search = filter.searchText;
    }

    return apiFilter;
  }
}

export default new TaskDataAdapter();