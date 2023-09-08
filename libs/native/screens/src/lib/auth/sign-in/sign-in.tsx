import { useFirebaseAuth } from '@dealerdesk/native/core';
import { RootStackParamList } from '@dealerdesk/native/types'
import { Button, TextField } from '@dealerdesk/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';

import {
  View,
  Text,
  Pressable,
} from 'react-native';
import { z } from 'zod';

export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const signInSchema = z.strictObject({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInForm = z.infer<typeof signInSchema>;

export function SignIn({ navigation }: SignInProps) {
  const { error, loading, signInWithEmailAndPassword } = useFirebaseAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async ({ email, password }: SignInForm) => {
    try {
      await signInWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{
      marginHorizontal: 12
    }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorText={errors?.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorText={errors?.password?.message}
          />
        )}
        name="password"
      />

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
        <Text>Not Registered?{' '}</Text>
        <Pressable onPress={() => navigation.replace('SignUp')}>
          <Text style={{
            color: '#3498FF'
          }}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default SignIn;

