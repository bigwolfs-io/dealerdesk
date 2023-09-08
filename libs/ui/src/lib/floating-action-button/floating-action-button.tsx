import { Text, StyleProp, ViewStyle, StyleSheet, Pressable } from 'react-native';

export interface FloatingActionButtonProps {
  onPress?: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

export function FloatingActionButton({ onPress, style }: FloatingActionButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.fab, style]}>
      <Text style={styles.text}>+</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498DB',
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Add elevation for a shadow effect (Android)
    zIndex: 999, // Ensure the FAB is above other elements
  },
  text: {
    color: 'white', // Customize the text color
    fontSize: 24,
  },
});

export default FloatingActionButton;
