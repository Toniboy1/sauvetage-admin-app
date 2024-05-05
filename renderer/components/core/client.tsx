import dynamic from 'next/dynamic';

const ClientOnly = (Component) => dynamic(
  () => Promise.resolve(Component),
  { ssr: false }
);

export default ClientOnly;
