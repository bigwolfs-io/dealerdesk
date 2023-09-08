import { View, Text, Switch, StyleSheet } from 'react-native';

export interface SwitchFieldProps {
  onChange: (isChecked: boolean) => void
  value: boolean | undefined
  label: string
}

export function SwitchField({ value, onChange, label }: SwitchFieldProps) {
  return (
    <View style={styles.checkboxContainer}>
      <Switch
        onValueChange={onChange}
        value={value}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};


export default SwitchField;


const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 5
  },
  label: {
    marginLeft: 7,
  }
});

