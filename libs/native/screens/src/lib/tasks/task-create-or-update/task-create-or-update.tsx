import { Button, SwitchField, TextField } from '@dealerdesk/ui';
import { Controller } from 'react-hook-form';

import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import {
  ICreateTask,
  IUpdateTask,
  TaskPriority,
} from '@dealerdesk/shared/types';
import dayjs from 'dayjs';
import { RootStackParamList } from '@dealerdesk/native/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTask } from '../use-task';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

export type TaskCreateOrUpdateProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskCreate' | 'TaskUpdate'
>;

export function TaskCreateOrUpdate({
  route: { params },
  navigation,
}: TaskCreateOrUpdateProps) {
  const isEditMode = Boolean(params?.task?._id);

  const onDateChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setShowDatePicker(false);
    setValue('dueDate', dayjs(selectedDate).format('YYYY-MM-DD'));
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    models: { errors, control, isUpdatingTask, isCreatingTask },
    operations: {
      handleSubmit,
      setValue,
      createTaskMutation,
      updateTaskMutation,
    },
  } = useTask(params?.task);

  const createOrUpdateTask = async (data: ICreateTask | IUpdateTask) => {
    if (!isEditMode) {
      const newTask = {
        ...data,
      };
      await createTaskMutation(newTask as ICreateTask);
      navigation.navigate('Home');
    } else {
      // Send Edit Request
      const updatedTask = { ...params?.task, ...data };
      if (params?.task?._id) {
        await updateTaskMutation({ id: params.task._id, body: updatedTask });
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 12,
      }}
    >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorText={errors?.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorText={errors?.description?.message}
          />
        )}
        name="description"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Pressable onPress={() => setShowDatePicker(true)} style={{
              flex: 1,
            }}>
              <TextField
                containerStyle={{ marginRight: 8 }}
                placeholder="Due Date"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={false}
              />
            </Pressable>
            <Button
              title="Select"
              onPress={() => {
                setShowDatePicker(true);
              }}
            />
          </View>
        )}
        name="dueDate"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Priority</Text>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              onBlur={onBlur}
            >
              {Object.entries(TaskPriority).map(([key, value]) => {
                return <Picker.Item key={key} label={key} value={value} />;
              })}
            </Picker>
          </View>
        )}
        name="priority"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <SwitchField onChange={onChange} value={value} label="Completed" />
        )}
        name="completed"
      />

      <Button
        disabled={isUpdatingTask || isCreatingTask}
        title={isEditMode ? 'Update Task' : 'Add Task'}
        onPress={handleSubmit(createOrUpdateTask)}
      />

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={onDateChange}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
}

export default TaskCreateOrUpdate;
