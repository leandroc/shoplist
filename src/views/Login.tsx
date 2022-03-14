import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useUserContext } from '../contexts/UserContext';

import styles from './Login.module.css';

type LoginForm = {
  email: string;
  password: string;
};

function LoginComponent() {
  const location = useLocation();
  const { user, signInWithGoogle, signInWithEmailAndPassword, loading, error } = useUserContext();
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });

  const handleOnSubmit = (values: LoginForm) => {
    signInWithEmailAndPassword(values.email, values.password);
  };

  if (loading) {
    return <>carregando...</>;
  }

  if (user) {
    return <Navigate replace state={{ from: location }} to={{ pathname: '/' }} />;
  }

  return (
    <div className={styles.center}>
      <div className={cx(['p-3', styles.container])}>
        <h2 className="text-center pb-3">Sign in</h2>

        {!error ? null : <Alert variant="danger">Email or Password not found</Alert>}

        <Form className="pb-4" onSubmit={handleSubmit((values) => handleOnSubmit(values))}>
          <FloatingLabel className={styles.emailinput} controlId="email" label="Email address">
            <Form.Control
              {...register('email', { required: 'Required field' })}
              type="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>

          <FloatingLabel
            className={cx(['pb-4', styles.passwordinput])}
            controlId="password"
            label="Password"
          >
            <Form.Control
              {...register('password', { required: 'Required field' })}
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>

          <Button className="w-100" variant="primary" type="submit" size="lg">
            Sign in
          </Button>
        </Form>

        <div className="border-top pb-4"></div>

        <Button
          className="w-100"
          variant="outline-primary"
          size="lg"
          onClick={() => signInWithGoogle()}
        >
          <i className="bi bi-google pe-2" aria-label="Google"></i>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export const Login = LoginComponent;
