import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ITask } from '@dealerdesk/shared/types';
import dayjs from 'dayjs';
import { Button } from '@dealerdesk/ui';

interface TaskProps {
  task: ITask;
  onDelete: (taskId: string) => void;
  onEdit: (task: ITask) => void;
  onComplete: (taskId: string, complete: boolean) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit, onComplete }) => {

  const pillColor = useMemo(() => {
    switch (task.priority) {
      case 'low':
        return {
          backgroundColor: '#4CAF50',
          textColor: '#FFFFFF',
        }
      case 'medium':
        return {
          backgroundColor: '#FFC107',
          textColor: '#000000',
        }
      case 'high':
        return {
          backgroundColor: '#F44336',
          textColor: '#FFFFFF'
        }
      default:
        return {
          backgroundColor: '#9E9E9E',
          textColor: '#FFFFFF'
        }
    }
  }, [task])

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onComplete(task._id, task.completed)}>
        <Text
          style={[
            styles.taskTitle,
            task.completed ? styles.completedTask : null,
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
      <Text style={styles.taskDescription}>{task.description}</Text>
      {task.dueDate && (
        <Text style={styles.dueDate}>
          Due Date: {dayjs(task.dueDate).format('YYYY-MM-DD')}
        </Text>
      )}
      <View style={[styles.pill, { backgroundColor: pillColor.backgroundColor }]}>
        <Text style={[styles.pillText, { color: pillColor.textColor }]}>{task.priority}</Text>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
      }}>
        <Button
          style={{ marginRight: 10, flexGrow: 1, }}
          title="Edit"
          onPress={() => onEdit(task)}
        />
        <Button
          style={{ marginLeft: 10, flexGrow: 1 }}
          title="Delete"
          variant="error"
          onPress={() => onDelete(task._id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  dueDate: {
    fontSize: 14,
    color: '#888',
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginVertical: 4,
    marginRight: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Task;
