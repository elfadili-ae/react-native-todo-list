import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import { removeTask } from '@/store/tasks';
import { useAppDispatch } from '@/hooks/storeHooks';

type TaskProps = {
    id: string;
    description: string;
    setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
    setEditID: React.Dispatch<React.SetStateAction<string>>;
}

const Task = ({id, description, setTaskDescription, setEditID} : TaskProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id:string) => {
    dispatch(removeTask({id: id}))
  }

  const handleEdit = () => {
    setTaskDescription(description);
    setEditID(id);
  }

  return (
    <View id={id} style={tw`flex-row gap-1 items-start mb-2`}>
    <Text style={tw`p-2 text-white bg-gray-600 w-full rounded-md`}>{description}</Text>
    <View style={tw`flex-row gap-1 items-center`}>
    <Pressable style={tw`p-2 text-gray-600 border-[1px] rounded-md`} onPress={() => {handleEdit()}}>
    <Ionicons size={16} name="create-outline" style={tw`text-gray-600`} />
  </Pressable>
  <Pressable style={tw`p-2 text-gray-600 border-[1px] rounded-md`} onPress={() => {handleDelete(id)}}>
    <Ionicons size={16} name="trash" style={tw`text-gray-600`} />
  </Pressable>
    </View>
  </View>
  )
}

export default Task

const styles = StyleSheet.create({})