import Button from './index';

export default {
  title: 'Button',
  component: Button,
};

export const button = () => {
  return (
    <>
      <Button
        handleClick={() => {
          console.log('Submitted');
        }} color={'#f39a9d'} text={'Test'}
      />
    </>
  );
};