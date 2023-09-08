import { RootStackParamList } from '@dealerdesk/native/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, FlatList, Alert, Text } from 'react-native';
import Task from './task';
import { ITask } from '@dealerdesk/shared/types';
import { useTask } from '../tasks/use-task';
import { Button, FloatingActionButton } from '@dealerdesk/ui';
import { useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY, useFirebaseAuth } from '@dealerdesk/native/core';

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home({ navigation }: HomeProps) {
  const {
    models: { tasks },
    operations: { deleteTaskMutation, updateTaskMutation },
  } = useTask();

  const { signOut } = useFirebaseAuth();

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then((token) => {
      if (!token) navigation.replace('SignIn');
    });
  }, [navigation]);

  const deleteTask = (taskId: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteTaskMutation({ id: taskId });
        },
      },
    ]);
  };

  const editTask = (task: ITask) => {
    navigation.navigate('TaskUpdate', {
      task,
    });
  };

  const completeTask = (taskId: string, completed: boolean) => {
    updateTaskMutation({
      id: taskId,
      body: {
        completed: !completed,
      },
    });
  };

  const completedTasks = useMemo(() => {
    return tasks?.filter((task) => task.completed) ?? [];
  }, [tasks]);

  const todoTasks = useMemo(() => {
    return tasks?.filter((task) => !task.completed) ?? [];
  }, [tasks]);

  return (
    <View
      style={{
        paddingHorizontal: 12,
        marginTop: 12,
        flex: 1
      }}
    >
      <FloatingActionButton
        onPress={() => navigation.navigate('TaskCreate')}
      />
      <Button
        style={{ marginVertical: 10 }}
        variant="error"
        title="Logout"
        onPress={async () => {
          await signOut()
          return navigation.replace('SignIn');
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
        }}
      >
        Todo
      </Text>
      <FlatList
        style={{
          marginTop: 10,
        }}
        data={todoTasks ?? []}
        keyExtractor={(task) => task._id}
        renderItem={({ item }) => (
          <Task
            task={item}
            onDelete={deleteTask}
            onEdit={editTask}
            onComplete={completeTask}
          />
        )}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
        }}
      >
        Completed
      </Text>

      <FlatList
        style={{
          marginTop: 10,
        }}
        data={completedTasks ?? []}
        keyExtractor={(task) => task._id}
        renderItem={({ item }) => (
          <Task
            task={item}
            onDelete={deleteTask}
            onEdit={editTask}
            onComplete={completeTask}
          />
        )}
      />
    </View>
  );
}

export default Home;
