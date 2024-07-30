import Ionicons from '@expo/vector-icons/Ionicons';

import {View} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

import { useAppSelector } from '@/hooks/storeHooks';

import tw from 'twrnc';

export default function TabTwoScreen() {
  const storeState = useAppSelector(state => state.tasks)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="stats-chart" style={tw`absolute -bottom-20 -left-5 text-gray-500`} />}>
      <ThemedText type="title">Stats</ThemedText>
      <ThemedText>Some stats, maybe not that important :D</ThemedText>
      <View style={tw`flex-row`}>
        <ThemedText type="defaultSemiBold">- Current tasks:{' '}</ThemedText>
        <ThemedText type="defaultSemiBold">{storeState.tasks.length}</ThemedText>
      </View>
      <View style={tw`flex-row`}>
        <ThemedText type="defaultSemiBold">- All time tasks:{' '}</ThemedText>
        <ThemedText type="defaultSemiBold">{storeState.total}</ThemedText>
      </View>
    </ParallaxScrollView>
  );
}
