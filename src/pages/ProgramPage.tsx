import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { programs } from '@/data/programs';
import ProgramDetails from '@/sections/ProgramDetails';

export default function ProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const program = programs.find((item) => item.id === programId);

  if (!program) {
    return <Navigate to="/" replace />;
  }

  return <ProgramDetails program={program} onClose={() => navigate('/')} />;
}
