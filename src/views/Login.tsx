import { Navigate, useLocation } from 'react-router-dom';
import cx from 'classnames';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useUserContext } from '../contexts/UserContext';

import styles from './Login.module.css';

function LoginComponent() {
  const location = useLocation();
  const { user, signInWithGoogle, signInWithEmailAndPassword, loading, error } = useUserContext();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const emailElement = event.currentTarget.elements.namedItem('email') as HTMLInputElement;
    const emailValue = emailElement?.value;

    const passwordElement = event.currentTarget.elements.namedItem('password') as HTMLInputElement;
    const passwordValue = passwordElement?.value;

    if (emailValue && passwordValue) {
      signInWithEmailAndPassword(emailValue, passwordValue);
    }
  };

  if (loading) {
    return <>carregando...</>;
  }

  if (error) {
    return <>erro: {error.message}</>;
  }

  if (user) {
    return <Navigate replace state={{ from: location }} to={{ pathname: '/' }} />;
  }

  return (
    <div className={styles.center}>
      <div className={cx(['p-3', styles.container])}>
        <h2 className="text-center pb-3">Sign in</h2>

        <Form className="pb-4" onSubmit={handleOnSubmit}>
          <FloatingLabel className={styles.emailinput} controlId="email" label="Email address">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>

          <FloatingLabel
            className={cx(['pb-4', styles.passwordinput])}
            controlId="password"
            label="Password"
          >
            <Form.Control type="password" placeholder="Password" />
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
