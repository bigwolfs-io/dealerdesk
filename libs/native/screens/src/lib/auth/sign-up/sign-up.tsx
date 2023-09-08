import {
  View,
  Text,
  Pressable,
} from 'react-native';
import { RootStackParamList } from '@dealerdesk/native/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { useFirebaseAuth } from '@dealerdesk/native/core';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@dealerdesk/ui';

export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const signUpSchema = z.strictObject({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignUp({ navigation }: SignUpProps) {
  const { signUpWithEmailAndPassword, error, loading } = useFirebaseAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async ({ email, password }: SignUpForm) => {
    try {
      await signUpWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 12,
        marginTop: 12,
      }}
    >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Button
        disabled={loading}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
      {error && <Text>{error}</Text>}

      <View style={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text> Already Registered?{' '}</Text>
        <Pressable onPress={() => navigation.replace('SignIn')}>
          <Text style={{
            color: '#3498FF'
          }}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}


export default SignUp;
