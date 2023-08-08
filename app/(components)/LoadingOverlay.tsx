import PulseLoader from 'react-spinners/PulseLoader';
export default function LoadingOverlay({ color }: { color: string }) {
  return (
    <div
      className={
        'absolute right-0 left-0 bottom-0 top-0 flex justify-center items-center bg-black bg-opacity-80'
      }
    >
      <PulseLoader color={color} loading={true} />
    </div>
  );
}
