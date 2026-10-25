export default function LoadingState({ message = 'Loading employee data...' }) {
  return <div className="loading-state"><span className="spinner-border spinner-border-sm text-primary" role="status" /><span>{message}</span></div>;
}