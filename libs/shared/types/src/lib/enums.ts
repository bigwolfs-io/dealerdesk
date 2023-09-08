
type ObjectValues<T> = T[keyof T];

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type TaskPriority = ObjectValues<typeof TaskPriority>
