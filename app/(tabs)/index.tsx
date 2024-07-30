import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { addTask, editTask, loadTasks } from '@/store/tasks';
import Task from '@/components/Task';

const index = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [editID, setEditID] = useState('');
  const tasks = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  const taskDescriptionChanged = (e:NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTaskDescription(e.nativeEvent.text);
  }

  const handleAddSave = () => {
    if (editID === '') {
      if (taskDescription !== '') {
        dispatch(addTask({description: taskDescription}));
      }
    } else {
      if (taskDescription !== '') {
        dispatch(editTask({id: editID, description: taskDescription}));
      }
    }
    setTaskDescription('');
  }

  const handleEdit = (id: string) => {
    setEditID(id);
  }

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  return (
    <View style={tw`flex-1 py-2 bg-white`}>
      <Text style={tw`text-3xl text-center border-b-2 mb-8 px-3`}>To Do List</Text>
      <View style={tw`flex-row justify-between items-center gap-2 w-full px-3 mb-6`}>
      <TextInput onChange={taskDescriptionChanged} value={taskDescription} placeholder='I will do ...' style={tw`p-2 bg-gray-200 w-full rounded-md`} />
      <Pressable
        style={tw`p-2 bg-gray-600 rounded-md`}
        onPress={handleAddSave}>
        <Text style={tw`text-sm text-white`}>{editID === ''? 'Add' : 'Save'}</Text>
      </Pressable>
      </View>

    <View style={tw`flex-1 bg-gray-100`}>
      <ScrollView style={tw`px-2`}>
      {tasks.map((item) => (
        <Task key={item.id}  id={item.id}
          description={item.description}
          setTaskDescription={setTaskDescription}
          setEditID={setEditID}/>
        ))}
        </ScrollView>
    </View>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})